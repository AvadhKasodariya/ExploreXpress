import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: String,
    description: String,
    type: { type: String, enum: ['BOOKING', 'REGISTRATION', 'PAYMENT', 'MESSAGE']},
    seen: {type: Boolean, default: false}
}, { timestamps: true })


const model = mongoose.model('notifications', schema)
export default model