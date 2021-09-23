import mongoose, { ObjectId } from "mongoose";
import { IUser, UsersSchema } from "@modules/users/models/Users.model";
import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";

const User = mongoose.model("User", UsersSchema);

export default class UsersRepository {
  static async findByPhone(phone: string): Promise<(mongoose.Document & { _id: ObjectId }) | null> {
    const user = await User.findOne({
      where: {
        phone: { $eq: phone },
      },
    }).exec();
    return user;
  }

  static async findByEmail(email: string): Promise<(mongoose.Document & { _id: ObjectId }) | null> {
    const user = await User.findOne({
      where: {
        email: { $eq: email },
      },
    }).exec();
    return user;
  }

  static async create({
    name,
    email,
    phone,
    password,
  }: IUser): Promise<(mongoose.Document & { _id: ObjectId }) | null> {
    const hashedPassword = await hash(password, 8);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    try {
      await user.save();
    } catch (error) {
      throw new AppError(error as string);
    }

    return user;
  }
}
