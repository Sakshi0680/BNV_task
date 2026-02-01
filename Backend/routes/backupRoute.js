const express = require('express');
const router = express.Router();

// Mock route for handling backup scheduling
router.post('/schedule', (req, res) => {
    const { frequency } = req.body;
    console.log(`Backup scheduled for every: ${frequency}`);
    
    res.status(200).json({ 
        message: `Backup schedule updated successfully to ${frequency}`,
        status: 'Active'
    });
});

// Route to get current backup status
router.get('/status', (req, res) => {
    res.status(200).json({ 
        lastBackup: new Date().toLocaleString(),
        status: 'Healthy'
    });
});

module.exports = router;