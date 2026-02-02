const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: String, required: true },
    location: { type: String, required: true },
    profile: { type: String } // This stores the filename from multer
});

module.exports = mongoose.model('user', userSchema,'users');