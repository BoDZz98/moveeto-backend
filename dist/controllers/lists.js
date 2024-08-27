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
exports.addRemoveMovie = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
// Adding movies to fav and wishlist --------------------------------------------------
const addRemoveMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, list, movie } = yield req.body;
    const user = yield userModel_1.default.findById(userId);
    console.log(user);
    if ((list === "favMovies" || list === "wishlistMovies") && user) {
        try {
            const movieIndex = user[list].findIndex((m) => m.title === movie.title);
            if (movieIndex !== -1) {
                // The movie is in the user's favorite movies, so we should remove it
                user[list].splice(movieIndex, 1);
                user.save();
                res.status(202).json({ message: "removed", user });
            }
            else {
                user[list].push(movie);
                user.save();
                res.status(201).json({ message: "added", user });
            }
        }
        catch (error) {
            // typeof movie.genres === "object" &&}
            console.log("error while add/remove movie in fav/wishlist", error);
            res
                .status(500)
                .json({ message: "error while add/remove movie in fav/wishlist" });
        }
    }
});
exports.addRemoveMovie = addRemoveMovie;
