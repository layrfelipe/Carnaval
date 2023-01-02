// 3rd PART IMPORTS
import { Request, Response } from "express"

// MY IMPORTS
import UserService from "../services/UserService";

// INSTANTIATING SERVICE CLASS - AN ISOLATED LAYER FOR HANDLING COMPLEX BUSINESS LOGIC
const userService = new UserService()

// ACTIONS
export async function createUser (req: Request, res: Response) {
    const user:IUser = req.body

    try {
        await userService.create(user);
        res.status(201).json({msg: "User created"});
    }
    catch (err) {
        res.status(500).json({ error: err })       
    }
};

export async function getAllUsers (req: Request, res: Response) {
    try {
        const people = await userService.getAll();
        res.status(200).json(people)
    }
    catch (err) {
        res.status(500).json({ error: err })       
    }
}

export async function getUser (req: Request, res: Response) {
    const id = req.params.id;

    try {
        const user = await userService.getOne(id)

        if (!user) {
            res.status(404).json({msg: "User not found"})
            return
        }
        
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

export async function updateUser (req: Request, res: Response) {
    const id = req.params.id;
    const user:IUser = req.body
    
    try {
        const updatedUser = await userService.update(id, user)

        if (updatedUser.matchedCount === 0 ) {
            res.status(404).json({ msg: "User not found" })
            return
        }

        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({ error: err })       
    }
}

export async function deleteUser (req: Request, res: Response) {
    const id = req.params.id;

    const user = await userService.getOne(id)

    if (!user) {
        res.status(404).json({ msg: "User not found" })
        return
    }

    try {
        await userService.remove(id)
        res.status(200).json({ msg: "User deleted" })
    }
    catch (err) {
        res.status(500).json({ error: err })       
    }
}