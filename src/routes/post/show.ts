import { Request, Router, Response, NextFunction } from "express";
const router = Router();

import Post from '../../models/post';

router.get(
  '/api/post/show/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        const allPosts = await Post.find();
        return res.status(200).send(allPosts);
    }
    const post = await Post.findOne({ _id:id }).populate("comments");
    res.status(200).send(post);
  }
);

export { router as showPostRouter };
