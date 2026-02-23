import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
import type { ChatCompletionTool } from "openai/resources/chat";
import { createTicketService } from "../services/ticketService.ts";
import { updateResolutionStatus } from "../repositories/conversationRepository.ts";

export const token = process.env.LLM_TOKEN!;
export const endpoint = process.env.LLM_ENDPOINT!;
export const model = process.env.LLM_MODEL!;

export const companyKnowledge = `RespLoopAI is an AI-powered customer support platform that helps businesses automate conversations with their customers in real time.

The system provides:

• A live chat interface where customers can ask business-related questions
• Instant AI-generated responses
• Automatic detection of unresolved or unclear situations
• Smart escalation to human support when needed

RespLoopAI is designed to improve response speed, reduce support workload, and ensure customers receive accurate and structured assistance.

If the AI is unsure about an answer or detects that a user is dissatisfied, it automatically creates a support ticket so that a human team member can review and assist further.

The platform also includes an admin dashboard where business owners can:

• View all customer conversations
• See which conversations were resolved or unresolved
• Monitor AI confidence levels
• Review automatically created tickets
• Track overall support performance

RespLoopAI does not replace human support teams. Instead, it acts as the first layer of intelligent assistance, handling common queries and escalating complex issues when necessary.

The goal of RespLoopAI is to create faster, smarter, and more structured customer support experiences.`;

export const systemPrompt = `You are a strictly limited domain AI assistant.

You are ONLY allowed to answer questions related to:
${companyKnowledge}

You must follow these rules strictly:

--------------------------------------------------
RULE 1 — In-Scope Questions
--------------------------------------------------
If the user's question is clearly within the allowed context:
- Provide a short, direct, accurate answer.
- Do not expand beyond the allowed scope.
- Do not add unrelated information.

--------------------------------------------------
RULE 2 — Human Escalation
--------------------------------------------------
If the user explicitly asks to:
- Talk to a human
- Speak with a real person
- Contact customer support
- Connect to an agent
- Escalate the issue
- File a complaint

You MUST call the tool create_ticket,

Do NOT answer the question.
Do NOT attempt to solve the issue yourself.

--------------------------------------------------
RULE 3 — Out-of-Scope Questions
--------------------------------------------------
If the question is unrelated to the allowed context:
- Do NOT answer it.
- Do NOT explain why.
- You MUST call the tool create_ticket.

--------------------------------------------------
TOOL CALL REQUIREMENTS
--------------------------------------------------
When calling create_ticket, send:

{
  reason: "<short summary of why the ticket is created>",
  status: "open",
  conversationId: "<conversation id if available>"
}

Reason Guidelines:
- If out-of-scope → "Out-of-scope question: <summary>"
- If human requested → "User requested human support"

--------------------------------------------------
IMPORTANT
--------------------------------------------------
Your only possible actions are:
(A) Answer within scope
(B) Call create_ticket

If unsure, call create_ticket.`;

export const createTicketToolDefinition: ChatCompletionTool = {
  type: "function",
  function: {
    name: "create_ticket",
    description:
      "Creates a support ticket when user asks an out-of-scope question or requests human assistance.",
    parameters: {
      type: "object",
      properties: {
        reason: { type: "string" },
        status: {
          type: "string",
          enum: ["open", "closed"],
        },
        conversationId: {
          type: "string",
        },
      },
      required: ["reason", "status"],
    },
  },
};

export const generateBotResponse = async (
  userMessage: string,
  conversationId: string,
) => {
  // console.log("message in generateBotResponse:", userMessage);
  // console.log("message in generateBotResponse:", conversationId);
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    tools: [createTicketToolDefinition],
    tool_choice: "auto",
  });

  const message = response.choices[0].message;

  // console.log("message: ", message);

  if (message.tool_calls && message.tool_calls.length > 0) {
    const toolCall = message.tool_calls[0];
    // console.log("toolCall: ", toolCall);
    if (toolCall.type === "function") {
      const args = JSON.parse(toolCall.function.arguments);

      if (toolCall.function.name === "create_ticket") {
        const ticket = await createTicketService({
          reason: args.reason,
          status: "open", // enforce server-side
          conversationId: conversationId,
        });

        await updateResolutionStatus({
          conversationId: conversationId,
          resolution_status: "unresolved",
        });

        return {
          type: "ticket_created",
          ticketId: ticket.id,
          message:
            "Your request has been forwarded to a human support agent. Our team will contact you shortly.",
        };
      }
    }
  }

  return {
    type: "answer",
    message: message.content,
  };
};

// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// console.log("process.env.OPENAI_API_KEY: ", process.env.OPENAI_API_KEY);
// // OPEN AI Key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const generateBotResponse = async (message: any) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: "You are a helpful chatbot assistant." },
//         { role: "user", content: message.body.text },
//       ],
//     });
//     console.log("Full OpenAI response:", JSON.stringify(response, null, 2));
//     return response.choices[0].message.content;
//   } catch (err) {
//     console.error("OpenAI error:", err);
//     throw err;
//   }
// };
