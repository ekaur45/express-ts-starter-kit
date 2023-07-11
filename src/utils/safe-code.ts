import { NextFunction, Request, Response } from "express";
/**
 * @description generic error handling
 * @param func should be an async middleware
 * @returns 
 */
const safeCode = (func:(req:Request,res:Response,next:NextFunction)=>Promise<any>)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
          await  func(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}
export default safeCode;