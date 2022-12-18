import { Router } from "express"
import Event from "../models/Event"

import { isValidObjectId } from "mongoose"

const router = Router()

router.post("/", async (req, res) => {

    const {
        name,
        location_start,
        location_end,
        start,
        end,
        created_at,
        updated_at
    } = req.body;

    const event = {
        name,
        location_start,
        location_end,
        start,
        end,
        created_at,
        updated_at
    }

    try {
        await Event.create(event)
        res.status(201).json({msg: "Evento inserido no sistema"})
    }
    catch (error) {
        res.status(500).json({error: error})
    }
});

router.get("/", async (req, res) => {
    try {
        const events = await Event.find()
        res.status(200).json(events)
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
            const event = await Event.findOne({_id: id})

            if (!event) {
                res.status(422).json({msg: "O evento não foi encontrado"})
                return
            }

            res.status(200).json(event)
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
        const {
            name,
            location_start,
            location_end,
            start,
            end,
            created_at,
            updated_at
        } = req.body
    
        const event = {
            name,
            location_start,
            location_end,
            start,
            end,
            created_at,
            updated_at
        }

        try {
            const updatedEvent = await Event.updateOne({_id: id}, event)

            if (updatedEvent.matchedCount === 0 ) {
                res.status(422).json({msg: "O evento não foi encontrado"})
                return
            }

            res.status(200).json(event)
        }
        catch (error) {
            res.status(422).json({msg: "O evento não foi encontrado", error: error})
        }
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
        res.status(422).json({msg: "Id inválido"})
    }
    else {
        const event = await Event.findOne({_id: id})

        if (!event) {
            res.status(422).json({msg: "O evento não foi encontrado"})
            return
        }

        try {
            await Event.deleteOne({_id: id})
            res.status(200).json({msg: "Evento excluído"})
        }
        catch (error) {
            res.status(422).json({msg: "O evento não foi encontrado", error: error})
        }
    }
})












export default router