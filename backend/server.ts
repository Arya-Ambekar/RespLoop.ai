import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.resource(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
