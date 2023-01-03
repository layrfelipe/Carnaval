// 3rd PART IMPORTS
import { Schema, model } from 'mongoose';

// DEFINING SCHEMA FOR DB
const userSchema = new Schema<IUserRegister>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = model<IUserRegister>('User', userSchema);

export default User;