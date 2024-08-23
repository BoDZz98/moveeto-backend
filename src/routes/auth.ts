import { Router } from "express";
import { body } from "express-validator";

import { login, signup } from "../controllers/auth";
import User from "../models/userModel";

const router = Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password is too short "),
    body("name").trim().not().isEmpty().withMessage('Name can\'t be empty'),
  ],
  signup
);

router.post("/login", login);

export default router;
