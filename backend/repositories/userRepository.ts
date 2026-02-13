import { User } from "../models/user.model.ts";

export const getUsersRepository = async (data: any) => {
  try {
    const page = Number(data.query?.page) || 1;
    const limit = Number(data.query?.limit) || 10;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      attributes: ["id", "email_id"],
      limit,
      offset,
    });

    const totalCount = Array.isArray(users.count)
      ? users.count.length
      : users.count;

    return {
      rows: users.rows,
      count: totalCount,
      page,
      limit,
    };
  } catch (error) {
    throw error;
  }
};

export const getUserRepository = async ({ id }: { id: string }) => {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: ["id", "email_id"],
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const createUserRepository = async (data: any) => {
  try {
    // console.log("data in createUserRepository: ", data);
    const user = await User.create(data.body);
    return user;
  } catch (error) {
    throw error;
  }
};
