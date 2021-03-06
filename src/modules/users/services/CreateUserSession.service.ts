import jwt from "@config/auth/jwt";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Response } from "express";
import renderPageWithMessage from "@shared/http/providers/renderPageWithMessage";
import UsersRepository from "@modules/users/models/repositories/Users.repository";

interface IRequest {
  email: string;
  password: string;
  res: Response;
  origin?: string;
}

export default class CreateUserSessionService {
  static async execute({ email, password, res, origin }: IRequest): Promise<void | boolean> {
    const user = Object.create(await UsersRepository.findByEmail(email));
    const userPassword = user.password || "";
    const passwordComparison = await compare(password, userPassword);

    if (!user || !passwordComparison) {
      renderPageWithMessage("E-mail ou senha incorretos.", "", res, "login-block", "error", 401);
      return false;
    }

    res.locals.user = {
      name: user.name,
    };

    const token = sign({ name: user.name }, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    res.cookie("UserSessionToken", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    if (origin === "signup") {
      renderPageWithMessage("Conta criada com sucesso!", "", res, "signup-success", "success", 201);
    } else {
      res.redirect("/my-account");
    }
  }
}
