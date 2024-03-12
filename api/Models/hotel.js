// api/Models/hotel.js

import mongoose from "mongoose";

const { Schema } = mongoose;


// Hotel Schema

const HotelSchema = new Schema({
  hotelName: {
    type: String,
    required: true
  },
  hotelType: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  hotelAddress: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  photos: {
    type: [String]
  },
  hotelTitle: {
    type: String,
    required: true
  },
  hotelDescription: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5
  },
  rooms: {
    type: [String]
  },
  lowestRoomPrice: {
    type: Number,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Hotel", HotelSchema);
