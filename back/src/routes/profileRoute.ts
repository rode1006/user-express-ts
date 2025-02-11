import express from "express";
import ProfileController from "../controllers/profileController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();
// Use middleware to protect routes
router.use(authMiddleware);
// Routes
router.get("/all", ProfileController.getAll);
router.post("/", ProfileController.create);
router.put("/", ProfileController.update);
router.get("/", ProfileController.get);
router.delete("/", ProfileController.delete);

export { router as profileRoutes };
