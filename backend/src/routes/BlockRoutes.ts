import { Router } from "express";
const routes = Router();
import BlockController from "../controllers/BlockController";
import { IdValidator, UpdateBlockValidator } from "../middlewares/ValidationMiddlewares";

const updateBlockMiddleware = new UpdateBlockValidator();
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
    updateBlockMiddleware.validationRules,
    [updateBlockMiddleware.checkRules],
    blockController.updateBlock
);

routes.delete("/:id",
    idValidator.validationRules,
    [idValidator.checkRules],
    blockController.deleteBlock
);

export default routes;