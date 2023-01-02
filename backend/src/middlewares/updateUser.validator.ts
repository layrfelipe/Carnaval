
// 3rd PART IMPORTS
import { body, param, validationResult } from "express-validator";
import {Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

// INPUT VALIDATION
export const validationBodyRules = [
    param("id").custom(value => {
        if (!isValidObjectId(value)) {
            throw new Error("Invalid id");
        }
        return true;
    }),

    body("username").exists().notEmpty().withMessage("username is required!"),
    body("username").isAlphanumeric().withMessage("username must be alphanumeric"),
    body("username").isLength({min: 4, max: 16}).withMessage("username must have length between 4 and 16 chars"),

    body("email").exists().notEmpty().withMessage("email is required!"),
    body("email").isEmail().withMessage("email must be valid"),
    body("email").isLength({min: 4, max: 100}).withMessage("email must have length between 4 and 100 chars")

];

// INVALID INPUT HANDLER
export const checkRules = (req: Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};