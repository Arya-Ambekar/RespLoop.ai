import {
  getTicketsRepository,
  getTicketRepository,
  createTicketRepository,
  updateTicketRepository,
  deleteTicketRepository,
} from "../repositories/ticketRepository.ts";

export const getTicketsService = async (data: any) => {
  try {
    let tickets = await getTicketsRepository(data);

    return {
      data: tickets.rows,
      pagination: {
        total: tickets.count,
        page: tickets.page,
        limit: tickets.limit,
        totalPages: Math.ceil(tickets.count / tickets.limit),
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getTicketService = async (data: any) => {
  try {
    const { id } = data.params;

    let ticket = await getTicketRepository({ id });
    return ticket;
  } catch (error) {
    throw error;
  }
};

export const createTicketService = async (data: any) => {
  try {
    let ticket = await createTicketRepository(data);
    return ticket;
  } catch (error) {
    throw error;
  }
};

export const updateTicketService = async (data: any) => {
  try {
    let ticket = await updateTicketRepository(data);
    return ticket;
  } catch (error) {
    throw error;
  }
};

export const deleteTicketService = async (data: any) => {
  try {
    let ticket = await deleteTicketRepository(data);
    return ticket;
  } catch (error) {
    throw error;
  }
};
