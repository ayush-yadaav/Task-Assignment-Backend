import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
// app.use(cors(
//     {
//         origin: "https://task-assignment-gilt.vercel.app/",
//         credentials: true
//     }
// ));

app.use(
  cors({
    origin:[
    "https://task-assignment-gilt.vercel.app/",
    "http://localhost:5173", 
    ],          // React dev origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

export default app;