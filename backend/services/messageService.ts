import {
  getResolutionStatus,
  updateResolutionStatus,
} from "../repositories/conversationRepository.ts";
import {
  getMessagesRepository,
  getMessageRepository,
  createMessageRepository,
  updateMessageRepository,
  deleteMessageRepository,
} from "../repositories/messageRepository.ts";
import { formatDateTime } from "../utilities/reusableFunctions/DateFormatter.ts";
import { generateBotResponse } from "./AIResponseService.ts";

export const getMessagesService = async (data: any) => {
  try {
    let messages = await getMessagesRepository(data);

    return {
      data: messages.rows,
      // pagination: {
      //   total: messages.count,
      //   page: messages.page,
      //   limit: messages.limit,
      //   totalPages: Math.ceil(messages.count / messages.limit),
      // },
    };
  } catch (error) {
    throw error;
  }
};

export const getMessageService = async (data: any) => {
  try {
    const { id } = data.params;

    let message = await getMessageRepository({ id });
    console.log(message);
    return message;
  } catch (error) {
    throw error;
  }
};

export const createMessageService = async (data: any) => {
  try {
    const { text, conversationId } = data.body;
    let botMessage;
    if (!text?.trim()) {
      throw "Text cannot be empty.";
    }

    if (!conversationId || conversationId === null)
      throw "conversation id is mandatory";

    // Create message for user
    data.body.sender = "user";
    let userMessage = await createMessageRepository(data);

    // Bot logic:
    // Chatbot static responses:
    // const botResponses = [
    //   {
    //     intent: "greeting",
    //     examples: ["hi", "hello", "hey", "good morning"],
    //     response: "Hi there! 👋 How can I help you today?",
    //   },
    //   {
    //     intent: "goodbye",
    //     examples: ["bye", "goodbye", "see you", "exit"],
    //     response: "Goodbye! Have a great day 😊",
    //   },
    //   {
    //     intent: "thanks",
    //     examples: ["thanks", "thank you", "appreciate it"],
    //     response: "You're welcome! Happy to help 🙌",
    //   },
    //   {
    //     intent: "help",
    //     examples: ["help", "what can you do", "options"],
    //     response:
    //       "I can answer common questions, provide information, and guide you through available options.",
    //   },
    //   {
    //     intent: "hours",
    //     examples: ["opening hours", "working hours", "when are you open"],
    //     response: "We’re open Monday to Friday, 9 AM to 6 PM.",
    //   },
    //   {
    //     intent: "location",
    //     examples: ["where are you located", "address", "location"],
    //     response:
    //       "We’re located at our main office. Please visit our website for the full address.",
    //   },
    //   {
    //     intent: "contact",
    //     examples: ["contact", "support", "customer service"],
    //     response:
    //       "You can contact our support team via email or phone. Would you like the details?",
    //   },
    //   {
    //     intent: "pricing",
    //     examples: ["price", "cost", "pricing"],
    //     response:
    //       "Pricing depends on the service. Let me know what you're looking for!",
    //   },
    //   {
    //     intent: "unknown",
    //     examples: [],
    //     response:
    //       "Sorry, I didn’t quite understand that. Could you rephrase or ask something else?",
    //   },
    // ];

    // const normalizedText = text.toLowerCase().trim();

    // let botResponse = "";

    // for (let message of botResponses) {
    //   if (message.examples.includes(normalizedText)) {
    //     botResponse = message.response;
    //   }
    // }

    addResolutionStatus({
      conversationId: conversationId,
      text: text,
      msgId: userMessage.id,
    });

    let botResponse = await generateBotResponse(
      data.body.text,
      data.body.conversationId,
    );
    // console.log("botResponse in createMessageService: ", botResponse.message);
    data.body.text = botResponse.message;
    data.body.sender = "ai";

    botMessage = await createMessageRepository(data);

    console.log("userMessage: ", userMessage.createdAt);
    const msgDateTime = await formatDateTime(userMessage.createdAt);
    console.log("msgDateTime: ", msgDateTime);

    let response = {
      userMessage,
      botMessage,
      msgDateTime: msgDateTime,
    };

    // console.log("response in createMessageService: ", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateMessageService = async (data: any) => {
  try {
    let message = await updateMessageRepository(data);
    return message;
  } catch (error) {
    throw error;
  }
};

export const deleteMessageService = async (data: any) => {
  try {
    let message = await deleteMessageRepository(data);
    return message;
  } catch (error) {
    throw error;
  }
};

// export const addResolutionStatus = async (data: any) => {
//   try {
//     const { conversationId, text, msgId } = data;
//     const currentResolutionStatus = await getResolutionStatus({
//       conversationId: conversationId,
//     });
//     console.log("currentResolutionStatus: ", currentResolutionStatus);
//     if (!data.query) {
//       data.query = {};
//     }
//     data.query.conversationId = conversationId;
//     const allMessages = await getMessagesRepository(data);
//     let addedResolutionStatus;

//     if (allMessages?.rows?.length) {
//       for (let message of allMessages.rows) {
//         if (
//           message.text === text &&
//           message.sender === "user" &&
//           message.id !== msgId
//         ) {
//           addedResolutionStatus = await updateResolutionStatus({
//             conversationId: conversationId,
//             resolution_status: "partially resolved",
//           });
//           break;
//         } else if (
//           addedResolutionStatus === null &&
//           currentResolutionStatus?.resolution_status !== "partially resolved" &&
//           currentResolutionStatus?.resolution_status !== "unresolved"
//         ) {
//           addedResolutionStatus = await updateResolutionStatus({
//             conversationId: conversationId,
//             resolution_status: "resolved",
//           });
//         }
//       }
//     }
//   } catch (error) {
//     throw error;
//   }
// };

export const addResolutionStatus = async (data: any) => {
  try {
    const { conversationId, text, msgId } = data;

    const currentConversation = await getResolutionStatus({
      conversationId,
    });

    const currentStatus = currentConversation?.resolution_status;

    data.query ??= {};
    data.query.conversationId = conversationId;

    const allMessages = await getMessagesRepository(data);

    if (!allMessages?.rows?.length) return;

    // 🔎 Check for repeat question (excluding current message)
    const isDuplicate = allMessages.rows.some(
      (message) =>
        message.text === text &&
        message.sender === "user" &&
        message.id !== msgId,
    );

    let newStatus: string | null = null;

    if (isDuplicate) {
      if (currentStatus !== "unresolved") {
        newStatus = "partially resolved";
      }
    } else if (!currentStatus || currentStatus === "resolved") {
      newStatus = "resolved";
    }

    if (newStatus) {
      await updateResolutionStatus({
        conversationId,
        resolution_status: newStatus,
      });
    }
  } catch (error) {
    throw error;
  }
};
