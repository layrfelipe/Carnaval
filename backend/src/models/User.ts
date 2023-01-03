import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUserRegister>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = model<IUserRegister>('User', userSchema);

export default User;