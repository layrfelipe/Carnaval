import { Request, Response } from "express"

import UserService from "../services/UserService";

const userService = new UserService()

export async function getAllUsers (req: Request, res: Response) {
    try {
        const people = await userService.getAll();
        res.status(200).json(people)
    }
    catch (err: any) {
        res.status(err.httpCode).json(err)
    }
}

export async function getUser (req: Request, res: Response) {
    const id = req.params.id;

    try {
        const user = await userService.getOne(id)        
        res.status(200).json(user)
    }
    catch (err: any) {
        res.status(err.httpCode).json(err)
    }
}

export async function updateUser (req: Request, res: Response) {
    const id = req.params.id;
    const userNewData = req.body
    
    try {
        const userUpdatedData = await userService.update(id, userNewData)
        res.status(200).json({ msg: "User updated", userUpdatedData })
    }
    catch (err: any) {
        res.status(err.httpCode).json(err)  
    }
}

export async function deleteUser (req: Request, res: Response) {
    const id = req.params.id;

    try {
        await userService.remove(id)
        res.status(204).json({ msg: "User deleted" })
    }
    catch (err: any) {
        res.status(err.httpCode).json(err) 
    }
}