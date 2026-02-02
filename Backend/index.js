require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({
    origin: ["https://resilient-nasturtium-6c3d6c.netlify.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

const MONGO_URL = process.env.MONGO_URI || "mongodb+srv://sakshideshmukh680_db_user:Sakshi2532004@cluster0.xcxmgg1.mongodb.net/BNV_Task_Database?retryWrites=true&w=majority";

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
