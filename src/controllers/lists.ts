import { Request, Response } from "express";
import User, { userMovieObj, userObj } from "../models/userModel";

type reqData = {
  userId: string;
  list: string;
  movie: userMovieObj;
};

// Adding movies to fav and wishlist --------------------------------------------------
export const addMovie = async (req: Request, res: Response) => {
  const { userId, list, movie }: reqData = await req.body;
  const user: userObj | null = await User.findById(userId);
console.log( user );


  if ((list === "favMovies" || list === "wishlistMovies") && user) {
    try {
      const movieIndex = user[list].findIndex(
        (m: userMovieObj) => m.title === movie.title
      );

      if (movieIndex !== -1) {
        // The movie is in the user's favorite movies, so we should remove it
        user[list].splice(movieIndex, 1);
        user.save();
        res.status(202).json({message: "removed", user });
      } else {
        user[list].push(movie);
        user.save();
        res.status(201).json({ message: "added", user });
      }
    } catch (error) {
      // typeof movie.genres === "object" &&}
      console.log("error while add/remove movie in fav/wishlist", error);
      res
        .status(500)
        .json({ message: "error while add/remove movie in fav/wishlist" });
    }
  }
};

export const removeMovie = async (req: Request, res: Response) => {
}