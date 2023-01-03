import { Router } from "express";

const routes = Router();

import { login, signUp } from "../controllers/AuthController";

import * as signUpValidator from "../middlewares/signUp.validator";

routes.post("/signup", signUpValidator.validationBodyRules, signUpValidator.checkRules, signUp);
routes.post("/login", login)

export default routes;