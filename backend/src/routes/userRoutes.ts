import { Router } from "express";

const routes = Router();

import { getUser, getAllUsers, updateUser, deleteUser } from "../controllers/UserController";
import { checkToken } from "../middlewares/checkToken";

import * as updateUserValidator from "../middlewares/updateUser.validator";
import * as idValidator from "../middlewares/id.validator";

routes.get("/", checkToken, getAllUsers);
routes.get("/:id", idValidator.validationBodyRules, [idValidator.checkRules, checkToken], getUser);
routes.patch("/:id", updateUserValidator.validationBodyRules, [updateUserValidator.checkRules, checkToken], updateUser);
routes.delete("/:id", idValidator.validationBodyRules, [idValidator.checkRules, checkToken], deleteUser);

export default routes;