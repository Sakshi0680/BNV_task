const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const backupRoutes = require('./routes/backupRoute'); 

const app = express();

// 1. Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log("Created uploads directory");
}

// 2. Database Connection (UPDATED TO CLOUD ATLAS)
const MONGO_URL = "mongodb://sakshideshmukh680_db_user:Sakshi2532004@cluster0-shard-00-00.xcxmggl.mongodb.net:27017,cluster0-shard-00-01.xcxmggl.mongodb.net:27017,cluster0-shard-00-02.xcxmggl.mongodb.net:27017/BNV_Task_Database?ssl=true&replicaSet=atlas-kv166q-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(MONGO_URL)
    .then(() => console.log("Cloud Database Connected Successfully"))
    .catch((err) => console.log("Database Connection Error: ", err));

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Serve Static Files
app.use('/uploads', express.static(uploadDir));

// 5. Routes
app.use('/api', userRoutes);
app.use('/api/files', backupRoutes); 

// 6. Start Server (UPDATED FOR DEPLOYMENT)
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
