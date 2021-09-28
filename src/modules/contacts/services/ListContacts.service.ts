import { Response } from "express";
import UsersRepository from "@modules/users/models/repositories/Users.repository";
import ContactsRepository from "@modules/contacts/models/repositories/Contacts.repository";
import mongoose, { ObjectId } from "mongoose";

export default class ListContactsService {
  static async execute(
    res: Response,
  ): Promise<(mongoose.Document & { _id: ObjectId })[] | null | undefined> {
    const userId = res.locals.user.id;
    const userExists = await UsersRepository.findById(userId);

    if (userExists) {
      const contacts = await ContactsRepository.getAllContacts(userId);
      return contacts;
    }
  }
}
