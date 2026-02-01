import type { Response, Request } from "express";
import {
  getTicketsService,
  getTicketService,
  createTicketService,
  updateTicketService,
  deleteTicketService,
} from "../services/ticketService.ts";

export const getTicketsController = async (req: Request, res: Response) => {
  try {
    const tickets = await getTicketsService(req);

    res.status(200).json({
      status: true,
      ticket: "All tickets received successfully",
      data: tickets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      ticket: "Internal server error",
    });
  }
};

export const getTicketController = async (req: Request, res: Response) => {
  try {
    const ticket = await getTicketService(req);

    res.status(200).json({
      status: true,
      ticket: "Ticket received successfully",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      ticket: "Internal server error",
    });
  }
};

export const createTicketController = async (req: Request, res: Response) => {
  try {
    const ticket = await createTicketService(req);

    res.status(200).json({
      status: true,
      ticket: "Ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      ticket: "Internal server error",
    });
  }
};

export const updateTicketController = async (req: Request, res: Response) => {
  try {
    const ticket = await updateTicketService(req);

    res.status(200).json({
      status: true,
      ticket: "Ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      ticket: "Internal server error",
    });
  }
};

export const deleteTicketController = async (req: Request, res: Response) => {
  try {
    const ticket = await deleteTicketService(req);

    res.status(200).json({
      status: true,
      ticket: "Ticket deleted successfully",
      data: ticket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      ticket: "Internal server error",
    });
  }
};
