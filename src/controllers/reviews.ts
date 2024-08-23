import { Request, Response } from "express";
import Reviews from "../models/reviewsModel";

export const getUserReviews = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const userReviews = await Reviews.find({ email });
    //   console.log(userReviews);
    return res.status(201).json({ userReviews });
  } catch (error) {
    console.log('error in reviews controller, getUserReviews');
    
    return res.status(500).json({ message: "Error fetching user reviews" });
  }
};
