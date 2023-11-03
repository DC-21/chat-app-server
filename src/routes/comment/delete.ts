import { Router,Request,Response,NextFunction } from 'express'
const router = Router();

import Comment from '../../models/comment';
import Post from "../../models/post";

router.delete('/api/comment/:commentId/delete/:postId',async(req:Request,res:Response,next:NextFunction)=>{
    const {commentId,postId} = req.params;
    if(!commentId || postId)
    {
        const error = new Error("post id is required") as CustomError;
        error.status=400;
        next(error);
    }
    try
    {
        await Comment.findOneAndDelete({_id:commentId})
    } catch(err)
    {
        next(new Error("comment delete failed"));
    }
    await Post.findOneAndUpdate({_id: postId},{$pull: {comment:commentId}})
    res.send(200).json({success: true})
})

export{ router as deleteCommentRouter}