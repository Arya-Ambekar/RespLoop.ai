import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { sequelize } from "./models/index.ts";
import OpenAI from "openai";
import { createServer } from "node:http";
import { Server } from "socket.io";
import messageRoutes from "./routes/messageRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import conversationRoutes from "./routes/conversationRoutes.ts";
import ticketRoutes from "./routes/ticketRoutes.ts";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;
const server = createServer(app);
const io = new Server(server);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1", messageRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", conversationRoutes);
app.use("/api/v1", ticketRoutes);

// start server and connect database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");

    await sequelize.sync({ alter: false });
    console.log("Models synced");
  } catch (error) {
    console.error(error);
  }
})();

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
