"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const userModel_1 = __importDefault(require("../models/userModel"));
const router = (0, express_1.Router)();
router.post("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, { req }) => {
        return userModel_1.default.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
                return Promise.reject("E-Mail address already exists!");
            }
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("Password is too short "),
    (0, express_validator_1.body)("name").trim().not().isEmpty().withMessage('Name can\'t be empty'),
], auth_1.signup);
router.post("/login", auth_1.login);
exports.default = router;
