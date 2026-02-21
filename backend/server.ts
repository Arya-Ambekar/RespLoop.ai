import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { sequelize } from "./models/index.ts";
import { createServer } from "node:http";
import { Server } from "socket.io";
import messageRoutes from "./routes/messageRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";
import conversationRoutes from "./routes/conversationRoutes.ts";
import ticketRoutes from "./routes/ticketRoutes.ts";
import loginRoutes from "./routes/loginRoute.ts";
import { createMessageService } from "./services/messageService.ts";
import path from "path";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1", messageRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", conversationRoutes);
app.use("/api/v1", ticketRoutes);
app.use("/api/v1", loginRoutes);

// Production deployment settings
if (process.env.NODE_ENV === "production") {
  // server our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

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

// socket.IO integration
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("chat", async (data, callback) => {
    try {
      // console.log("data in server.ts: ", data);
      // console.log("callback in server.ts: ", callback);
      const savedMessage = await createMessageService(data);
      console.log("savedMessage in server.ts: ", savedMessage);
      io.emit("chat", savedMessage);

      callback({ success: true });
    } catch (error) {
      callback({ error: "Failed to save message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
