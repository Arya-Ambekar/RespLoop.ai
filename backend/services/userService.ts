import {
  getUsersRepository,
  getUserRepository,
  createUserRepository,
} from "../repositories/userRepository.ts";

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
    let user = await createUserRepository(data);
    return user;
  } catch (error) {
    throw error;
  }
};
