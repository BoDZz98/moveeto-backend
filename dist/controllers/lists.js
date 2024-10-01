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
exports.addMovieToUserList = exports.deleteUserList = exports.createUserList = exports.removeMovie = exports.addMovie = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
// Adding movies to fav and wishlist --------------------------------------------------
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, list, movie } = yield req.body;
    const user = yield userModel_1.default.findById(userId);
    // console.log(user);
    if (user) {
        try {
            user[list].push(movie);
            user.save();
            res.status(201).json({ message: "added", user });
        }
        catch (error) {
            console.log("error while add/remove movie in fav/wishlist", error);
            res
                .status(500)
                .json({ message: "error while add/remove movie in fav/wishlist" });
        }
    }
});
exports.addMovie = addMovie;
const removeMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, list, movie } = yield req.body;
    const user = yield userModel_1.default.findById(userId);
    if (user) {
        try {
            const movieIndex = user[list].findIndex((m) => m.title === movie.title);
            user[list].splice(movieIndex, 1);
            user.save();
            res.status(202).json({ message: "removed", user });
        }
        catch (error) {
            console.log("error while add/remove movie in fav/wishlist", error);
            res
                .status(500)
                .json({ message: "error while add/remove movie in fav/wishlist" });
        }
    }
});
exports.removeMovie = removeMovie;
// User Lists----------------------------------------------------------------------------
const createUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, list: name } = (yield req.body);
    const user = yield userModel_1.default.findById(userId);
    if (user) {
        try {
            // user.userCollections = user.userCollections.map((c: collectionObj) => {
            //   if (c._id == _id) {
            //     return { ...c, name, description };
            //   } else {
            //     return { ...c };
            //   }
            // });
            const index = user.userCollections.findIndex((c) => c.name === name);
            // If the name is unique
            if (index === -1) {
                user.userCollections.push({ name, description: "", movies: [] });
                user.save();
                return res.status(201).json({ message: "created", user });
            }
            //else
            res.status(400).json({ message: "list name already exist" });
            //   console.log(user);
        }
        catch (error) {
            console.log("error while creating collection", error);
            res.status(500).json({ message: "error while creating collection" });
        }
    }
});
exports.createUserList = createUserList;
const deleteUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, listName } = (yield req.body);
    const user = yield userModel_1.default.findById(userId);
    if (user) {
        try {
            user.userCollections = user.userCollections.filter((c) => c.name != listName);
            user.save();
            res.status(201).json({ message: "collection deleted", user });
        }
        catch (error) {
            console.log("error while deleting collection", error);
            res.status(500).json({ message: "Error" });
        }
    }
});
exports.deleteUserList = deleteUserList;
const addMovieToUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.addMovieToUserList = addMovieToUserList;
