import express from "express";

import {
  getMessagesController,
  getMessageController,
  createMessageController,
  updateMessageController,
  deleteMessageController,
} from "../controllers/messageController.ts";

const router = express.Router();

router.get("/messages", getMessagesController);
router.get("/messages/:id", getMessageController);
router.post("/messages", createMessageController);
router.put("/messages/:id", updateMessageController);
router.delete("/messages/:id", deleteMessageController);

export default router;
