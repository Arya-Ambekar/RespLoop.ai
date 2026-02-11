import {
  getMessagesRepository,
  getMessageRepository,
  createMessageRepository,
  updateMessageRepository,
  deleteMessageRepository,
} from "../repositories/messageRepository.ts";
import { createConversationRepository } from "../repositories/conversationRepository.ts";
import { createUserRepository } from "../repositories/userRepository.ts";

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
    return message;
  } catch (error) {
    throw error;
  }
};

export const createMessageService = async (data: any) => {
  try {
    let conversation;
    const serial_id = "CONVO-002";
    const { text, conversationId, isEmail } = data.body;
    let botMessage;
    if (!text?.trim()) {
      throw "Text cannot be empty.";
    }

    if (!conversationId || conversationId === null)
      throw "conversation id is mandatory";

    if (isEmail) {
      // create user if email is sent in text
      const user = await createUserRepository(data.text);
      data.body.serial_id = serial_id;
      data.body.userId = user.id;

      // create new conversation for new user
      conversation = await createConversationRepository(data);
      data.body.conversationId = conversation?.id;
    }

    // Create message for user
    data.body.sender = "user";
    console.log("data.body of user: ", data.body);
    let userMessage = await createMessageRepository(data);

    // Bot logic:
    // Chatbot static responses:
    const botResponses = [
      {
        intent: "greeting",
        examples: ["hi", "hello", "hey", "good morning"],
        response: "Hi there! 👋 How can I help you today?",
      },
      {
        intent: "goodbye",
        examples: ["bye", "goodbye", "see you", "exit"],
        response: "Goodbye! Have a great day 😊",
      },
      {
        intent: "thanks",
        examples: ["thanks", "thank you", "appreciate it"],
        response: "You're welcome! Happy to help 🙌",
      },
      {
        intent: "help",
        examples: ["help", "what can you do", "options"],
        response:
          "I can answer common questions, provide information, and guide you through available options.",
      },
      {
        intent: "hours",
        examples: ["opening hours", "working hours", "when are you open"],
        response: "We’re open Monday to Friday, 9 AM to 6 PM.",
      },
      {
        intent: "location",
        examples: ["where are you located", "address", "location"],
        response:
          "We’re located at our main office. Please visit our website for the full address.",
      },
      {
        intent: "contact",
        examples: ["contact", "support", "customer service"],
        response:
          "You can contact our support team via email or phone. Would you like the details?",
      },
      {
        intent: "pricing",
        examples: ["price", "cost", "pricing"],
        response:
          "Pricing depends on the service. Let me know what you're looking for!",
      },
      {
        intent: "unknown",
        examples: [],
        response:
          "Sorry, I didn’t quite understand that. Could you rephrase or ask something else?",
      },
    ];

    let response: {
      userMessage: any;
      botMessage?: any;
      conversationId?: string;
    } = {
      userMessage,
      conversationId: conversationId,
    };

    if (!isEmail) {
      const normalizedText = text.toLowerCase().trim();

      let botResponse = "";

      for (let message of botResponses) {
        if (message.examples.includes(normalizedText)) {
          botResponse = message.response;
        }
      }

      data.body.text = botResponse;
      data.body.sender = "ai";
      console.log("data.body of ai: ", data.body);

      botMessage = await createMessageRepository(data);
      response.botMessage = botMessage;
    }

    console.log(userMessage);
    console.log(botMessage);

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
