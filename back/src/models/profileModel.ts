import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  username: string;
  fullname: string;
  birth: string;
  jobTitle: string;
  location: string;
  phoneNumber: string;
  gender: string;
  avatar: string;
  email: string;  
}

const ProfileSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  birth: { type: String },
  jobTitle: { type: String },
  location: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  avatar: { type: String },
});

export default mongoose.model<IProfile>("Profile", ProfileSchema);
