import { param, validationResult } from "express-validator";
import {Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { InvalidID } from "../errors/BaseErrors";

export const validationBodyRules = [
    param("id").custom(value => {
        if (!isValidObjectId(value)) {
            throw new InvalidID();
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