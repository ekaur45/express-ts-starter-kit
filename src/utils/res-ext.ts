import { AccountResponseModel } from './../models/dto/response.model';
import { Response, response } from "express";
import { ResponseModel } from "../models/dto/response.model";
//import { LogData } from './logs/error.logs';

// augment the `express-serve-static-core` module
declare module "express-serve-static-core" {
  // first, declare that we are adding a method to `Response` (the interface)
  export interface Response {
    Ok<T>(Data: T, Message?: string): void;
    BadRequest<T>(Data: T, Message?: string): void;
    NotFound<T>(Data: T, Message?: string): void;
    UnAuthorized<T>(Data: T, Message?: string): void;
    InternalServerError(Data: any, Message?: string): void;
  }
  export interface Request {
    user?: AccountResponseModel;
  }
  export interface Response{
    data?:any;
  }
}

response.InternalServerError = function (this: Response, Data: any, Message: string = "Inernal Server Error") {
  var response = new ResponseModel();
  response.status = 500;
  response.message = Message;
  response.data = Data;
  //LogData(Data);
  this.status(200).send(response);
}
response.NotFound = function <T>(this: Response, Data: T, Message: string = "Not found") {
  var response = new ResponseModel();
  response.status = 404;
  response.message = Message;
  response.data = Data;
  this.status(200).send(response);
}
response.UnAuthorized = function <T>(this: Response, Data: T, Message: string = "Un Authorized") {
  var response = new ResponseModel();
  response.status = 401;
  response.message = Message;
  response.data = Data;
  this.status(200).send(response);
}
response.BadRequest = function <T>(this: Response, Data: T, Message: string = "Bad Request") {
  var response = new ResponseModel();
  response.status = 400;
  response.message = Message;
  response.data = Data;
  this.status(200).send(response);
}
response.Ok = function <T>(this: Response, Data: T, Message: string = "Success") {
  var response = new ResponseModel();
  response.status = 200;
  response.message = Message;
  response.data = Data;
  this.status(200).send(response);
}