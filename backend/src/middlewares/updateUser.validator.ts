// 3rd PART IMPORTS
import { body, param, validationResult } from "express-validator";
import {Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import * as errorsHandler from "../errors/BaseErrors";

// INPUT VALIDATION
export const validationBodyRules = [
    param("id").custom(value => {
        if (!isValidObjectId(value)) {
            throw new errorsHandler.InvalidID();
        }
        return true;
    }),
    body("username").exists().notEmpty().isAlphanumeric().isLength({min: 4, max: 16}).withMessage("username not valid"),
    body("email").exists().notEmpty().isEmail().isLength({min: 4, max: 100}).withMessage("email not valid")
];

// INVALID INPUT HANDLER
export const checkRules = (req: Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};