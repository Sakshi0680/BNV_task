require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists for profile pictures
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

// Database Connection (Using the Long-Form String for stability)
const MONGO_URL = process.env.MONGO_URI || "mongodb://sakshideshmukh680_db_user:Sakshi2532004@cluster0-shard-00-00.xcxmgg1.mongodb.net:27017,cluster0-shard-00-01.xcxmgg1.mongodb.net:27017,cluster0-shard-00-02.xcxmgg1.mongodb.net:27017/BNV_Task_Database?ssl=true&replicaSet=atlas-kv166q-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)
    .then(() => console.log("Cloud Database Connected Successfully"))
    .catch((err) => console.error("Database Connection Error:", err.message));

// Root route (What you see in the browser currently)
app.get("/", async (req, res) => {
    try {
        // This fetches all users created by your registration form
        const users = await User.find({});
        
        // This sends the live data to the browser immediately
        res.status(200).json({
            message: "BNV Task Backend is Live!",
            total_users: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Could not fetch users from database",
            details: error.message 
        });
    }
});

// Use the User Routes with an '/api' prefix
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});