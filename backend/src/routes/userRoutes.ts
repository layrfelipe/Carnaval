// 3rd PART IMPORTS
import { Router } from "express";

const routes = Router();

// MY IMPORTS
import { getUser, getAllUsers, updateUser, deleteUser } from "../controllers/UserController";
import { checkToken } from "../middlewares/checkToken";

import * as updateUserValidator from "../middlewares/updateUser.validator";
import * as idValidator from "../middlewares/id.validator";

// DEFINING ENDPOINTS ADDRESSES
routes.get("/", getAllUsers);
routes.get("/:id", idValidator.validationBodyRules, [idValidator.checkRules, checkToken], getUser);
routes.patch("/:id", updateUserValidator.validationBodyRules, updateUserValidator.checkRules, updateUser);
routes.delete("/:id", idValidator.validationBodyRules, idValidator.checkRules, deleteUser);

export default routes;