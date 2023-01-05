import { Router } from "express";
const routes = Router();
import BlockController from "../controllers/BlockController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { IdValidator, UpdateUserValidator } from "../middlewares/ValidationMiddlewares";

const authMiddleware = new AuthMiddleware()
const updateUserMiddleware = new UpdateUserValidator()
const idValidator = new IdValidator()
const blockController = new BlockController()

routes.get("/",
    authMiddleware.verifyToken,
    blockController.getAllBlocks
);

routes.post("/",
    blockController.createBlock
);

routes.get("/:id",
    idValidator.validationRules,
    [idValidator.checkRules, authMiddleware.verifyToken],
    blockController.getBlock
);

routes.patch("/:id",
    updateUserMiddleware.validationRules,
    [updateUserMiddleware.checkRules, authMiddleware.verifyToken],
    blockController.updateBlock
);

routes.delete("/:id",
    idValidator.validationRules,
    [idValidator.checkRules, authMiddleware.verifyToken],
    blockController.deleteBlock
);

export default routes;