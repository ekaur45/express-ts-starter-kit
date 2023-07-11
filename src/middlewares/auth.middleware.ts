import { NextFunction, Request, Response } from "express";
import { UserTypes } from "../models/dto/user-types.model";
import { AccountResponseModel } from "../models/dto/response.model";
import { verify } from "../utils/security/jwt.util";
export const checkAuth = function (type: UserTypes = UserTypes.User) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            try {
                var token = req.headers.authorization;
                if (token) {
                    if (token.toLowerCase().indexOf("bearer")>-1) {
                        token = token.split(' ')[1];
                    }

                        const payload = verify(token) as AccountResponseModel;
                        if (payload.type == type) {
                            req.user = payload;
                            return next();
                        }
                        if (type == UserTypes.Any) {
                            req.user = payload;
                            return next();
                        }
                    
                }
            } catch (error) {
                return res.UnAuthorized(error);
            }

        }
        return res.UnAuthorized(null);
    }
}