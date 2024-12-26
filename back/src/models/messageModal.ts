import mongoose, { Document, Schema } from "mongoose";

interface IMessage extends Document {
  date: Date;
  sender: string;
  receiver: string;
  message: string;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Messages = mongoose.model<IMessage>("Messages", messageSchema);
