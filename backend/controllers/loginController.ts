import type { Response, Request } from "express";
import { loginService } from "../services/loginService.ts";

export const login = async (req: Request, res: Response) => {
  try {
    const userLogin = await loginService(req);

    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      data: userLogin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
