const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Added to handle folder creation
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 1. Ensure the 'uploads' directory exists
// This prevents errors when users try to upload profile pictures
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Created uploads directory");
}

// 2. Database Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/BNV_Task_Database"; 

mongoose.connect(MONGO_URL)
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log(" Database Connection Error: ", err));

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Serve Static Files
// This makes uploaded images accessible to the frontend
app.use('/uploads', express.static(uploadDir));

// 5. Routes
app.use('/api', userRoutes);

// 6. Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});