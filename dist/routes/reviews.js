"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviews_1 = require("../controllers/reviews");
const router = (0, express_1.Router)();
router.get("/getUserReviews/:email", reviews_1.getUserReviews);
exports.default = router;
