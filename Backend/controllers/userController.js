const User = require('../models/User');
const { Parser } = require('json2csv');

// 1. Create User (Add)
exports.createUser = async (req, res) => {
    try {
        const file = req.file ? req.file.filename : "";
        const newUser = new User({ ...req.body, profile: file });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2. Get All Users (with Search & Pagination) [cite: 9, 15]
exports.getAllUsers = async (req, res) => {
    const { search = "", page = 1 } = req.query;
    const limit = 5; // Items per page
    const skip = (page - 1) * limit;

    try {
        const query = {
            $or: [
                { fname: { $regex: search, $options: 'i' } },
                { lname: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        };
        const users = await User.find(query).limit(limit).skip(skip);
        const count = await User.countDocuments(query);
        res.status(200).json({ users, totalPages: Math.ceil(count / limit) });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

// 3. Get Single User
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: "User not found" });
    }
};

// 4. Update User (Edit) [cite: 9]
exports.updateUser = async (req, res) => {
    try {
        const updateData = req.file ? { ...req.body, profile: req.file.filename } : req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 5. Delete User [cite: 9]
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 6. Export to CSV [cite: 16]
exports.exportToCsv = async (req, res) => {
    try {
        const users = await User.find();
        const fields = ['fname', 'lname', 'email', 'mobile', 'gender', 'status', 'location'];
        const parser = new Parser({ fields });
        const csv = parser.parse(users);
        res.header('Content-Type', 'text/csv');
        res.attachment("users.csv");
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: "Export failed" });
    }
};