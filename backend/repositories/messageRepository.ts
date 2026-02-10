import { Op } from "sequelize";
import { Message } from "../models/message.model.ts";

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
    const message = await Message.create(data.body);
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
