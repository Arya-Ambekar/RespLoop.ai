import express from "express";

import {
  getTicketsController,
  getTicketController,
  createTicketController,
  updateTicketController,
  deleteTicketController,
} from "../controllers/ticketController.ts";

const router = express.Router();

router.get("/tickets", getTicketsController);
router.get("/tickets/:id", getTicketController);
router.post("/tickets", createTicketController);
router.put("/tickets/:id", updateTicketController);
router.delete("/tickets/:id", deleteTicketController);

export default router;
