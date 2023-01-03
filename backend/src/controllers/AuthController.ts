import { Request, Response } from "express"

import AuthService from "../services/AuthService";

const authService = new AuthService()

export async function signUp (req: Request, res: Response) {
    const user:IUserRegister = req.body

    try {
        const result = await authService.create(user);
        res.status(201).json({msg: "User registered", token: result.acessToken});
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