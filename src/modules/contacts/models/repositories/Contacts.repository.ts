import mongoose, { ObjectId } from "mongoose";
import AppError from "@shared/errors/AppError";
import { ContactsSchema, IContact } from "@modules/contacts/models/Contacts.model";

const Contact = mongoose.model("Contacts", ContactsSchema);

export default class UsersRepository {
  static async findById(userId: string): Promise<(mongoose.Document & { _id: ObjectId }) | null> {
    const user = await Contact.findOne({
      where: {
        contact_owner_id: { $eq: userId },
      },
    }).exec();
    return user;
  }

  static async create({
    contact_owner_id,
    contact_name,
    contact_phone,
    contact_email,
  }: IContact): Promise<(mongoose.Document & { _id: ObjectId }) | null> {
    const contact = new Contact({
      contact_owner_id,
      contact_name,
      contact_phone,
      contact_email,
    });

    try {
      await contact.save();
    } catch (error) {
      throw new AppError(error as string);
    }

    return contact;
  }
}
