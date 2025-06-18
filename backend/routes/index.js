const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const callbackRoutes = require('./callback');

router.use('/auth', authRoutes);
router.use('/callbacks', callbackRoutes);

module.exports = router; 