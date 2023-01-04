import { Router } from "express";

const routes = Router();

import { getUser, getAllUsers, updateUser, deleteUser } from "../controllers/UserController";
import { verifyToken } from "../middlewares/authentication";

import * as updateUserValidator from "../middlewares/updateUser.validator";
import * as idValidator from "../middlewares/id.validator";

routes.get("/", verifyToken, getAllUsers);
routes.get("/:id", idValidator.validationBodyRules, [idValidator.checkRules, verifyToken], getUser);
routes.patch("/:id", updateUserValidator.validationBodyRules, [updateUserValidator.checkRules, verifyToken], updateUser);
routes.delete("/:id", idValidator.validationBodyRules, [idValidator.checkRules, verifyToken], deleteUser);

export default routes;