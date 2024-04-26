import {Request,Response, NextFunction,ErrorRequestHandler } from "express";
import { AccountResponseModel } from "../../models/dto/response.model";
import { UserTypes } from "../../models/dto/user-types.model";
import { getToken } from "../../utils/security/jwt.util";
import AccountService from "../../services/account/account.service";

class AccountController{
    accountService:AccountService;
    constructor() {
        this.accountService = new AccountService();
    }
    login = async (req:Request,res:Response,next:NextFunction) => {
        var user = new AccountResponseModel();
        user.firstName = "Waqas";
        user.lastName = "Ahmad";
        user.id = 1;
        user.type = UserTypes.Admin;
        user.token = getToken({...user});
        res.Ok(user);
        //res.InternalServerError("");
        //throw new Error("asdfhjdkashjfads");
        //await this.accountService.getUser();
    }
    authenticated = async (req:Request,res:Response,next:NextFunction) => {
        await this.accountService.getUser();
    }
}
export default AccountController