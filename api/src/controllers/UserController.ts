import { Request, Response } from "express";
import UserService from "../services/UserService";
const userService = new UserService();

export default class UserController {
    constructor(){}

    public async getAllUsers (req: Request, res: Response) {
        try {
            const people = await userService.getAll();
            res.status(200).json(people);
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }

    public async getUser (req: Request, res: Response) {
        const id = req.params.id;

        try {
            const user = await userService.getOne(id);
            res.status(200).json(user);
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }

    public async updateUser (req: Request, res: Response) {
        const id = req.params.id;
        const userNewData = req.body;
        
        try {
            const userUpdatedData = await userService.update(id, userNewData);
            res.status(200).json({ msg: "User updated", userUpdatedData });
        }
        catch (err: any) {
            res.status(err.httpCode).json(err)  ;
        }
    }

    public async deleteUser (req: Request, res: Response) {
        const id = req.params.id;

        try {
            await userService.remove(id);
            res.sendStatus(204);
        }
        catch (err: any) {
            res.status(err.httpCode).json(err) ;
        }
    }
}