import { Message } from "../models";

export const getMessagesRepository = async (data: any) => {
  try {
    const page = Number(data.query?.page) || 1;
    const limit = Number(data.query?.limit) || 10;
    const offset = (page - 1) * limit;

    const messages = await Message.findAndCountAll({
      attributes: ["id", "text", "sender", "sent_at", "conversationId"],
      limit,
      offset,
    });

    const totalCount = Array.isArray(messages.count)
      ? messages.count.length
      : messages.count;

    return {
      rows: messages.rows,
      count: totalCount,
      page,
      limit,
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
