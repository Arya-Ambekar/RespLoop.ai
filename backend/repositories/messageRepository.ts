import { Op } from "sequelize";
import { Message } from "../models/message.model.ts";
import { Conversation } from "../models/conversation.model.ts";

export const getMessagesRepository = async (data: any) => {
  try {
    const conversationId = data.query?.conversationId;

    const messages = await Message.findAndCountAll({
      where: {
        ...(conversationId && {
          conversationId: { [Op.eq]: conversationId },
        }),
      },
      attributes: [
        "id",
        "text",
        "sender",
        "sent_at",
        "conversationId",
        "createdAt",
      ],
      order: [["createdAt", "ASC"]],
    });

    return {
      rows: messages.rows,
    };
  } catch (error) {
    throw error;
  }
};

export const getMessageRepository = async ({ id }: { id: string }) => {
  try {
    const message = await Message.findOne({
      where: { id },
      attributes: ["id", "text", "sender", "sent_at", "conversationId"],
    });

    return message;
  } catch (error) {
    throw error;
  }
};

export const createMessageRepository = async (data: any) => {
  try {
    console.log("data in createMessageRepository: ", data.body);
    const message = await Message.create(data.body);

    const conversationId = message.conversationId;

    if (conversationId) {
      setImmediate(async () => {
        try {
          await Conversation.update(
            { last_messaged_at: message.sent_at },
            { where: { id: conversationId } },
          );
        } catch (err) {
          console.error("Conversation update failed:", err);
        }
      });
    }

    return message;
  } catch (error) {
    throw error;
  }
};

export const updateMessageRepository = async (data: any) => {
  try {
    const { id } = data.params;

    const message = await Message.update(data.body, {
      where: { id },
      returning: true,
    });

    return message;
  } catch (error) {
    throw error;
  }
};

export const deleteMessageRepository = async (data: any) => {
  try {
    const message = await Message.destroy({ where: { id: data } });
    return message;
  } catch (error) {
    throw error;
  }
};
