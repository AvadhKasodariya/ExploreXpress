import mongoose from "mongoose";
import Booking from './Booking.js'

const schema = new mongoose.Schema({
    fname: String,
    lname: String,
    image: { type: String, default: 'avatar.jpg' },
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    email: String,
    password: String,
}, { timestamps: true })



schema.pre('deleteOne', { document: true }, async function (next) {
    try {
        await Booking.deleteMany({ user: this._id })
        next();
    } catch (error) {
        return next(err);
    }
});


const model = mongoose.model('users', schema)
export default model