import type { Response, Request } from "express";
import {
  getMessagesService,
  getMessageService,
  createMessageService,
  updateMessageService,
  deleteMessageService,
} from "../services/messageService.ts";

export const getMessagesController = async (req: Request, res: Response) => {
  try {
    const messages = await getMessagesService(req);

    res.status(200).json({
      status: true,
      message: "All messages received successfully",
      data: messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getMessageController = async (req: Request, res: Response) => {
  try {
    const message = await getMessageService(req);

    res.status(200).json({
      status: true,
      message: "Message received successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const createMessageController = async (req: Request, res: Response) => {
  try {
    const message = await createMessageService(req);

    res.status(200).json({
      status: true,
      message: "Message created successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const updateMessageController = async (req: Request, res: Response) => {
  try {
    const message = await updateMessageService(req);

    res.status(200).json({
      status: true,
      message: "Message updated successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const deleteMessageController = async (req: Request, res: Response) => {
  try {
    const message = await deleteMessageService(req);

    res.status(200).json({
      status: true,
      message: "Message deleted successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
