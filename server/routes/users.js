const express = require('express');
const router = express.Router();
const { requireAuth } = require('@clerk/express');
const userController = require('../controllers/userController');

// Analytics (Protected)
router.get('/analytics', requireAuth(), userController.getAnalytics);

// User History (Public/Semi-protected? Original: app.get('/api/history/:userId', async...) - no explicit auth middleware)
router.get('/history/:userId', userController.getUserHistory);

module.exports = router;
