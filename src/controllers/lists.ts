import { Request, Response } from "express";
import User, { userMovieObj, userObj } from "../models/userModel";

type reqData = {
  userId: string;
  list: "favMovies" | "wishlistMovies";
  movie: userMovieObj;
};

// Adding movies to fav and wishlist --------------------------------------------------
export const addMovie = async (req: Request, res: Response) => {
  const { userId, list, movie }: reqData = await req.body;
  const user: userObj | null = await User.findById(userId);
  // console.log(user);

  if (user) {
    try {
      user[list].push(movie);
      user.save();
      res.status(201).json({ message: "added", user });
    } catch (error) {
      console.log("error while add/remove movie in fav/wishlist", error);
      res
        .status(500)
        .json({ message: "error while add/remove movie in fav/wishlist" });
    }
  }
};

export const removeMovie = async (req: Request, res: Response) => {
  const { userId, list, movie }: reqData = await req.body;
  const user: userObj | null = await User.findById(userId);

  if (user) {
    try {
      const movieIndex = user[list].findIndex(
        (m: userMovieObj) => m.title === movie.title
      );

      user[list].splice(movieIndex, 1);
      user.save();
      res.status(202).json({ message: "removed", user });
    } catch (error) {
      console.log("error while add/remove movie in fav/wishlist", error);
      res
        .status(500)
        .json({ message: "error while add/remove movie in fav/wishlist" });
    }
  }
};
// User Lists----------------------------------------------------------------------------
export const createUserList = async (req: Request, res: Response) => {
  const { userId, list: name } = (await req.body) as {
    userId: string;
    list: string;
  };
  const user: userObj | null = await User.findById(userId);
  if (user) {
    try {
      const index = user.userCollections.findIndex((c) => c.name === name);
      // If the name is unique
      if (index === -1) {
        user.userCollections.push({ name, description: "", movies: [] });
        user.save();
        return res.status(201).json({ message: "created", user });
      }

      res.status(400).json({ message: "list name already exist" });

      //   console.log(user);
    } catch (error) {
      console.log("error while creating collection", error);
      res.status(500).json({ message: "error while creating collection" });
    }
  }
};
export const deleteUserList = async (req: Request, res: Response) => {
  const { userId, listName } = (await req.body) as {
    userId: string;
    listName: string;
  };
  const user: userObj | null = await User.findById(userId);
  if (user) {
    try {
      user.userCollections = user.userCollections.filter(
        (c) => c.name != listName
      );
      user.save();
      res.status(201).json({ message: "collection deleted", user });
    } catch (error) {
      console.log("error while deleting collection", error);
      res.status(500).json({ message: "Error" });
    }
  }
};

export const addMovieToUserList = async (req: Request, res: Response) => {};
