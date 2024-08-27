import { Router } from "express";
import { addMovie, removeMovie } from "../controllers/lists";

const router = Router();

router.post("/movie", addMovie);
router.delete("/movie", removeMovie);

export default router;
