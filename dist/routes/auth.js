"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// const User = require('../models/user');
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.put("/signup", 
// [
//   body('email')
//     .isEmail()
//     .withMessage('Please enter a valid email.')
//     .custom((value, { req }) => {
//       return User.findOne({ email: value }).then(userDoc => {
//         if (userDoc) {
//           return Promise.reject('E-Mail address already exists!');
//         }
//       });
//     })
//     .normalizeEmail(),
//   body('password')
//     .trim()
//     .isLength({ min: 5 }),
//   body('name')
//     .trim()
//     .not()
//     .isEmpty()
// ],
auth_1.signup);
router.post("/login", auth_1.login);
exports.default = router;
