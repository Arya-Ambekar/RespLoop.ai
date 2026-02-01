import type { Response, Request } from "express";
import {
  getUsersService,
  getUserService,
  createUserService,
} from "../services/userService.ts";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsersService(req);

    res.status(200).json({
      status: true,
      message: "All users received successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const user = await getUserService(req);

    res.status(200).json({
      status: true,
      message: "User received successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req);

    res.status(200).json({
      status: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
