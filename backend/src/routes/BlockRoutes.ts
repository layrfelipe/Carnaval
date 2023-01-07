import { Router } from "express";
const routes = Router();
import BlockController from "../controllers/BlockController";
import { IdValidator, UpdateUserValidator } from "../middlewares/ValidationMiddlewares";

const updateUserMiddleware = new UpdateUserValidator()
const idValidator = new IdValidator()
const blockController = new BlockController()

routes.get("/",
    blockController.getAllBlocks
);

routes.post("/",
    blockController.createBlock
);

routes.get("/:id",
    idValidator.validationRules,
    [idValidator.checkRules],
    blockController.getBlock
);

routes.patch("/:id",
    updateUserMiddleware.validationRules,
    [updateUserMiddleware.checkRules],
    blockController.updateBlock
);

routes.delete("/:id",
    idValidator.validationRules,
    [idValidator.checkRules],
    blockController.deleteBlock
);

export default routes;