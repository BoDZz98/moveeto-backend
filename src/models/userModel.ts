import mongoose from "mongoose";
var Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: String,
  title: String,
  release_date: String,
  backdrop_path: String,
  genres: [String],
  vote_count: Number,
});

const userCollectionsSchema = new Schema(
  {
    name: {
      type: String,
      // sparse: true,
      unique: [true, "Collection name already exists"],
    },
    description: String,
    movies: [movieSchema],
  },
  { timestamps: true }
);

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Please provide your name"] },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email is already used"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    userCollections: [userCollectionsSchema], // array of objects with collection
    favMovies: [movieSchema],
    wishlistMovies: [movieSchema],
  },
  { timestamps: true }
);
// module.exports

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;

export type userMovieObj = {
  id: string;
  title: string;
  release_date: string;
  backdrop_path: string;
  genres: Array<string>;
  vote_count: number;
};

export type collectionObj = {
  _id: string;
  name: string;
  description: string;
  movies: Array<userMovieObj>;
  createdAt: string;
};

export type userObj = {
  name: string;
  email: string;
  userCollections: Array<collectionObj>;
  favMovies: Array<userMovieObj>;
  wishlistMovies: Array<userMovieObj>;
  save: () => {}; // to prevent compiler error -> ( save() is not a property of userObj)
};
