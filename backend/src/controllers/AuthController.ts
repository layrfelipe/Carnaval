// 3rd PART IMPORTS
import { Request, Response } from "express"

// MY IMPORTS
import AuthService from "../services/AuthService";

// INSTANTIATING SERVICE CLASS - AN ISOLATED LAYER FOR HANDLING COMPLEX BUSINESS LOGIC
const authService = new AuthService()

// ACTIONS
export async function createUser (req: Request, res: Response) {
    const user:IUserRegister = req.body

    try {
        await authService.create(user);
        res.status(201).json({msg: "User registered"});
    }
    catch (err: any) {
        res.status(err.httpCode).json(err)   
    }
}

export async function login (req: Request, res: Response) {
    const user:IUserLogin = req.body;
    
    try {
        const token = await authService.login(user);
        res.status(200).json({msg: "Logged in", token});
    }
    catch (err: any) {
        res.status(err.httpCode).json(err)   
    }    
}