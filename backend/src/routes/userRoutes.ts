import { Router } from "express"
import User from "../models/User"

import { isValidObjectId } from "mongoose"

const router = Router()

router.post("/", async (req, res) => {
    const { name, email } = req.body;

    if (!name) {
        res.status(422).json({error: "O nome é obrigatório"})
        return
    }

    const user = {
        name, 
        email
    }

    try {
        await User.create(user)
        res.status(201).json({msg: "Pessoa inserida no sistema"})
    }
    catch (error) {
        res.status(500).json({error: error})
    }
});

router.get("/", async (req, res) => {
    try {
        const people = await User.find()
        res.status(200).json(people)
    }
    catch (error) {
        res.status(500).json({error: error})        
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        res.status(422).json({msg: "Id inválido"})
    }
    else {
        try {
            const user = await User.findOne({_id: id})

            if (!user) {
                res.status(422).json({msg: "O usuário não foi encontrado"})
                return
            }

            res.status(200).json(user)
        }
        catch (error) {
            res.status(422).json({error: error})
        }
    }
})

router.patch("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        res.status(422).json({msg: "Id inválido"})
    }
    else {
        const { name, email } = req.body;

        const user = {
            name,
            email
        }

        try {
            const updatedUser = await User.updateOne({_id: id}, user)

            if (updatedUser.matchedCount === 0 ) {
                res.status(422).json({msg: "O usuário não foi encontrado"})
                return
            }

            res.status(200).json(user)
        }
        catch (error) {
            res.status(422).json({msg: "O usuário não foi encontrado", error: error})
        }
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        res.status(422).json({msg: "Id inválido"})
    }
    else {
        const user = await User.findOne({_id: id})

        if (!user) {
            res.status(422).json({msg: "O usuário não foi encontrado"})
            return
        }

        try {
            await User.deleteOne({_id: id})
            res.status(200).json({msg: "Usuário excluído"})
        }
        catch (error) {
            res.status(422).json({msg: "O usuário não foi encontrado", error: error})
        }
    }
})


export default router