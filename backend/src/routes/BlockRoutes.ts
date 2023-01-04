import { Router } from "express";

const routes = Router();

import { createBlock, getAllBlocks, getBlock, deleteBlock, updateBlock } from "../controllers/BlockController";
import { verifyToken } from "../middlewares/authentication";

import * as updateBlockValidator from "../middlewares/updateBlock.validator";
import * as idValidator from "../middlewares/id.validator";

routes.get("/", verifyToken, getAllBlocks);
routes.post("/", createBlock);
routes.get("/:id", idValidator.validationBodyRules, [idValidator.checkRules, verifyToken], getBlock);
routes.patch("/:id", updateBlockValidator.validationBodyRules, [updateBlockValidator.checkRules, verifyToken], updateBlock);
routes.delete("/:id", idValidator.validationBodyRules, [idValidator.checkRules, verifyToken], deleteBlock);

export default routes;