import { Op } from "sequelize";
import { Conversation } from "../models/conversation.model.ts";
import { Ticket } from "../models/ticket.model.ts";
import { User } from "../models/user.model.ts";

export const getTicketsRepository = async (data: any) => {
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

    // filter by status
    const status = data.query.status;
    console.log(status);
    console.log(
      "status?.trim()?.toLowerCase(): ",
      status?.trim()?.toLowerCase(),
    );
    const statusFilter =
      typeof status === "string" &&
      status?.trim()?.toLowerCase() !== "all statuses"
        ? status?.trim()?.toLowerCase()
        : null;
    console.log(statusFilter);

    const tickets = await Ticket.findAndCountAll({
      attributes: ["id", "reason", "status", "conversationId"],
      where: {
        ...(statusFilter &&
          statusFilter !== "all filters" && {
            status: { [Op.eq]: statusFilter },
          }),
      },
      include: [
        {
          model: Conversation,
          where: {
            ...(searchTerm && {
              serial_id: { [Op.iLike]: `%${searchTerm}%` },
            }),
          },
          attributes: ["serial_id"],
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
        },
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const totalCount = Array.isArray(tickets.count)
      ? tickets.count.length
      : tickets.count;

    return {
      rows: tickets.rows,
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
    const ticket = await Ticket.findOne({
      where: { id },
      attributes: ["id", "reason", "status", "conversationId"],
    });

    return ticket;
  } catch (error) {
    throw error;
  }
};

export const createTicketRepository = async (data: any) => {
  try {
    console.log("inside createTicketRepository: ", data);
    const ticket = await Ticket.create(data);
    return ticket;
  } catch (error) {
    throw error;
  }
};

export const updateTicketRepository = async (data: any) => {
  try {
    const { id } = data.params;

    const ticket = await Ticket.update(data.body, {
      where: { id },
      returning: true,
    });

    return ticket;
  } catch (error) {
    throw error;
  }
};

export const deleteTicketRepository = async (data: any) => {
  try {
    const ticket = await Ticket.destroy({ where: { id: data } });
    return ticket;
  } catch (error) {
    throw error;
  }
};
