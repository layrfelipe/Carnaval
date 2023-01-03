
import { body, oneOf, validationResult } from "express-validator";
import {Request, Response, NextFunction } from "express";
import { ConfirmationDoesNotMatchPassword } from "../errors/BaseErrors";

export const validationBodyRules = [
    body("username").exists().notEmpty().isAlphanumeric().isLength( {min: 4, max: 16} ).withMessage("username not valid"),
    body("email").exists().notEmpty().isEmail().isLength( {min: 4, max: 100} ).withMessage("email not valid"),
    body("password").exists().notEmpty().isAlphanumeric().isLength({ min: 8}).withMessage("password not valid"),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new ConfirmationDoesNotMatchPassword();
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