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

const eventSchema = new Schema<IEvent>({
    name: { type: String, required: true },
    location_start: { type: String, required: true },
    location_end: { type: String },
    start: { type: String, required: true},
    end: { type: String },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

const Event = model<IEvent>('Event', eventSchema);

export default Event;