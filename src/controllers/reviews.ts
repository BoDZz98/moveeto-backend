import { Request, Response } from "express";
import Reviews from "../models/reviewsModel";

export const createReview = async (req: Request, res: Response) => {
  const { user, review, movie } = req.body as createReviewBody;
  // console.log(user, review, movie);

  try {
    const newReview = await Reviews.create({ ...user, ...review, ...movie });
    if (newReview) {
      const email = user.email;
      const userReviews = await Reviews.find({ email });
      return res.status(201).json({ message: "Review created", userReviews });
    }
  } catch (error) {
    console.log("error in reviews controller, createReview");
    return res.status(500).json({ message: "Error creating user reviews" });
  }
};

export const getUserReviews = async (req: Request, res: Response) => {
  const email = req.params.email as string;
  try {
    const userReviews = await Reviews.find({ email });
    // console.log(userReviews);
    return res.status(201).json({ userReviews });
  } catch (error) {
    console.log("error in reviews controller, getUserReviews");
    return res.status(500).json({ message: "Error fetching user reviews" });
  }
};

export const getMovieReviews = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;

  try {
    const movieReviews = await Reviews.find({ movieId });
    // console.log(movieReviews);
    return res.status(201).json({ movieReviews });
  } catch (error) {
    console.log("error in reviews controller, getMovieReviews");
    return res.status(500).json({ message: "Error fetching movie reviews" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { reviewId, newRating, newDesc } = (await req.body) as {
    reviewId: string;
    newRating: string;
    newDesc: string;
  };
  try {
    await Reviews.findByIdAndUpdate(reviewId, {
      rating: newRating,
      description: newDesc,
    });
    //   console.log(movieReviews);
    return res.status(201).json({ message: "Review updated" });
  } catch (error) {
    console.log("error in reviews controller, updateReview");
    return res.status(500).json({ message: "Error updating review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId, email } = (await req.body) as {
    reviewId: string;
    email: string;
  };
  // console.log(reviewId, email);

  try {
    await Reviews.findByIdAndDelete(reviewId);
    const userReviews = await Reviews.find({ email });

    return res.status(201).json({ message: "Review deleted", userReviews });
  } catch (error) {
    console.log("error in reviews controller, updateReview");
    return res.status(500).json({ message: "Error updating review" });
  }
};

type createReviewBody = {
  user: { email: string; username: string };
  review: { rating: string; description: string };
  movie: { movieId: string; movieName: string; moviePoster: string };
};
