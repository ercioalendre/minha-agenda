import { Response } from "express";
import UsersRepository from "@modules/users/models/repositories/Users.repository";
import ContactsRepository from "../models/repositories/Contacts.repository";
import { IContact } from "../models/Contacts.model";
import ListContactsService from "./ListContacts.service";

export default class CreateContactService {
  static async execute(
    { contact_owner_id, contact_name, contact_phone, contact_email = "" }: IContact,
    res: Response,
  ): Promise<void | boolean> {
    if (contact_owner_id) {
      const contactOwnerExists = await UsersRepository.findById(contact_owner_id);

      if (contactOwnerExists) {
        const createContact = await ContactsRepository.create({
          contact_owner_id,
          contact_name,
          contact_phone,
          contact_email,
        });

        if (createContact) {
          const contacts = await ListContactsService.execute(res);

          res.render("main", {
            page: "my-account",
            msgContent: "Contato criado com sucesso!",
            inputError: "",
            msgType: "success",
            contacts,
          });
        }
      }
    }
  }
}
