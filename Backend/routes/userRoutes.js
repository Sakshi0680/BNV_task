const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

// Multer setup for profile image uploads as required [cite: 103]
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes matching the assessment requirements [cite: 9, 15, 16]
router.post('/register', upload.single('profile'), userController.createUser);
router.get('/all-users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/edit/:id', upload.single('profile'), userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/export-users', userController.exportToCsv);

module.exports = router;