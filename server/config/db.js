import mongoose from "mongoose"

export default async function () {
    mongoose.connect('mongodb+srv://pinalbalar152:mongodb@cluster0.uajupt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "explorer" });
    mongoose.connection.once('connected', () => {
        console.log('MongoDB connected successfully');
    });
    mongoose.connection.once('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
}