import {Request, Response, NextFunction } from "express";
import { ValidationChain } from "express-validator";

export default abstract class Validation {
    abstract validationRules: ValidationChain[];
    abstract checkRules(req: Request, res:Response, next:NextFunction): Response | undefined;
}