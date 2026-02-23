import { Op } from "sequelize";
import { Conversation } from "../models/conversation.model.ts";
import { User } from "../models/user.model.ts";
import { Message } from "../models/message.model.ts";

export const getConversationsRepository = async (data: any) => {
  try {
    const page = Number(data.query?.page) || 1;
    const limit = Number(data.query?.limit) || 10;
    const offset = (page - 1) * limit;

    // search term
    const search = data.query.search;
    const searchTerm =
      typeof search === "string" && search.trim().length > 0
        ? search.trim()
        : null;

    // Filter by resolution status
    const resolutionStatus = data.query.resolution_status;
    const resolutionStatusFilter =
      typeof resolutionStatus === "string" &&
      resolutionStatus?.trim()?.toLowerCase() !== "all statuses"
        ? resolutionStatus?.trim()?.toLowerCase()
        : null;

    let conversations = await Conversation.findAndCountAll({
      attributes: [
        "id",
        "serial_id",
        "last_messaged_at",
        "resolution_status",
        "userId",
        "createdAt",
      ],
      where: {
        ...(resolutionStatusFilter && {
          resolution_status: { [Op.eq]: resolutionStatusFilter },
        }),
      },
      include: [
        {
          model: User,
          where: {
            ...(searchTerm && {
              email_id: { [Op.iLike]: `%${searchTerm}%` },
            }),
          },
          attributes: ["email_id"],
        },
      ],
      order: [["createdAt", "DESC"]],
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
      include: [
        {
          model: Message,
          attributes: ["id", "text", "sender"],
        },
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

export const updateResolutionStatus = async (data: any) => {
  try {
    const { conversationId } = data;
    const conversation = await Conversation.update(data, {
      where: { id: conversationId },
      returning: true,
    });

    return conversation;
  } catch (error) {
    throw error;
  }
};

export const getResolutionStatus = async (data: any) => {
  try {
    const { conversationId } = data;
    const conversation = await Conversation.findOne({
      where: { id: conversationId },
      attributes: ["id", "resolution_status"],
    });
    return conversation;
  } catch (error) {
    throw error;
  }
};
