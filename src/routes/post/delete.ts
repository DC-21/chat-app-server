import { Router,Request,Response,NextFunction } from 'express'
const router = Router();

import Post from '../../models/post';

router.delete('/api/post/delete/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params;
    if(!id)
    {
        const error = new Error("post id is required") as CustomError;
        error.status=400;
        next(error);
    }
    try
    {
        await Post.findOneAndDelete({_id:id})
    } catch(err)
    {
        next(new Error("post delete failed"));
    }
    res.send(200).json({success: true})
})

export{ router as deletePostRouter}