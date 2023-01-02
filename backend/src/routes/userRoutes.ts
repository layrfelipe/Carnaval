// 3rd PART IMPORTS
import { Router } from "express";

const routes = Router();

// MY IMPORTS
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from "../controllers/UserController";
import * as registerValidator from "../middlewares/register.validator";
import * as getUserValidator from "../middlewares/getUser.validator";
import * as updateUserValidator from "../middlewares/updateUser.validator";
import * as deleteUserValidator from "../middlewares/deleteUser.validator";

// DEFINING ENDPOINTS ADDRESSES
routes.get("/", getAllUsers);
routes.post("/", registerValidator.validationBodyRules, registerValidator.checkRules, createUser);
routes.get("/:id", getUserValidator.validationBodyRules, getUserValidator.checkRules, getUser);
routes.patch("/:id", updateUserValidator.validationBodyRules, updateUserValidator.checkRules, updateUser);
routes.delete("/:id", deleteUserValidator.validationBodyRules, deleteUserValidator.checkRules, deleteUser);

export default routes;