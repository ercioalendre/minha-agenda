import { Request, Response } from "express";
import CreateUserService from "@modules/users/services/CreateUser.service";
import CreateUserSessionService from "@modules/users/services/CreateUserSession.service";
import AppError from "@shared/errors/AppError";
import ListContactsService from "@modules/contacts/services/ListContacts.service";
import renderPageWithMessage from "@shared/http/providers/renderPageWithMessage";

export default class UsersController {
  static async index(req: Request, res: Response): Promise<void> {
    const contacts = await ListContactsService.execute(res);
    return res.render("main", {
      page: "my-account",
      msgType: "",
      msgContent: "",
      inputError: "",
      formData: {},
      contacts,
    });
  }

  static async login(req: Request, res: Response): Promise<void> {
    res.render("main", {
      page: "login-block",
      msgType: "",
      msgContent: "",
      inputError: "",
      formData: {},
    });
  }

  static async signup(req: Request, res: Response): Promise<void> {
    res.render("main", {
      page: "new-user",
      msgType: "",
      msgContent: "",
      inputError: "",
      formData: {},
    });
  }

  static async create(req: Request, res: Response): Promise<boolean | undefined> {
    if (res.locals.message.msgContent && res.locals.message.msgContent.length > 0) {
      const { msgContent, inputError } = res.locals.message;
      renderPageWithMessage(msgContent, inputError, res);
      return false;
    }

    const { name, phone, email, password } = res.locals.formData;
    const createNewUser = await CreateUserService.execute({ name, phone, email, password });

    if (CreateUserService.errorMessage.length > 0) {
      renderPageWithMessage(CreateUserService.errorMessage, CreateUserService.inputError, res);
      return false;
    }

    if (createNewUser) {
      await CreateUserSessionService.execute({ email, password, res, origin: "signup" });
    }
  }

  static async createUserSession(req: Request, res: Response): Promise<boolean | undefined> {
    const message = res.locals.message;

    if (message) {
      if (message.msgContent) {
        const { msgContent, inputError } = res.locals.message;
        renderPageWithMessage(msgContent, inputError, res, "login-block", "error", 401);
        return false;
      }
    }

    const authHeader = req.body;
    if (authHeader) {
      const { email, password } = authHeader;
      await CreateUserSessionService.execute({
        email,
        password,
        res,
      });
    } else {
      throw new AppError("authHeader was not found.");
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie("UserSessionToken").redirect("/login");
  }
}
