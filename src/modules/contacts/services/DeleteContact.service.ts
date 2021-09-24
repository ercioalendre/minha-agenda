import { Response } from "express";
import UsersRepository from "@modules/users/models/repositories/Users.repository";
import ContactsRepository from "../models/repositories/Contacts.repository";
import ListContactsService from "./ListContacts.service";
import { ObjectId } from "mongodb";

export default class DeleteContactService {
  static async execute(
    contact_owner_id: ObjectId,
    contact_id: ObjectId,
    res: Response,
  ): Promise<void | boolean> {
    const contactOwnerExists = await UsersRepository.findById(contact_owner_id);
    const contactExists = await ContactsRepository.findById(contact_id);

    if (contactOwnerExists) {
      if (contactExists) {
        const deleteContact = await ContactsRepository.delete(contact_id);

        if (deleteContact) {
          const contacts = await ListContactsService.execute(res);

          res.render("main", {
            page: "my-account",
            msgContent: "Contato excluído com sucesso!",
            inputError: "",
            msgType: "success",
            contacts,
          });
        }
      }
    }
  }
}
