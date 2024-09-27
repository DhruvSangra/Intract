// src/routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const {
    sendNotification,
    fetchNotifications,
    markNotificationsAsRead
} = require('../controllers/notificationController');

// Route to send a notification
router.post('/send', sendNotification);

// Route to fetch notifications for a user
router.get('/:userId', fetchNotifications);

// Route to mark notifications as read
router.post('/read', markNotificationsAsRead);

module.exports = router;
