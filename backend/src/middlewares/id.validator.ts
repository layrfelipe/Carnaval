import { param, validationResult } from "express-validator";
import {Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

export const validationBodyRules = [
    param("id").custom(value => {
        if (!isValidObjectId(value)) {
            throw new Error("Invalid ID");
        }
        return true;
    })
];

export const checkRules = (req: Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};