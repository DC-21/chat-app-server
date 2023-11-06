import { Router,Request,Response,NextFunction } from "express";
const router = Router();
import Post from '../../models/post';
import { BadRequestError } from "../../../common";

router.post('/api/post/new',async(req:Request,res:Response,next:NextFunction)=>{
    const {title,content} = req.body;
    if(!title||!content)
    {
        const error = next(new BadRequestError("title and content is required"));
    }
    const newPost = new Post({
        title,
        content
    });
    await newPost.save();
    res.status(201).send(newPost);
});

export{ router as newPostRouter }