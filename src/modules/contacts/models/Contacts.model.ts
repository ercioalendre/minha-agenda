import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface IContact {
  contact_owner_id: ObjectId;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
}

const Schema = mongoose.Schema;

export const ContactsSchema = new Schema(
  {
    contact_owner_id: { type: ObjectId, required: true, index: true },
    contact_name: { type: String, required: true },
    contact_phone: { type: String, required: true },
    contact_email: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

export default mongoose.model("Contacts", ContactsSchema);
