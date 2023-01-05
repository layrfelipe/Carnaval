import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import Authentication from "../classes/Authentication";
import RefreshToken from "../models/RefreshToken";

export default class AuthMiddleware extends Authentication {
    public verifyToken (req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ msg: "No token provided" });

        const parts = authHeader.split(" ");
        if (parts.length !== 2) return res.status(400).json({ msg: "Token error" });

        if (parts[0] != "Bearer") return res.status(400).json({ msg: "Token malformatted" })

        const token = parts[1]

        jwt.verify(token, encodeURIComponent(process.env.ACESS_TOKEN_SECRET!), (err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined) => {
            if (err) return res.status(403).json({ msg: "Invalid token" });
            req.body = {...req.body, user}
            next();
        });
    }

    public async verifyRefreshToken (req: Request, res: Response, next: NextFunction) {
        const refreshToken: string = req.body.refreshToken;

        if (!refreshToken) return res.status(401).json({ msg: "No token provided" })

        const tokenExists = await RefreshToken.findOne({ token: refreshToken });
        if (!tokenExists) return res.status(403).json({ msg: "Invalid token" })

        jwt.verify(refreshToken, encodeURIComponent(process.env.REFRESH_TOKEN_SECRET!), (err: jwt.VerifyErrors | null, user: string | jwt.JwtPayload | undefined) => {
            if (err) return res.status(403).json({ msg: "Invalid token" });
            const userObject = JSON.parse(JSON.stringify(user))
            req.body = {...req.body, id: userObject.id }
            next();
        });
    }
}