import { Schema, model } from 'mongoose';
import locationSchema from './Location';  

const blockSchema = new Schema({
    name: { type: String, required: true },
    initialLoc: { type: locationSchema, required: true },
    finalLoc: { type: locationSchema, required: false },
    concentrationAt: { type: Date, required: false },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: false },
    description: { type: String, required: true }
    
}, {timestamps: true});

const Block = model('Block', blockSchema);

export default Block;