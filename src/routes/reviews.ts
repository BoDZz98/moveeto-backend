import { Router } from "express";
import {
  createReview,
  deleteReview,
  getMovieReviews,
  getUserReviews,
  updateReview,
} from "../controllers/reviews";

const router = Router();

router.get("/getUserReviews/:email", getUserReviews);
router.get("/getMovieReviews/:movieId", getMovieReviews);

router.post("/createReview", createReview);
router.patch("/updateReview", updateReview);
router.delete("/deleteReview", deleteReview);

export default router;
