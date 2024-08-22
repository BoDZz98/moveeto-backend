import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";

const app = express();
dotenv.config(); // to be able to use data in .env

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form> , to extract data from forms in views, using MVC architecture
app.use(bodyParser.json()); // application/json, usind in rest API's to extract data from fetch functions on client side

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // To allow accessing this API from all domains
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE" // Allowed methods
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed coniguration options in fetch functions
  next(); // continue to the next middlware/function
});

app.use("/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://boudy1q1q:boudy1q1q@cluster0.m2fmta0.mongodb.net/moveeto?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is running on port", process.env.PORT);
    });
  })
  .catch((err) => console.log("error in server.js", err));
