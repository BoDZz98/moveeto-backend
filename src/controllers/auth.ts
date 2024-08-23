import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const reqBody = req.body as { email: string; name: string; password: string }; // vip
  // Checking if there is errors in the validation
  if (!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    const message = errors.array()[0].msg;
    return res.status(400).json({ message });
  }

  const { name, email, password } = reqBody;

  try {
    const hashedPw = await bcrypt.hash(password, 10);
    const newuser = await User.create({
      name,
      email,
      password: hashedPw,
    });

    return res
      .status(201)
      .json({ message: "User created!", userId: newuser._id });
  } catch (error) {
    console.log("error while signing up", error);
    return res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const reqBody = req.body as { email: string; password: string }; // vip
  const { email, password } = reqBody;

  try {
    // Cheking Email
    const user = await User.findOne({ email: email });
    if (!user) {
      const message = "A user with this email could not be found";
      return res.status(400).json({ message });
    }

    // Checking pass
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return res.status(400).json({ message: "Wrong password" });

    // Creating token
    const token = jwt.sign(
      {
        email: email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, user });

    return user;
  } catch (error) {
    console.log("error while logging in");
    return res.status(500).json({ message: error });
  }
};
