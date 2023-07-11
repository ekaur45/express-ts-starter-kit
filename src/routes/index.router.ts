
import { NextFunction, Request, Response, Router } from "express";
import accountRouter from "./account/account.router";
const apiRouter = Router();
apiRouter.post('/get-status',(req:Request,res:Response,next:NextFunction)=>{
    const {firstName,lastName} = req.body;
    if(!(firstName&&lastName))
    res.BadRequest({});
    else
    res.Ok("Working....");
})
apiRouter.use('/account',accountRouter)
export default apiRouter;