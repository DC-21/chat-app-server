import { Router, Request, Response, NextFunction } from "express";
const router = Router();
import User from "../../models/user";
import {authenticationService} from '../../../common'
import jwt from "jsonwebtoken";

router.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return new Error("no user with that email");

    const isEqual = await authenticationService.pwdCompare(user.password,password);
    if(!isEqual) return next(new Error('wrong password'));

    const token = jwt.sign({ email,userId: user._id}, process.env.JWT_KEY!);
    
    req.session = { jwt: token }
    res.status(200).send(user);
  }
);

export { router as signinRouter };
