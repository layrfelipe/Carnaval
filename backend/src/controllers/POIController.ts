import { Request, Response } from "express";
import POIService from "../services/POIService";
const poiService = new POIService();

export default class POIController {
    constructor(){}

    public async createPOI (req: Request, res: Response) {
        const poi = req.body;

        try {
            const result = await poiService.create(poi);
            res.status(201).json({ msg: "POI created", _id: result._id});
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }

    public async getAllPOIs (req: Request, res: Response) {
        try {
            const pois = await poiService.getAll();
            res.status(200).json(pois);
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }

    public async getPOI (req: Request, res: Response) {
        const id = req.params.id;

        try {
            const poi = await poiService.getOne(id)  ;      
            res.status(200).json(poi);
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }

    public async updatePOI (req: Request, res: Response) {
        const id = req.params.id;
        const poiNewData = req.body;
        
        try {
            const poiUpdatedData = await poiService.update(id, poiNewData);
            res.status(200).json({ msg: "POI updated", poiUpdatedData });
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }

    public async deletePOI (req: Request, res: Response) {
        const id = req.params.id;

        try {
            await poiService.remove(id);
            res.sendStatus(204);
        }
        catch (err: any) {
            res.status(err.httpCode).json(err);
        }
    }
}