import Block from "../models/Block";
import { NameAlreadyInUse, BlockDoesNotExist, EmptyBodyContent } from "../errors/BaseErrors";
import dateAndTimeHandler from "../utils/datetimeHandler";

export default class BlockService {

    async create(block: IBlockRegister) {
        const blockExists = await Block.findOne({name: block.name});
        if (blockExists) throw new NameAlreadyInUse();

        const startsAt = dateAndTimeHandler(block.startsAt);

        let concentrationAt = null
        if (block.concentrationAt) {
            concentrationAt = dateAndTimeHandler(block.concentrationAt)
        }

        let endsAt = null;
        if (block.endsAt) {
            endsAt = dateAndTimeHandler(block.endsAt)
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

        const reducedNewBlockData = { _id: newBlock._id, name: newBlock.name };

        return reducedNewBlockData;
    }

    async getAll() {
        const blocks = await Block.find();
        return blocks;
    }

    async getOne(id: string) {
        const result = await Block.findOne({_id: id});
        if (!result) throw new BlockDoesNotExist();

        return result;
    }

    async update(id: string, block: IBlockUpdate) {
        if (!block) throw new EmptyBodyContent

        if (block.concentrationAt) block.concentrationAt = dateAndTimeHandler(block.concentrationAt)
        if (block.startsAt) block.startsAt = dateAndTimeHandler(block.startsAt);
        if (block.endsAt) block.endsAt = dateAndTimeHandler(block.endsAt)

        const result = await Block.updateOne({_id: id}, block);
        if (result.matchedCount == 0) throw new BlockDoesNotExist();

        return block;
    }

    async remove(id: string) {
        const result = await Block.findOne({ _id: id });
        if (!result) throw new BlockDoesNotExist();
        const anotherResult = Block.deleteOne({ _id: id });

        return anotherResult;
    }
}