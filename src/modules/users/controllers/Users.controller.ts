import { Request, Response } from "express";
import createUserService from "@modules/users/services/CreateUser.service";
import createUserSessionService from "@modules/users/services/CreateUserSession.service";
import AppError from "@shared/errors/AppError";

class UsersController {
  static async index(req: Request, res: Response): Promise<void> {
    res.render("main", {
      page: "my-account",
      msgType: "",
      msgContent: "",
      inputError: "",
      formData: {},
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

  static async create(req: Request, res: Response): Promise<void> {
    await createUserService.execute(res);
  }

  static async createUserSession(req: Request, res: Response): Promise<void> {
    const authHeader = req.body;
    if (authHeader) {
      const { email, password } = authHeader;
      await createUserSessionService.execute({
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

export default UsersController;
