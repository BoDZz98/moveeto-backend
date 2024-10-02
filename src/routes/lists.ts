import { Router } from "express";
import {
  addMovie,
  manageMovieInUserList,
  removeMovie,
  createUserList,
  deleteUserList,
  updateUserList,
} from "../controllers/lists";

const router = Router();

// Fav and wishlist
router.post("/movie", addMovie);
router.delete("/movie", removeMovie);

// user Lists
router.post("/userLists", createUserList);
router.delete("/userLists", deleteUserList);
router.patch("/userLists/", updateUserList);

router.post("/userLists/manageMovie", manageMovieInUserList); // Adding/removing movies

export default router;
