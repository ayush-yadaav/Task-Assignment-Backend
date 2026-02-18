// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import authRoutes from "./routes/auth.routes.js";
// import taskRoutes from "./routes/task.routes.js";

// dotenv.config();

// const app = express();

// app.use(express.json());
// // app.use(cors(
// //     {
// //         origin: "https://task-assignment-gilt.vercel.app/",
// //         credentials: true
// //     }
// // ));

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
//   "https://task-assignment-gilt.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true); // Postman allow

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

// app.use(helmet());
// app.use(morgan("dev"));

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/tasks", taskRoutes);

// export default app;
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const app = express();

// ✅ CORS FIRST (before routes)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://task-assignment-gilt.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Optional root route (avoid Cannot GET /)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

export default app;
