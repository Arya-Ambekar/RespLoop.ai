import {
  getConversationsRepository,
  getConversationRepository,
  createConversationRepository,
  updateConversationRepository,
  deleteConversationRepository,
} from "../repositories/conversationRepository.ts";

export const getConversationsService = async (data: any) => {
  try {
    let conversations = await getConversationsRepository(data);

    return {
      data: conversations.rows,
      pagination: {
        total: conversations.count,
        page: conversations.page,
        limit: conversations.limit,
        totalPages: Math.ceil(conversations.count / conversations.limit),
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getConversationService = async (data: any) => {
  try {
    const { id } = data.params;

    let conversation = await getConversationRepository({ id });
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const createConversationService = async (data: any) => {
  try {
    let conversation = await createConversationRepository(data);
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const updateConversationService = async (data: any) => {
  try {
    let conversation = await updateConversationRepository(data);
    return conversation;
  } catch (error) {
    throw error;
  }
};

export const deleteConversationService = async (data: any) => {
  try {
    let conversation = await deleteConversationRepository(data);
    return conversation;
  } catch (error) {
    throw error;
  }
};
