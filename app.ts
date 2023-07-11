import dotEnv from 'dotenv';
dotEnv.config();
import './src/utils/res-ext'
import express, { Response, Request, NextFunction } from "express";
import apiRouter from "./src/routes/index.router";
import http from "http";
const app = express();
app.use(express.json());
// app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
//     res.InternalServerError(err);
// });

app.use("/api", apiRouter);
process.on('unhandledRejection', (reason: Error | any) => {
    console.log(`Unhandled Rejection: ${reason.message || reason}`);

    throw new Error(reason.message || reason);
});
process.on('uncaughtException', (error: Error) => {
    console.log(`Uncaught Exception: ${error.message}`);
    throw error;
    //errorHandler.handleError(error);
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.InternalServerError(err);
});
const server = http.createServer(app);
export default server;