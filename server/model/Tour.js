import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: String,
    description: String,
    duration: Number,
    price: Number,
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotels'
    }

}, { timestamps: true })


const model = mongoose.model('tours', schema)
export default model