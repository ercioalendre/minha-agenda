import { Router } from "express";
import isUserLoggedIn from "@middlewares/isUserLoggedIn";
import usersRouter from "@modules/users/routes/Users.routes";

const router = Router();

router.use(usersRouter);
router.get("/", isUserLoggedIn, (req, res) => res.redirect("/login"));
router.get("*", (req, res) => {
  res.status(404).render("main", {
    page: "page-not-found",
  });
});

export default router;
