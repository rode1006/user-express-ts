import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "your_jwt_secret"; // Replace with your secret key

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.auth_token; // Assuming token is stored in cookies as 'token'
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  } else {
    try {
      const decoded = jwt.verify(token, secret) as {
        username: string;
        email: string;
      }; // Verify token and extract email

      req.body.username = decoded.username; // Attach email to the request body
      req.body.email = decoded.email; // Attach email to the request body
      next();
    } catch (err) {
      console.error(err);

      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  }
};
