import { Router } from "express";
const routes = Router();
import AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { RegisterUserValidator } from "../middlewares/ValidationMiddlewares";
const authMiddleware = new AuthMiddleware();
const registerUserValidator = new RegisterUserValidator();
const authController = new AuthController()

routes.post("/signup",
    registerUserValidator.validationRules,
    registerUserValidator.checkRules,
    authController.signUp
);

routes.post("/login",
    authController.login
);

routes.post("/token",
    authMiddleware.verifyRefreshToken,
    authController.token
);

routes.delete("/logout",
    authMiddleware.verifyToken,
    authController.logout
);

export default routes;