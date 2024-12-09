import { Router } from 'express';
import AuthController from '../controllers/authController';

const router: Router = Router();  // Explicitly typing the router

// Register route
router.post('/register', AuthController.register);

// Login route
router.post('/login', AuthController.login);


export { router as authRoutes };
