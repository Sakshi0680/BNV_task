require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const backupRoutes = require('./routes/backupRoute');

const app = express();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Created uploads directory");
}

// MongoDB connection (Updated to use BNV_Task_Database)
const MONGO_URL = process.env.MONGO_URI || "mongodb://sakshideshmukh680_db_user:Sakshi2532004@cluster0-shard-00-00.xcxmgg1.mongodb.net:27017,cluster0-shard-00-01.xcxmgg1.mongodb.net:27017,cluster0-shard-00-02.xcxmgg1.mongodb.net:27017/BNV_Task_Database?ssl=true&replicaSet=atlas-kv166q-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)
    .then(() => console.log("Cloud Database Connected Successfully"))
    .catch((err) => console.error("Database Connection Error:", err.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir)); 

// Routes
app.get("/", (req, res) => {
    res.send("Welcome! The BNV Task backend is running successfully.");
});

// API routes - These will all start with /api
app.use('/api', userRoutes);
app.use('/api/files', backupRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});