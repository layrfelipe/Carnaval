import { Request, Response } from "express"
import AuthService from "../services/AuthService";
const authService = new AuthService();

export default class AuthController {
    constructor(){}

    public async signUp (req: Request, res: Response) {
        const user = req.body

        try {
            const result = await authService.create(user);
            res.status(201).json({msg: "User registered", user: result.safeNewUserData, token: result.token});
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }

    public async login (req: Request, res: Response) {
        const user:IUserLogin = req.body;
        
        try {
            const { userExists, acessToken, refreshToken } = await authService.login(user);
            res.status(200).json({msg: "Logged in", _id: userExists._id, acessToken, refreshToken });
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }    
    }

    public async token (req: Request, res: Response) {
        const tokenData = req.body;

        try {
            const acessToken = await authService.token(tokenData);
            res.status(200).json({ acessToken });
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }    
    }

    public async logout (req: Request, res: Response) {
        const { refreshToken } = req.body;

        try {
            await authService.logout(refreshToken);
            res.sendStatus(204);
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }    
    }
}