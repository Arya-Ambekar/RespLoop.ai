import { Conversation } from "../models/conversation.model.ts";

export const getConversationsRepository = async (data: any) => {
  try {
    const page = Number(data.query?.page) || 1;
    const limit = Number(data.query?.limit) || 10;
    const offset = (page - 1) * limit;

    let conversations = await Conversation.findAndCountAll({
      attributes: [
        "id",
        "serial_id",
        "last_messaged_at",
        "resolution_status",
        "userId",
        "createdAt",
      ],
      limit,
      offset,
    });
    const totalCount = Array.isArray(conversations.count)
      ? conversations.count.length
      : conversations.count;
    return {
      rows: conversations.rows,
      count: totalCount,
      page,
      limit,
    };
  } catch (error) {
    throw error;
  }
};

export const getConversationRepository = async ({ id }: { id: string }) => {
  try {
    let conversation = await Conversation.findOne({
      where: { id },
      attributes: [
        "id",
        "serial_id",
        "last_messaged_at",
        "resolution_status",
        "userId",
        "createdAt",
      ],
    });
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const createConversationRepository = async (data: any) => {
  try {
    let conversation = await Conversation.create(data.body);
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const updateConversationRepository = async (data: any) => {
  try {
    const { id } = data.params;

    const conversation = await Conversation.update(data.body, {
      where: { id },
      returning: true,
    });
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const deleteConversationRepository = async (data: any) => {
  try {
    const conversation = await Conversation.destroy({ where: { id: data } });
    return conversation;
  } catch (error) {
    throw error;
  }
};
