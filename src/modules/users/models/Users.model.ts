import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const Schema = mongoose.Schema;

export const UsersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, index: true, unique: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

export default mongoose.model("User", UsersSchema);
