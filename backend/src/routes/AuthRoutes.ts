import { Router } from "express";
const routes = Router();
import AuthController from "../controllers/AuthController";
import { RegisterUserValidator } from "../middlewares/ValidationMiddlewares";
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

export default routes;