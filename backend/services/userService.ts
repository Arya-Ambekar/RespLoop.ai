import {
  getUsersRepository,
  getUserRepository,
  createUserRepository,
} from "../repositories/userRepository.ts";
import { createConversationRepository } from "../repositories/conversationRepository.ts";

export const getUsersService = async (data: any) => {
  try {
    let users = await getUsersRepository(data);

    return {
      data: users.rows,
      pagination: {
        total: users.count,
        page: users.page,
        limit: users.limit,
        totalPages: Math.ceil(users.count / users.limit),
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getUserService = async (data: any) => {
  try {
    const { id } = data.params;

    let user = await getUserRepository({ id });
    return user;
  } catch (error) {
    throw error;
  }
};

export const createUserService = async (data: any) => {
  try {
    const serial_id = "CONVO-002";
    // console.log("data in createUserService: ", data);
    data.body.email_id = data.body?.email;
    let user = await createUserRepository(data);
    data.body.serial_id = serial_id;
    data.body.userId = user.id;

    // create new conversation for new user
    let conversation = await createConversationRepository(data);
    let response = {
      user,
      conversation,
    };
    return response;
  } catch (error) {
    throw error;
  }
};
