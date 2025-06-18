const express = require('express');
const router = express.Router();
const callbackController = require('../controllers/callbackController');
const { protect, authorize } = require('../middlewares/auth'); // Import authentication middleware

// Route to submit a new callback request (publicly accessible)
router.post('/submit', callbackController.submitCallbackRequest);

// Route to get all callback requests (Admin only - protected by auth middleware)
router.get('/all', protect, authorize('admin'), callbackController.getAllCallbackRequests);

module.exports = router; 