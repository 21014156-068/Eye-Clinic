import cors from "cors";
import express from "express";
import morgan from "morgan";
import { env } from "./config/env.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { publicRoutes } from "./routes/publicRoutes.js";

export const app = express();

app.use(
  cors({
    credentials: true,
    origin: env.clientUrl,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/public", publicRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "EyeCon API is running successfully",
  });
});

app.use((error, _request, response, _next) => {
  const statusCode = error.name === "ValidationError" ? 400 : 500;

  response.status(statusCode).json({
    message: error.message || "Something went wrong on the server.",
  });
});
