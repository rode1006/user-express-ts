import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./config/cors";
import { authRoutes } from "./routes/authRoutes";
import { profileRoutes } from "./routes/profileRoute";
import { messageRoutes } from "./routes/messageRoutes";

const app: Application = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/socket.io", messageRoutes);

export default app;
