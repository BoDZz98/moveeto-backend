import { Router } from "express";
import {
  addMovie,
  addMovieToUserList,
  removeMovie,
  createUserList,
  deleteUserList,
} from "../controllers/lists";

const router = Router();

// Fav and wishlist
router.post("/movie", addMovie);
router.delete("/movie", removeMovie);

// user Lists
router.post("/userLists", createUserList);
router.delete("/userLists", deleteUserList);

router.post("/userLists/movie", addMovieToUserList);

export default router;
