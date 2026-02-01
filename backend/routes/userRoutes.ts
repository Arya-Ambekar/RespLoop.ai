import express from "express";

import {
  getUsersController,
  getUserController,
  createUserController,
} from "../controllers/userController.ts";

const router = express.Router();

router.get("/users", getUsersController);
router.get("/users/:id", getUserController);
router.post("/users", createUserController);

export default router;
