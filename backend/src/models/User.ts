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

    role: { type: String, required: true, enum: Role, default: Role.CITIZEN  },

    loc: { type: locationSchema, required: true }
}, {timestamps: true});

const User = model('User', userSchema);

export default User;