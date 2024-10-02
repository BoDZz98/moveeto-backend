import { Request, Response } from "express";
import User, {
  collectionObj,
  userMovieObj,
  userObj,
} from "../models/userModel";

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

      return res.status(400).json({ message: "list name already exist" });

      //   console.log(user);
    } catch (error) {
      console.log("error while creating collection", error);
      return res
        .status(500)
        .json({ message: "error while creating collection" });
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
export const updateUserList = async (req: Request, res: Response) => {
  const { userId, oldListName, newListName } = (await req.body) as {
    userId: string;
    oldListName: string;
    newListName: string;
  };
  try {
    const user: userObj | null = await User.findById(userId);

    if (user) {
      
      const collectionFound = user?.userCollections.find(
        (c) => c.name === newListName
      );
      if (collectionFound) {
        return res.status(400).json({ message: "list name already exist" });
      }

      const collection = user.userCollections.find(
        (c) => c.name === oldListName
      );
      collection!.name = newListName;
      user.save();
      return res.status(201).json({ message: "collection updated", user });
    }
  } catch (error) {
    console.log("error while updating collection" + error);
    return res.status(500).json({ message: "error while updating collection" });
  }
};

export const manageMovieInUserList = async (req: Request, res: Response) => {
  const { userId, collectionId, movie } = (await req.body) as {
    userId: string;
    collectionId: string;
    movie: userMovieObj;
  };
  // console.log(userId, collectionId, movie);

  const user: userObj | null = await User.findById(userId);
  if (user) {
    const collection: collectionObj | undefined = user.userCollections.find(
      (c) => c._id == collectionId
    );

    const movieIndex = collection!.movies.findIndex((m) => m.id == movie.id);

    try {
      // If the movie is not found, we should add it
      if (movieIndex === -1) {
        collection?.movies.push(movie);
        user.save();
        return res.status(201).json({ message: "movie added", user });
      }
      // The movie is found, so we should remove it
      else {
        collection?.movies.splice(movieIndex, 1);
        user.save();
        return res.status(201).json({ message: "movie removed", user });
      }
    } catch (error) {
      console.log("error while add/remove movie in collection", error);
      res
        .status(500)
        .json({ message: "error while add/remove movie in collection" });
    }
  }
};
