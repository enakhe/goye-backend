import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    phone: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: false,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);
