import express from "express";
import Hotel from "../Models/hotel.js";
import { createError } from "../utils/error.js";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../Controllers/hotel.js";

const router = express.Router();

// Create Hotels
router.post("/", createHotel);


// Update Hotels
router.put("/:id", updateHotel);

// Delete Hotels
router.delete("/:id", deleteHotel);

// GET
router.get("/:id", getHotel);

// GET All

router.get("/", getHotels);

export default router;
