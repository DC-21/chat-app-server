import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import User from "../../models/user";
import { authenticationService,BadRequestError } from "../../../common";
import jwt from "jsonwebtoken";

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new BadRequestError("no user with that email"));

    const isEqual = await authenticationService.pwdCompare(
      user.password,
      password
    );
    if (!isEqual) return next(new BadRequestError("wrong password"));

    const token = jwt.sign({ email, userId: user._id }, process.env.JWT_KEY!, { expiresIn: '10h' });

    req.session = { jwt: token };
    res.status(200).send(user);
  }
);

export { router as signinRouter };
