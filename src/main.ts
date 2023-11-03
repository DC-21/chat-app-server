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
  
} from "./routes";
import cors from "cors";
import cookieSession from "cookie-session";
import { currentUser, requireAuth } from "../common";

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

app.use(requireAuth, newPostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, deletePostRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all("*", (req, res, next) => {
  const error = new Error("not found") as CustomError;
  error.status = 404;
  next();
});
declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

//middleware
app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "something went wrong" });
  }
);

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
    console.log("server is running on port 8k");
  });
};
start();
