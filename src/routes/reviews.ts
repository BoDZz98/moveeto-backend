import { Router } from "express";
import { getUserReviews } from "../controllers/reviews";

const router = Router();

router.get("/getUserReviews/:email", getUserReviews);

export default router;
