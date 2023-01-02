// 3rd PART IMPORTS
import { Schema, model } from 'mongoose';

// DEFINING SCHEMA FOR DB
const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;