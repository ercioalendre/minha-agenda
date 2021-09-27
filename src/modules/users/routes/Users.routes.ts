import { Router } from "express";
import UsersController from "@modules/users/controllers/Users.controller";
import isAuthenticated from "@middlewares/isAuthenticated";
import isUserLoggedIn from "@middlewares/isUserLoggedIn";
import checkNewUserForm from "@middlewares/checkNewUserForm";
import checkLoginUserForm from "@middlewares/checkLoginUserForm";
import ContactsController from "@modules/contacts/controllers/Contacts.controller";

const usersRouter = Router();

usersRouter.get("/signup", isUserLoggedIn, UsersController.signup);
usersRouter.post("/signup", checkNewUserForm, UsersController.create);
usersRouter.get("/login", isUserLoggedIn, UsersController.login);
usersRouter.post("/login", checkLoginUserForm, UsersController.createUserSession);
usersRouter.get("/logout", UsersController.logout);
usersRouter.get("/my-account", isAuthenticated, UsersController.index);
usersRouter.post("/my-account/new-contact", isAuthenticated, ContactsController.create);
usersRouter.post("/my-account/edit-contact", isAuthenticated, ContactsController.edit);
usersRouter.post("/my-account/delete-contact/", isAuthenticated, ContactsController.delete);

export default usersRouter;
