import { Request, Response } from "express";
import { Messages } from "../models/messageModal";
interface Message {
  sender: string;
  receiver: string;
  message: string;
}
class MessageController {
  async getAll(req: Request, res: Response) {
    const { username } = req.body;
    
    try {
      const messages = await Messages.find({
        $or: [{ receiver: username }, { sender: username }],
      });      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  async create(messageData: Message) {
    const newMessage = new Messages(messageData);
    await newMessage.save();
  }
}

export default new MessageController();
