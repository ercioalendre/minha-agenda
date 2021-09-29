import UsersRepository from "@modules/users/models/repositories/Users.repository";
import { IUser } from "@modules/users/models/Users.model";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

class CreateUserService {
  errorMessage: string;
  inputError: string;

  constructor() {
    this.errorMessage = "";
    this.inputError = "";
  }

  public async execute({
    name,
    phone,
    email,
    password,
  }: IUser): Promise<(mongoose.Document & { _id: ObjectId }) | null | boolean | undefined> {
    const emailExists = await UsersRepository.findByEmail(email);

    if (emailExists) {
      this.errorMessage = "Este endereço de e-mail já está cadastrado.";
      this.inputError = "email";
      return false;
    }

    const phoneExists = await UsersRepository.findByPhone(phone);

    if (phoneExists) {
      this.errorMessage = "Este número de telefone já está cadastrado.";
      this.inputError = "phone";
      return false;
    }

    const createNewUser = await UsersRepository.create({
      name,
      email,
      phone,
      password,
    });

    if (createNewUser) {
      return true;
    }
  }
}

export default new CreateUserService();
