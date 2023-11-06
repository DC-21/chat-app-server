import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import {
  newPostRouter,
  updatePostRouter,
  deletePostRouter,
  showPostRouter,

  newCommentRouter,
  deleteCommentRouter,
  signupRouter,
  signinRouter,
  currentUserRouter,
  
} from "./routes";
import cors from "cors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, requireAuth,NotFoundError } from "../common";
import { signoutRouter } from "./routes/auth/signout";

const app = express();
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
app.set("trust proxy", true);
app.use(
  urlencoded({
    extended: false,
  })
);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser);

//routes
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.use(requireAuth, newPostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, deletePostRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all("*", (req, res, next) => {
  next(new NotFoundError('not found'));
});

//middleware
app.use(errorHandler);

//start server
const start = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");

  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MongoDB");
  } catch (err) {
    throw new Error("database error!");
  }
  app.listen(process.env.PORT, () => {
    console.log("server is running on port 9k");
  });
};
start();
