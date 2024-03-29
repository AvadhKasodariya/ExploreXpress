import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./Routes/authentication.js";
import hotelsRoute from "./Routes/hotels.js";
import roomsRoute from "./Routes/rooms.js";

dotenv.config();
const app = express();


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/authentication", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}.`);
});
