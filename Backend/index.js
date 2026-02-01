require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const backupRoutes = require('./routes/backupRoute');

const app = express();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Created uploads directory");
}

const MONGO_URL = process.env.MONGO_URI;
if (!MONGO_URL) {
    console.error("❌ MONGO_URI is not defined. Set it in Render Environment Variables!");
    process.exit(1); // Stop the server if no DB URL
}

mongoose.connect(MONGO_URL)
  .then(() => console.log("🌐 Cloud Database Connected Successfully"))
  .catch((err) => console.error("❌ Database Connection Error:", err.message));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

app.get("/", (req, res) => {
    res.send("🎉 Welcome! The BNV Task backend is running successfully.");
});

app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
});

app.use('/api', userRoutes);
app.use('/api/files', backupRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: "Error", 
        message: "Internal Server Error", 
        error: err.message 
    });
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
