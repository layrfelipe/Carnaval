import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ msg: "No token provided" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2) return res.status(400).json({ msg: "Token error" });

    if (parts[0] != "Bearer") return res.status(400).json({ msg: "Token malformatted" })

    const token = parts[1]

    jwt.verify(token, encodeURIComponent(process.env.ACESS_TOKEN_SECRET!), (err: jwt.VerifyErrors | null, decoded: string | jwt.JwtPayload | undefined) => {
        if (err) return res.status(403).json({ msg: "Invalid token" });
        req.body = {...req.body, decoded}
        next();
    });
}