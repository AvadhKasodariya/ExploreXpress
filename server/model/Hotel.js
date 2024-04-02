import Joi from 'joi';
import mongoose from 'mongoose';
import Tour from './Tour.js'

// Define Joi schema for validation
const schemaValidation = Joi.object({
    _id: Joi.object().required(),
    title: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    distance: Joi.string().required(),
    photos: Joi.array().items(Joi.string()),
    description: Joi.string().allow(''),
    price: Joi.number().required(),
    maxGroupSize: Joi.number().integer().required(),
    reviews: Joi.number().integer().default(0),
    hotelname: Joi.string().required(),
    type: Joi.string().required(),
    rating: Joi.number().default(0),
    rooms: Joi.number().integer().required(),
    cheapestprice: Joi.number().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

// Define Mongoose schema
const schema = new mongoose.Schema({
    title: String,
    city: String,
    address: String,
    distance: String,
    photos: [String],
    description: String,
    price: Number,
    maxGroupSize: Number,
    reviews: Number,
    hotelname: String,
    type: String,
    rating: Number,
    rooms: Number,
    cheapestprice: Number,
    booked: Boolean,
}, { timestamps: true });

// Apply Joi validation middleware before saving to the database
schema.pre('save', async function (next) {
    try {
        await schemaValidation.validateAsync(this.toObject());
        next();
    } catch (error) {
        next(error.details[0].message);
    }
});

schema.pre('deleteOne', { document: true }, async function (next) {
    try {
        await Tour.deleteMany({ hotel: this._id })
        next();
    } catch (error) {
        return next(err);
    }
});

schema.virtual('images').get(function () {
    return this.photos.map(v => `http://localhost/${v}`)
});

// Create and export Mongoose model
const Hotel = mongoose.model('hotels', schema);
export default Hotel;
