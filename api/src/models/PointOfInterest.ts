import { Schema, model } from 'mongoose';
import locationSchema from './Location';

export enum POIType {
  SUBWAY = "subway",
  HOSPITAL = "hospital",
  POLICE = "police"
}

const poiSchema = new Schema({
    name: { type: String, required: true },

    category: { type: String, required: true, enum: POIType },

    loc: { type: locationSchema, required: true },

}, {timestamps: true});

const PointOfInterest = model('PointOfInterest', poiSchema);

export default PointOfInterest;