import { Router } from "express";
import UsersController from "@modules/users/controllers/Users.controller";
import isAuthenticated from "@middlewares/isAuthenticated";
import isUserLoggedIn from "@middlewares/isUserLoggedIn";
import checkNewUserForm from "@middlewares/checkNewUserForm";
import checkLoginUserForm from "@middlewares/checkLoginUserForm";

const usersRouter = Router();

usersRouter.get("/signup", isUserLoggedIn, UsersController.signup);
usersRouter.post("/signup", checkNewUserForm, UsersController.create);
usersRouter.get("/login", isUserLoggedIn, UsersController.login);
usersRouter.post("/login", checkLoginUserForm, UsersController.createUserSession);
usersRouter.get("/logout", UsersController.logout);
usersRouter.get("/my-account", isAuthenticated, UsersController.index);

export default usersRouter;
