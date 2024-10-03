"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
const reviewSchema = new Schema({
    username: String,
    email: String,
    movieId: String,
    movieName: String,
    moviePoster: String,
    rating: String,
    description: String,
}, { timestamps: true });
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
