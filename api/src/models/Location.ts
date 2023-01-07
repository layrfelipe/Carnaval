import { Schema } from 'mongoose';

const locationSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }

}, {timestamps: true});

export default locationSchema;