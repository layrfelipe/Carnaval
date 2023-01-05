import { Schema, model } from 'mongoose';

const refreshTokenSchema = new Schema({
    token: { type: String, required: true },

}, {timestamps: true});

const RefreshToken = model('RefreshToken', refreshTokenSchema);

export default RefreshToken;