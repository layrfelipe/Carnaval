import { Schema, model, Date } from 'mongoose';

interface ILocation {
    lat: number
    lon: number
}

interface IEvent {
    name: string
    location_start: ILocation
    location_end: ILocation
    start: Date
    end: Date
    created_at: Date
    updated_at: Date
}

interface IUser {
    name: string
    username: string
    email: string
    password_hash: string
    events: IEvent[]
    friends: IUser[]
    created_at: Date
    updated_at: Date
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;