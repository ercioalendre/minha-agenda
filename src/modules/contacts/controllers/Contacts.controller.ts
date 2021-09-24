import { Request, Response } from "express";
import AppError from "@shared/errors/AppError";
import CreateContactService from "../services/CreateContact.service";
import DeleteContactService from "../services/DeleteContact.service";

export default class ContactsController {
  static async create(req: Request, res: Response): Promise<void> {
    const { name, phone, email } = req.body;
    try {
      await CreateContactService.execute(
        {
          contact_owner_id: res.locals.user.id,
          contact_name: name,
          contact_phone: phone,
          contact_email: email,
        },
        res,
      );
    } catch (error) {
      throw new AppError(error as string);
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const { contactId } = req.body;
    try {
      await DeleteContactService.execute(res.locals.user.id, contactId, res);
    } catch (error) {
      throw new AppError(error as string);
    }
  }
}
