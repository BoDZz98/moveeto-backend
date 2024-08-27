"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
const movieSchema = new Schema({
    id: String,
    title: String,
    release_date: String,
    backdrop_path: String,
    genres: [String],
    vote_count: Number,
    rating: Number,
    runtime: String,
    poster: String,
});
const userCollectionsSchema = new Schema({
    name: {
        type: String,
        // sparse: true,
        // unique: [true, "Collection name already exists"],
    },
    description: String,
    movies: [movieSchema],
}, { timestamps: true });
const userSchemaa = new Schema({
    name: { type: String, required: [true, "Please provide your name"] },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: [true, "Email is already used"],
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
    },
    // userCollections: { type: [userCollectionsSchema], required: false }, // array of objects with collection
    userCollections: [userCollectionsSchema], // array of objects with collection
    favMovies: [movieSchema],
    wishlistMovies: [movieSchema],
}, { timestamps: true });
// module.exports
const User = mongoose_1.default.model("User", userSchemaa);
exports.default = User;
