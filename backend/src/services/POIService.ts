import Block from "../models/Block";
import { NameAlreadyInUse, BlockDoesNotExist, EmptyBodyContent, POIDoesNotExist } from "../errors/BaseErrors";
import PointOfInterest from "../models/PointOfInterest";

export default class POIService {
    public async create(poi: IPOIRegister) {
        const poiExists = await PointOfInterest.findOne({name: poi.name});
        if (poiExists) throw new NameAlreadyInUse();

        const newPOI = await PointOfInterest.create({
            name: poi.name,
            category: poi.category,
            loc: poi.loc
        });

        const reducedNewPOIData = { _id: newPOI._id };

        return reducedNewPOIData;
    }

    public async getAll() {
        const pois = await PointOfInterest.find();
        return pois;
    }

    public async getOne(id: string) {
        const result = await PointOfInterest.findOne({_id: id});
        if (!result) throw new POIDoesNotExist();

        return result;
    }

    public async update(id: string, poi: IPOIUpdate) {
        if (!poi) throw new EmptyBodyContent

        const result = await PointOfInterest.updateOne({_id: id}, poi);
        if (result.matchedCount == 0) throw new POIDoesNotExist();

        return poi;
    }

    public async remove(id: string) {
        const result = await PointOfInterest.findOne({ _id: id });
        if (!result) throw new POIDoesNotExist();
        const anotherResult = PointOfInterest.deleteOne({ _id: id });

        return anotherResult;
    }
}