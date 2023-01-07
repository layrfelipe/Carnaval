import Block from "../models/Block";
import { NameAlreadyInUse, BlockDoesNotExist, EmptyBodyContent } from "../errors/BaseErrors";
import DatetimeHandler from "../utils/DatetimeHandler";

export default class BlockService {
    public datetimeHandler = new DatetimeHandler();
    
    public async create(block: IBlockRegister) {
        const blockExists = await Block.findOne({name: block.name});
        if (blockExists) throw new NameAlreadyInUse();

        const startsAt = this.datetimeHandler.handler(block.startsAt);

        let concentrationAt = null
        if (block.concentrationAt) {
            concentrationAt = this.datetimeHandler.handler(block.concentrationAt)
        }

        let endsAt = null;
        if (block.endsAt) {
            endsAt = this.datetimeHandler.handler(block.endsAt)
        }

        const newBlock = await Block.create({
            name: block.name,
            initialLoc: block.initialLoc,
            finalLoc: block.finalLoc || null,
            concentrationAt: concentrationAt,
            startsAt: startsAt,
            endsAt: endsAt,
            description: block.description
        });

        const reducedNewBlockData = { _id: newBlock._id };

        return reducedNewBlockData;
    }

    public async getAll() {
        const blocks = await Block.find();
        return blocks;
    }

    public async getOne(id: string) {
        const result = await Block.findOne({_id: id});
        if (!result) throw new BlockDoesNotExist();

        return result;
    }

    public async update(id: string, block: IBlockUpdate) {
        if (!block) throw new EmptyBodyContent

        if (block.concentrationAt) block.concentrationAt = this.datetimeHandler.handler(block.concentrationAt)
        if (block.startsAt) block.startsAt = this.datetimeHandler.handler(block.startsAt);
        if (block.endsAt) block.endsAt = this.datetimeHandler.handler(block.endsAt)

        const result = await Block.updateOne({_id: id}, block);
        if (result.matchedCount == 0) throw new BlockDoesNotExist();

        return block;
    }

    public async remove(id: string) {
        const result = await Block.findOne({ _id: id });
        if (!result) throw new BlockDoesNotExist();
        const anotherResult = Block.deleteOne({ _id: id });

        return anotherResult;
    }
}