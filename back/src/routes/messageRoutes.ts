import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import messageController from "../controllers/messageController";

const router = express.Router();

// Use middleware to protect routes
router.use(authMiddleware);

// Routes
router.get("/", messageController.getAll);

export { router as messageRoutes };