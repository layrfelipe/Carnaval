import { body, param, ValidationChain, validationResult } from "express-validator";
import {Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { InvalidBlockID, InvalidID } from "../errors/BaseErrors";
import Validation from "../classes/Validation";
import { ConfirmationDoesNotMatchPassword, InvalidLocation } from "../errors/BaseErrors";

export class IdValidator extends Validation {
    public validationRules: ValidationChain[] = [
        param("id").custom(value => {
            if (!isValidObjectId(value)) throw new InvalidID();
            return true;
        })
    ];

    public checkRules = (req: Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}

export class RegisterUserValidator extends Validation {
    public validationRules: ValidationChain[] = [
        body("username").exists().notEmpty().isAlphanumeric().isLength( {min: 4, max: 16} ).toLowerCase().trim().withMessage("username not valid"),
        body("email").exists().notEmpty().isEmail().isLength({ min: 4, max: 80 }).trim().normalizeEmail().withMessage("email not valid"),
        body("password").exists().notEmpty().trim().isStrongPassword().withMessage("password not valid"),
        body("passwordConfirmation").custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new ConfirmationDoesNotMatchPassword();
            }
            return true;
        }),
        body("name").exists().notEmpty().isString().isLength({ min: 2, max:  15}).withMessage("name not valid"),
        body("phone").exists().notEmpty().isMobilePhone("pt-BR").withMessage("phone not valid"),
        body("birthday").exists().notEmpty().isString().isLength({ min: 10, max: 19}).withMessage("birthday not valid"),
        body("role").if(body("role").exists()).notEmpty().isString().trim().withMessage("role not valid"),
        body("loc").exists().notEmpty().custom((value, { req }) => {
            if (value.type != "Point" || !(value.coordinates instanceof Array)) {
                throw new InvalidLocation();
            }
            return true;
        }),
        body("favBlocks").if(body("favBlocks").exists()).isEmpty().withMessage("favBlocks must be empty array"),
        body("favBlocks").if(body("friends").exists()).isEmpty().withMessage("friends must be empty array"),
    ];

    public checkRules = (req: Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}

export class UpdateUserValidator extends Validation {
    public validationRules: ValidationChain[] = [
        param("id").custom(value => {
            if (!isValidObjectId(value)) {
                throw new InvalidBlockID();
            }
            return true;
        }),
        body("username").if(body("username").exists()).notEmpty().isAlphanumeric().isLength( {min: 4, max: 16} ).toLowerCase().trim().withMessage("username not valid"),
        body("email").if(body("email").exists()).notEmpty().isEmail().isLength( {min: 4, max: 80} ).trim().normalizeEmail().withMessage("email not valid"),
        body("password").if(body("password").exists()).notEmpty().trim().isStrongPassword().withMessage("password not valid"),
        body("passwordConfirmation").if(body("passwordConfirmation").exists()).custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new ConfirmationDoesNotMatchPassword();
            }
            return true;
        }),
        body("name").if(body("name").exists()).notEmpty().isString().isLength({ min: 2, max:  15}).withMessage("name not valid"),
        body("phone").exists().notEmpty().isMobilePhone("pt-BR").withMessage("phone not valid"),
        body("birthday").if(body("birthday").exists()).notEmpty().isString().isLength({ min: 10, max: 19}).withMessage("birthday not valid"),
        body("role").if(body("role").exists()).notEmpty().isString().trim().withMessage("role not valid"),
        body("loc").if(body("loc").exists()).notEmpty().custom((value, { req }) => {
            if (value.type != "Point" || !(value.coordinates instanceof Array)) {
                throw new InvalidLocation();
            }
            return true;
        }),
        body("favBlocks").if(body("favBlocks").exists()).notEmpty().custom((value, { req }) => {
            if(!isValidObjectId(value)) throw new InvalidBlockID();
            return true;
        }),
        body("friends").if(body("favBlocks").exists()).notEmpty().custom((value, { req }) => {
            value.forEach( (friend: string) => {
                if(!isValidObjectId(friend)) throw new InvalidBlockID();
            })
            return true;
        })
    ];

    public checkRules (req: Request, res: Response, next: NextFunction): Response | undefined {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}

export class RegisterBlockValidator extends Validation {
    public validationRules: ValidationChain[] = [
        body("name").exists().notEmpty().isString().isLength( {min: 2, max: 40} ).toLowerCase().trim().withMessage("block name not valid"),
        body("initialLoc").exists().notEmpty().custom((value, { req }) => {
            if (value.type != "Point" || !(value.coordinates instanceof Array)) {
                throw new InvalidLocation();
            }
            return true;
        }),
        body("finalLoc").if(body("finalLoc").exists()).notEmpty().custom((value, { req }) => {
            if (value.type != "Point" || !(value.coordinates instanceof Array)) {
                throw new InvalidLocation();
            }
            return true;
        }),
        body("concentrationAt").if(body("concentrationAt").exists()).notEmpty().isString().isLength({ min: 10, max: 19}).withMessage("concentrationAt not valid"),
        body("startsAt").exists().notEmpty().isString().isLength({ min: 10, max: 19 }).withMessage("startsAt not valid"),
        body("endsAt").if(body("endsAt").exists()).notEmpty().isString().isLength({ min: 10, max: 19 }).withMessage("endsAt not valid"),
        body("description").exists().notEmpty().isString().isLength({ max: 120 }).withMessage("description not valid"),
    ];

    public checkRules = (req: Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}

export class UpdateBlockValidator extends Validation {
    public validationRules: ValidationChain[] = [
        param("id").custom(value => {
            if (!isValidObjectId(value)) {
                throw new InvalidBlockID();
            }
            return true;
        }),
        body("name").if(body("name").exists()).notEmpty().isString().isLength( {min: 2, max: 40} ).toLowerCase().trim().withMessage("block name not valid"),
        body("initialLoc").if(body("initialLoc").exists()).notEmpty().custom((value, { req }) => {
            if (value.type != "Point" || !(value.coordinates instanceof Array)) {
                throw new InvalidLocation();
            }
            return true;
        }),
        body("finalLoc").if(body("finalLoc").exists()).notEmpty().custom((value, { req }) => {
            if (value.type != "Point" || !(value.coordinates instanceof Array)) {
                throw new InvalidLocation();
            }
            return true;
        }),
        body("concentrationAt").if(body("concentrationAt").exists()).notEmpty().isString().isLength({ min: 10, max: 19}).withMessage("concentrationAt not valid"),
        body("startsAt").if(body("startsAt").exists()).notEmpty().isString().isLength({ min: 10, max: 19 }).withMessage("startsAt not valid"),
        body("endsAt").if(body("endsAt").exists()).notEmpty().isString().isLength({ min: 10, max: 19 }).withMessage("endsAt not valid"),
        body("description").if(body("description").exists()).notEmpty().isString().isLength({ max: 120 }).withMessage("description not valid"),
    ];

    public checkRules = (req: Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
}