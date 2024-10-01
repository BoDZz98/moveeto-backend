"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lists_1 = require("../controllers/lists");
const router = (0, express_1.Router)();
// Fav and wishlist
router.post("/movie", lists_1.addMovie);
router.delete("/movie", lists_1.removeMovie);
// user Lists
router.post("/userLists", lists_1.createUserList);
router.delete("/userLists", lists_1.deleteUserList);
router.post("/userLists/movie", lists_1.addMovieToUserList);
exports.default = router;
