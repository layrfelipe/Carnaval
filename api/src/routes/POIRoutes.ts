import { Router } from "express";
const routes = Router();
import POIController from "../controllers/POIController";
import { IdValidator, RegisterPOIValidator, UpdatePOIValidator } from "../middlewares/ValidationMiddlewares";

const idValidator = new IdValidator()
const registerPOIMiddleware = new RegisterPOIValidator();
const updatePOIMiddleware = new UpdatePOIValidator();
const poiController = new POIController()

routes.get("/",
    poiController.getAllPOIs
);

routes.post("/",
    poiController.createPOI,
    registerPOIMiddleware.validationRules,
    [registerPOIMiddleware.checkRules],
);

routes.get("/:id",
    poiController.getPOI,
    idValidator.validationRules,
    [idValidator.checkRules],
);

routes.patch("/:id",
    poiController.updatePOI,
    updatePOIMiddleware.validationRules,
    [updatePOIMiddleware.checkRules],
);

routes.delete("/:id",
    poiController.deletePOI,
    idValidator.validationRules,
    [idValidator.checkRules],
);

export default routes;