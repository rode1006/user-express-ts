import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
// import { sendMail } from '../utils/mailer';
class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email }).exec(); // Make sure to call exec()
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
      } else {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      // Check if user exists
      const user = await User.findOne({ email }).exec(); // Make sure to call exec()
      if (!user) {
        res.status(400).json({ message: "User not found" });
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(400).json({ message: "Invalid credentials" });
        } else {
          // Generate JWT token
          const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
          );
          res.cookie("auth_token", token, {
            httpOnly: false, // Ensures the cookie is only accessible by the server
            secure: false, // Ensure cookies are only sent over HTTPS in production
            maxAge: 3600000, // 12 hours
          });
          res.status(200).send("Login successful");
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new AuthController();
