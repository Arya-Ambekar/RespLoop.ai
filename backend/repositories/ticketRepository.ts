import { Op } from "sequelize";
import { Conversation } from "../models/conversation.model.ts";
import { Ticket } from "../models/ticket.model.ts";

export const getTicketsRepository = async (data: any) => {
  try {
    const page = Number(data.query?.page) || 1;
    const limit = Number(data.query?.limit) || 10;
    const offset = (page - 1) * limit;
    const search = data.query.search;
    const searchTerm =
      typeof search === "string" && search.trim().length > 0
        ? search.trim()
        : null;

    const messages = await Ticket.findAndCountAll({
      attributes: ["id", "reason", "status", "conversationId"],
      include: [
        {
          model: Conversation,
          where: {
            ...(searchTerm && {
              serial_id: { [Op.iLike]: `%${searchTerm}%` },
            }),
          },
          attributes: ["serial_id"],
        },
      ],
      limit,
      offset,
    });

    const totalCount = Array.isArray(messages.count)
      ? messages.count.length
      : messages.count;

    return {
      rows: messages.rows,
      count: totalCount,
      page,
      limit,
    };
  } catch (error) {
    throw error;
  }
};

export const getTicketRepository = async ({ id }: { id: string }) => {
  try {
    const message = await Ticket.findOne({
      where: { id },
      attributes: ["id", "reason", "status", "conversationId"],
    });

    return message;
  } catch (error) {
    throw error;
  }
};

export const createTicketRepository = async (data: any) => {
  try {
    const message = await Ticket.create(data.body);
    return message;
  } catch (error) {
    throw error;
  }
};

export const updateTicketRepository = async (data: any) => {
  try {
    const { id } = data.params;

    const message = await Ticket.update(data.body, {
      where: { id },
      returning: true,
    });

    return message;
  } catch (error) {
    throw error;
  }
};

export const deleteTicketRepository = async (data: any) => {
  try {
    const message = await Ticket.destroy({ where: { id: data } });
    return message;
  } catch (error) {
    throw error;
  }
};
