import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({msg: "Acess denied"});

    try {
        const secret = encodeURIComponent(process.env.SECRET!);
        jwt.verify(token, secret);
        next();
    } catch (error) {
        return res.status(400).json({msg: "Invalid token"});        
    }
}