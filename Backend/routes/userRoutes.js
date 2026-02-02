const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Routes
router.post('/register', upload.single('profile'), userController.createUser);
router.get('/all-users', userController.getAllUsers); // This becomes /api/all-users
router.get('/user/:id', userController.getUserById);
router.put('/edit/:id', upload.single('profile'), userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);
router.get('/export-users', userController.exportToCsv);

module.exports = router;