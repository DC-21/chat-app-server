import { Router,Request,Response,NextFunction } from 'express'
const router = Router();

import Post from '../../models/post';
import { BadRequestError } from '../../../common';

router.delete('/api/post/delete/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params;
    if(!id)
    {
        const error = next(new BadRequestError("post id is required"));
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