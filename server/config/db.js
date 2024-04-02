import mongoose from "mongoose"

export default async function () {
    mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "explorer" });
    mongoose.connection.once('connected', () => {
        console.log('MongoDB connected successfully');
    });
    mongoose.connection.once('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
}