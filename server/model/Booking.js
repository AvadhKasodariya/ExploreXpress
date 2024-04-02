import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'tours' },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'hotels' },
    type: { type: String, enum: ['TOUR', 'HOTEL'] },
    amount: Number,
    start: Date,
    end: Date
}, { timestamps: true })


const model = mongoose.model('booking', schema)
export default model