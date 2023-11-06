import { Request,Response,NextFunction } from 'express'
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err:Error,req:Request,res:Response)=>
{
    if(err instanceof CustomError)
    {
        return res.status(err.statusCode).json({ errors: err.generateErrors() })
    }
    res.status(500).send({ errors: [ {message: ' something went wrong '}]})
}