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
exports.getUserReviews = void 0;
const reviewsModel_1 = __importDefault(require("../models/reviewsModel"));
const getUserReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    try {
        const userReviews = yield reviewsModel_1.default.find({ email });
        //   console.log(userReviews);
        return res.status(201).json({ userReviews });
    }
    catch (error) {
        console.log('error in reviews controller, getUserReviews');
        return res.status(500).json({ message: "Error fetching user reviews" });
    }
});
exports.getUserReviews = getUserReviews;
