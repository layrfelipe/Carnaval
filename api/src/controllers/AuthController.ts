import { Request, Response } from "express"
import AuthService from "../services/AuthService";
const authService = new AuthService();

export default class AuthController {
    constructor(){}

    public async signUp (req: Request, res: Response) {
        const user = req.body

        try {
            const result = await authService.create(user);
            res.status(201).json({msg: "User registered", user: result.safeNewUserData });
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }

    public async login (req: Request, res: Response) {
        const user:IUserLogin = req.body;
        
        try {
            const { userExists } = await authService.login(user);
            res.status(200).json({ msg: "Logged in", _id: userExists._id });
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }    
    }
}