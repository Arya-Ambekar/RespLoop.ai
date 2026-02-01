import express from "express";

import {
  getConversationsController,
  getConversationController,
  createConversationController,
  updateConversationController,
  deleteConversationController,
} from "../controllers/conversationController.ts";

const router = express.Router();

router.get("/conversations", getConversationsController);
router.get("/conversations/:id", getConversationController);
router.post("/conversations", createConversationController);
router.put("/conversations/:id", updateConversationController);
router.delete("/conversations/:id", deleteConversationController);

export default router;
