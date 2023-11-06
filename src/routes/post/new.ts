import { Router,Request,Response,NextFunction } from "express";
const router = Router();
import Post from '../../models/post';
import { BadRequestError } from "../../../common";
import User from "../../models/user";

router.post('/api/post/new',async(req:Request,res:Response,next:NextFunction)=>{
    const {title,content} = req.body;
    if(!title||!content)
    {
        const error = next(new BadRequestError("title and content is required"));
    }
    const newPost = Post.build({
        title,
        content
    });
    await newPost.save();

    await User.findOneAndUpdate({ _id: req.currentUser!.userId },
        {$push: { posts: newPost._id }})
    res.status(201).send(newPost);
});

export{ router as newPostRouter }