require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

const MONGO_URL = process.env.MONGO_URI || "mongodb://sakshideshmukh680_db_user:Sakshi2532004@cluster0-shard-00-00.xcxmgg1.mongodb.net:27017,cluster0-shard-00-01.xcxmgg1.mongodb.net:27017,cluster0-shard-00-02.xcxmgg1.mongodb.net:27017/BNV_Task_Database?ssl=true&replicaSet=atlas-kv166q-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)
    .then(() => console.log("Cloud Database Connected Successfully"))
    .catch((err) => console.error("Database Connection Error:", err.message));

app.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            status: "ok",
            data: users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
