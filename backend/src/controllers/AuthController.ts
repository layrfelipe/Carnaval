import { Request, Response } from "express"

import AuthService from "../services/AuthService";

const authService = new AuthService()

export async function signUp (req: Request, res: Response) {
    const user = req.body

    try {
        const result = await authService.create(user);
        res.status(201).json({msg: "User registered", user: result.safeNewUserData, token: result.token});
    }
    catch (err: any) {
        res.status(err.httpCode).json(err);
    }
}

export async function login (req: Request, res: Response) {
    const user:IUserLogin = req.body;
    
    try {
        const { userExists, token } = await authService.login(user);
        res.status(200).json({msg: "Logged in", _id: userExists._id, token });
    }
    catch (err: any) {
        res.status(err.httpCode).json(err);
    }    
}