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

// ✅ MongoDB Atlas Connection (Mongoose v7+)
const MONGO_URL = "mongodb+srv://sakshideshmukh680_db_user:Sakshi2532004@cluster0.xcxmgg1.mongodb.net/mydatabase?retryWrites=true&w=majority";


mongoose.connect(MONGO_URL)
  .then(() => console.log("🌐 Cloud Database Connected Successfully"))
  .catch((err) => console.error("❌ Database Connection Error:", err.message));
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api', userRoutes);
app.use('/api/files', backupRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: "Error", 
        message: "Internal Server Error", 
        error: err.message 
    });
});

// Start server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
