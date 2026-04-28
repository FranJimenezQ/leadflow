import express from "express";
import mongoose from "mongoose";
import leadsRouter from "./leads/lead.routes";


const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/leadflow";

//Middleware
app.use(express.json());

//Routes
app.use('/api/leads', leadsRouter);

//Connect to MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

//Test route
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

//Init server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});