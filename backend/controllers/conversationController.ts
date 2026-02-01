import type { Response, Request } from "express";
import {
  getConversationsService,
  getConversationService,
  createConversationService,
  updateConversationService,
  deleteConversationService,
} from "../services/conversationService.ts";

export const getConversationsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const conversations = await getConversationsService(req);

    res.status(200).json({
      status: true,
      message: "All conversations received successfully",
      data: conversations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getConversationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const conversation = await getConversationService(req);

    res.status(200).json({
      status: true,
      message: "Conversation received successfully",
      data: conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const createConversationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const conversation = await createConversationService(req);

    res.status(200).json({
      status: true,
      message: "Conversation created successfully",
      data: conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const updateConversationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const conversation = await updateConversationService(req);

    res.status(200).json({
      status: true,
      message: "Conversation updated successfully",
      data: conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const deleteConversationController = async (
  req: Request,
  res: Response,
) => {
  try {
    const conversation = await deleteConversationService(req);

    res.status(200).json({
      status: true,
      message: "Conversation deleted successfully",
      data: conversation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
