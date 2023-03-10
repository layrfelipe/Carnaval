import { Schema, model } from 'mongoose';
import locationSchema from './Location';

export enum Role {
  CITIZEN = "citizen",
  ORGANIZER = "organizer",
  ADMIN = "admin"
}

const userSchema = new Schema({
    username: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },

    name: { type: String, required: true },

    phone: { type: String, required: true },

    birthday: { type: Date, required: true },

    role: { type: String, required: false, enum: Role, default: Role.CITIZEN  },

    loc: { type: locationSchema, required: true },

    favBlocks: [{ type: Schema.Types.ObjectId, ref: "Block", required: true, default: [] }],

    friends: [{ type: Schema.Types.ObjectId, ref: "User", required: true , default: []}]
}, {timestamps: true});

const User = model('User', userSchema);

export default User;