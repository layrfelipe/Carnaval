import { Router } from "express";
const routes = Router();
import UserController from "../controllers/UserController";
import { IdValidator, UpdateUserValidator } from "../middlewares/ValidationMiddlewares";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const authMiddleware = new AuthMiddleware();
const updateUserValidator = new UpdateUserValidator();
const idValidator = new IdValidator();
const userController = new UserController();

routes.get("/",
    authMiddleware.verifyToken,
    userController.getAllUsers
);

routes.get("/:id",
    idValidator.validationRules,
    [idValidator.checkRules, authMiddleware.verifyToken],
    userController.getUser
);

routes.patch("/:id",
    updateUserValidator.validationRules,
    [updateUserValidator.checkRules, authMiddleware.verifyToken],
    userController.updateUser
);

routes.delete("/:id",
    idValidator.validationRules,
    [idValidator.checkRules, authMiddleware.verifyToken],
    userController.deleteUser
);

export default routes;