// import express, { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { authenticateToken } from './src/middlewares/authMiddleware'; // The middleware to authenticate token

// const app = express();

// // Simulated user database
// let users = [
//   { id: 1, username: 'john_doe', email: 'john@example.com', fullName: 'John Doe' }
// ];

// const secretKey = 'your-secret-key';

// // Get user profile
// app.get('/profile', authenticateToken, (req: Request, res: Response) => {
//   const userId = req.user.id; // Assuming `req.user` is populated by the authenticateToken middleware
//   const user = users.find(u => u.id === userId);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).send('User not found');
//   }
// });

// // Update user profile
// app.put('/profile', authenticateToken, (req: Request, res: Response) => {
//   const { username, email, fullName } = req.body;
//   const userId = req.user.id;

//   const user = users.find(u => u.id === userId);
//   if (user) {
//     user.username = username || user.username;
//     user.email = email || user.email;
//     user.fullName = fullName || user.fullName;
//     res.json(user);
//   } else {
//     res.status(404).send('User not found');
//   }
// });
