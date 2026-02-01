import {
  getMessagesRepository,
  getMessageRepository,
  createMessageRepository,
  updateMessageRepository,
  deleteMessageRepository,
} from "../repositories/messageRepository.ts";

export const getMessagesService = async (data: any) => {
  try {
    let messages = await getMessagesRepository(data);

    return {
      data: messages.rows,
      pagination: {
        total: messages.count,
        page: messages.page,
        limit: messages.limit,
        totalPages: Math.ceil(messages.count / messages.limit),
      },
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
    let message = await createMessageRepository(data);
    return message;
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
