import { Router,Request,Response,NextFunction } from "express";
const router = Router();
import Comment from '../../models/comment';
import Post from '../../models/post';

router.post('/api/comment/new/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const {userName,content} = req.body;
    const {postId} = req.params;

    if(!content)
    {
        const error = new Error("content required") as CustomError;
        error.status = 400;
        return next(error);
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