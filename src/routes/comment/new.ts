import { Router,Request,Response,NextFunction } from "express";
const router = Router();
import Comment from '../../models/comment';
import Post from '../../models/post';
import { BadRequestError } from "../../../common";

router.post('/api/comment/new/:postId',async(req:Request,res:Response,next:NextFunction)=>{
    const {userName,content} = req.body;
    const {postId} = req.params;

    if(!content)
    {
        const error = next(new BadRequestError("content required"));
    }
    const newComment = new Comment({
        userName: userName ? userName : 'anonymous',
        content
    });
    await newComment.save();
    const updatedPost= await Post.findOneAndUpdate(
        { _id: postId },
        {$push: { comments: newComment }},
        {new: true}
        );
    res.status(201).send(updatedPost);
});

export{ router as newCommentRouter }