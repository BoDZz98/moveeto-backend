import mongoose, { Date } from "mongoose";
var Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    username: String,
    email: String,
    movieId: String,
    movieName: String,
    moviePoster: String,
    rating: String,
    description: String,
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;

export type reviewObj = {
  _id: string;
  username: String;
  movieName: String;
  rating: number;
  description: String;
  createdAt: String;
};
