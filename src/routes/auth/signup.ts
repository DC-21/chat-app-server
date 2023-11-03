import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import User from "../../models/user";

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return new Error("user with that email already exists");

    const newUser = new User({
      email,
      password,
    });
    await newUser.save();
    res.status(200).json(newUser);
  }
);

export { router as signupRouter };
