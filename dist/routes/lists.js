"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lists_1 = require("../controllers/lists");
const router = (0, express_1.Router)();
router.post("/movie", lists_1.addRemoveMovie);
exports.default = router;
