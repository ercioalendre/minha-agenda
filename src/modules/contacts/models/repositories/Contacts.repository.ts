import mongoose from "mongoose";
import AppError from "@shared/errors/AppError";
import { ContactsSchema, IContact } from "@modules/contacts/models/Contacts.model";
import { DeleteResult, ObjectId } from "mongodb";

const Contact = mongoose.model("Contacts", ContactsSchema);

export default class ContactsRepository {
  static async findById(
    contactId: ObjectId,
  ): Promise<(mongoose.Document & { _id: ObjectId }) | null> {
    return await Contact.findById(contactId).exec();
  }

  static async getAllContacts(
    userId: string,
  ): Promise<(mongoose.Document & { _id: ObjectId })[] | null> {
    return await Contact.find({
      where: {
        contact_owner_id: { $eq: userId },
      },
    }).exec();
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

  static async delete(contactId: ObjectId): Promise<DeleteResult> {
    return await Contact.deleteOne({
      where: {
        _id: { $eq: contactId },
      },
    }).exec();
  }
}
