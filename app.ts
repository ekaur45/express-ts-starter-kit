import dotEnv from 'dotenv';
dotEnv.config();
import './src/utils/res-ext'
import express, { Response, Request, NextFunction } from "express";
import apiRouter from "./src/routes/index.router";
import http from "http";
const app = express();
app.use(express.json());

app.use("/api", apiRouter);

/* istanbul ignore next */ 
process.on('unhandledRejection', (reason: Error | any) => {
    throw new Error(reason.message || reason);
});
/* istanbul ignore next */ 
process.on('uncaughtException', (error: Error) => {
    throw error;
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.InternalServerError(err);
});
const server = http.createServer(app);
export default server;