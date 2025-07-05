import mongoose from 'mongoose'
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: String,
        required: false,
        trim: true,
    },

    notes: {
        type: String,
        required: false,
        trim: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    tag: {
        type: String,
        required: false,
        trim: true,
        enum: ['prospect', 'disciple', 'love zone'],
        default: 'prospect'
    }
}, { timestamps: true })

export default mongoose.model("Contact", ContactSchema);