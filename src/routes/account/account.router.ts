
import { Router } from "express";
import AccountController from "../../controllers/account/account.controller"; 
const accountController = new AccountController();
import safeCode from "../../utils/safe-code";
import { checkAuth } from "../../middlewares/auth.middleware";
import { UserTypes } from "../../models/dto/user-types.model";
const accountRouter = Router();
accountRouter.post('/login',safeCode(accountController.login));
accountRouter.get('/notfound',safeCode(accountController.notFoundUser));
accountRouter.post('/protected',checkAuth(UserTypes.Admin), safeCode(accountController.authenticated));
accountRouter.post('/protectedany',checkAuth(UserTypes.Any), safeCode(accountController.authenticated));
accountRouter.post('/protecteduser',checkAuth(UserTypes.User), safeCode(accountController.authenticated));
export default accountRouter;