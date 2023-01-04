import { Request, Response } from "express"

import BlockService from "../services/BlockService";

const blockService = new BlockService()

export async function createBlock (req: Request, res: Response) {
    const block = req.body

    try {
        const result = await blockService.create(block);
        res.status(201).json({ msg: "Block created", block: result});
    }
    catch (err: any) {
        res.status(err.httpCode).json(err);
    }
}

export async function getAllBlocks (req: Request, res: Response) {
    try {
        const blocks = await blockService.getAll();
        res.status(200).json(blocks)
    }
    catch (err: any) {
        res.status(err.httpCode).json(err)
    }
}

export async function getBlock (req: Request, res: Response) {
    const id = req.params.id;

    try {
        const block = await blockService.getOne(id)        
        res.status(200).json(block)
    }
    catch (err: any) {
        res.status(err.httpCode).json(err)
    }
}

export async function updateBlock (req: Request, res: Response) {
    const id = req.params.id;
    const blockNewData = req.body
    
    try {
        const blockUpdatedData = await blockService.update(id, blockNewData)
        res.status(200).json({ msg: "Block updated", blockUpdatedData })
    }
    catch (err: any) {
        res.status(err.httpCode).json(err)  
    }
}

export async function deleteBlock (req: Request, res: Response) {
    const id = req.params.id;

    try {
        await blockService.remove(id)
        res.status(204).json({ msg: "Block deleted" })
    }
    catch (err: any) {
        res.status(err.httpCode).json(err) 
    }
}