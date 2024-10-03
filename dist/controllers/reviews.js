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
exports.deleteReview = exports.updateReview = exports.getMovieReviews = exports.getUserReviews = exports.createReview = void 0;
const reviewsModel_1 = __importDefault(require("../models/reviewsModel"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, review, movie } = req.body;
    // console.log(user, review, movie);
    try {
        const newReview = yield reviewsModel_1.default.create(Object.assign(Object.assign(Object.assign({}, user), review), movie));
        if (newReview) {
            const email = user.email;
            const userReviews = yield reviewsModel_1.default.find({ email });
            return res.status(201).json({ message: "Review created", userReviews });
        }
    }
    catch (error) {
        console.log("error in reviews controller, createReview");
        return res.status(500).json({ message: "Error creating user reviews" });
    }
});
exports.createReview = createReview;
const getUserReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const userReviews = yield reviewsModel_1.default.find({ email });
        // console.log(userReviews);
        return res.status(201).json({ userReviews });
    }
    catch (error) {
        console.log("error in reviews controller, getUserReviews");
        return res.status(500).json({ message: "Error fetching user reviews" });
    }
});
exports.getUserReviews = getUserReviews;
const getMovieReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.movieId;
    try {
        const movieReviews = yield reviewsModel_1.default.find({ movieId });
        // console.log(movieReviews);
        return res.status(201).json({ movieReviews });
    }
    catch (error) {
        console.log("error in reviews controller, getMovieReviews");
        return res.status(500).json({ message: "Error fetching movie reviews" });
    }
});
exports.getMovieReviews = getMovieReviews;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId, newRating, newDesc } = (yield req.body);
    try {
        yield reviewsModel_1.default.findByIdAndUpdate(reviewId, {
            rating: newRating,
            description: newDesc,
        });
        //   console.log(movieReviews);
        return res.status(201).json({ message: "Review updated" });
    }
    catch (error) {
        console.log("error in reviews controller, updateReview");
        return res.status(500).json({ message: "Error updating review" });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId, email } = (yield req.body);
    console.log(reviewId, email);
    try {
        yield reviewsModel_1.default.findByIdAndDelete(reviewId);
        const userReviews = yield reviewsModel_1.default.find({ email });
        return res.status(201).json({ message: "Review deleted", userReviews });
    }
    catch (error) {
        console.log("error in reviews controller, updateReview");
        return res.status(500).json({ message: "Error updating review" });
    }
});
exports.deleteReview = deleteReview;
