import { body, param, validationResult } from "express-validator";
import {Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { InvalidID } from "../errors/BaseErrors";

export const validationBodyRules = [
    param("id").custom(value => {
        if (!isValidObjectId(value)) {
            throw new InvalidID();
        }
        return true;
    }),
    body("username").if(body("username").exists()).notEmpty().isAlphanumeric().isLength({min: 4, max: 16}).withMessage("username not valid"),
    body("email").if(body("email").exists()).notEmpty().isEmail().isLength({min: 4, max: 100}).withMessage("email not valid"),
];

export const checkRules = (req: Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};