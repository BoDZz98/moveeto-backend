"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.login = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const reqBody = req.body; // vip
    // Checking if there is errors in the validation
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        const message = errors.array()[0].msg;
        return res.status(400).json({ message });
    }
    const { name, email, password } = reqBody;
    try {
        const hashedPw = yield bcrypt_1.default.hash(password, 10);
        const newuser = yield userModel_1.default.create({
            name,
            email,
            password: hashedPw,
        });
        return res
            .status(201)
            .json({ message: "User created!", userId: newuser._id });
    }
    catch (error) {
        console.log("error while signing up", error);
        return res.status(500).json({ message: error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body; // vip
    const { email, password } = reqBody;
    try {
        // Cheking Email
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            const message = "A user with this email could not be found";
            return res.status(400).json({ message });
        }
        // Checking pass
        const isCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isCorrect)
            return res.status(400).json({ message: "Wrong password" });
        // Creating token
        const token = jsonwebtoken_1.default.sign({
            email: email,
            userId: user._id.toString(),
        }, "somesupersecretsecret", { expiresIn: "1h" });
        return res.status(200).json({ token, user });
    }
    catch (error) {
        console.log("error while logging in");
        return res.status(500).json({ message: error });
    }
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield userModel_1.default.findById(userId);
        // console.log("user is", user);
        return res.status(200).json({ user });
    }
    catch (error) {
        console.log("Error while fetching user", error);
        return res.status(500).json({ message: error });
    }
});
exports.getUser = getUser;
