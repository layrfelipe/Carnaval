import { Router } from "express";
import UserController from "../controllers/UserController";
import { IdValidator, UpdateUserValidator } from "../middlewares/ValidationMiddlewares";

const routes = Router();

const updateUserValidator = new UpdateUserValidator();
const idValidator = new IdValidator();
const userController = new UserController();

routes.get("/",
    userController.getAllUsers
);

routes.get("/:id",
    idValidator.validationRules,
    [idValidator.checkRules],
    userController.getUser
);

routes.patch("/:id",
    updateUserValidator.validationRules,
    [updateUserValidator.checkRules],
    userController.updateUser
);

routes.delete("/:id",
    idValidator.validationRules,
    [idValidator.checkRules],
    userController.deleteUser
);

export default routes;