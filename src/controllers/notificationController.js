// src/controllers/notificationController.js

const { v4: uuidv4 } = require('uuid');
const {
    getNotificationsForUser,
    saveNotification,
    markNotificationsAsRead: markReadInStorage // Avoiding conflict
} = require('../storage/notificationStorage');


// if send has a userID, then push it to the database as it is 
// but if there isnt any userID then take all unique userIDs and attach the message to each of them and push them to db.

// Controller for sending notifications
const sendNotification = async (req, res) => {
    const { target, userId, message, source, timestamp } = req.body;

    const notification = {
        id: userId, // Unique ID for each notification
        target,
        message,
        source,
        timestamp,
        status: 'unread'
    };

    // Save the notification
    if(notification.id) saveNotification(notification);
    else{

    }

    console.log('Notification published:', notification);

    res.status(200).json({ success: true });
};

// Controller for fetching notifications
const fetchNotifications = async (req, res) => {
    const { userId } = req.params;
    const notifications = getNotificationsForUser(userId);
    res.json(notifications);
};

// Controller for marking notifications as read
const markNotificationsAsRead = async (req, res) => {
    const { userId, notificationIds } = req.body;
    
    // Use the storage function to mark as read
    markReadInStorage(userId, notificationIds);

    res.status(200).json({ success: true });
};

module.exports = {
    sendNotification,
    fetchNotifications,
    markNotificationsAsRead, // Export once here only
};
