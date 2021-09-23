import createUserSessionService from "@modules/users/services/CreateUserSession.service";
import { Response } from "express";
import renderPageWithMessage from "@shared/http/providers/renderPageWithMessage";
import UsersRepository from "@modules/users/models/repositories/Users.repository";

export default class CreateUserService {
  static async execute(res: Response): Promise<void | boolean> {
    const { name, phone, email, password } = res.locals.formData;
    const phoneExists = await UsersRepository.findByPhone(phone);
    const emailExists = await UsersRepository.findByEmail(email);
    const origin = "signup";

    if (res.locals.message.msgContent) {
      const { msgContent, inputError } = res.locals.message;
      renderPageWithMessage(msgContent, inputError, res);
      return false;
    }

    if (emailExists) {
      renderPageWithMessage("Este endereço de e-mail já está cadastrado.", "email", res);
      return false;
    }

    if (phoneExists) {
      renderPageWithMessage("Este número de telefone já está cadastrado.", "phone", res);
      return false;
    }

    const createUser = await UsersRepository.create({
      name,
      email,
      phone,
      password,
    });

    console.log(createUser);
    if (createUser) {
      await createUserSessionService.execute({ phone, password, origin, res });
    }
  }
}
