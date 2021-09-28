import { Response } from "express";
import UsersRepository from "@modules/users/models/repositories/Users.repository";
import ContactsRepository from "../models/repositories/Contacts.repository";
import { IContact } from "../models/Contacts.model";
import ListContactsService from "./ListContacts.service";

export default class EditContactService {
  static async execute(
    { contact_owner_id, contact_id, contact_name, contact_phone, contact_email = "" }: IContact,
    res: Response,
  ): Promise<void | boolean> {
    if (contact_owner_id) {
      const contactOwnerExists = await UsersRepository.findById(contact_owner_id);

      if (contactOwnerExists && contact_id) {
        const contactExists = await ContactsRepository.findById(contact_id);

        if (contactExists) {
          ContactsRepository.update({
            contact_name,
            contact_phone,
            contact_email,
            contact_id,
          });

          const contacts = await ListContactsService.execute(res);

          res.render("main", {
            page: "my-account",
            msgContent: "Contato editado com sucesso!",
            inputError: "",
            msgType: "success",
            contacts,
          });
        }
      }
    }
  }
}
