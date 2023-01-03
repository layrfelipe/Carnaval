// 3rd PART IMPORTS
import { Router } from "express";

const routes = Router();

// MY IMPORTS
import { createUser, login } from "../controllers/AuthController";

import * as registerUserValidator from "../middlewares/registerUser.validator";
import { checkToken } from "../middlewares/checkToken";

// DEFINING ENDPOINTS ADDRESSES
routes.post("/register", registerUserValidator.validationBodyRules, registerUserValidator.checkRules, createUser);
routes.post("/login", login)

export default routes;