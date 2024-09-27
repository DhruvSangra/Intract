// src/storage/notificationStorage.js

const fs = require('fs');
const path = require('path');

// Path to the notifications JSON file
const filePath = path.join(__dirname, '../../data/notifications.json');

// Helper function to read from JSON file
const readData = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return []; // Return empty array if file not found
    }
};

// Helper function to write to JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing to file', error);
    }
};

// Get all notifications for a specific user
const getNotificationsForUser = (userId) => {
    const notifications = readData();
    return notifications.filter(notification => notification.userId === userId);
};

// Save a new notification
const saveNotification = (notification) => {
    const notifications = readData();
    notifications.push(notification);
    writeData(notifications);
};

// Mark notifications as read
const markNotificationsAsRead = (userId, notificationIds) => {
    let notifications = readData();
    notifications = notifications.map(notification => {
        if (notification.userId === userId && notificationIds.includes(notification.id)) {
            notification.status = 'read';
        }
        return notification;
    });
    writeData(notifications);
};

module.exports = {
    getNotificationsForUser,
    saveNotification,
    markNotificationsAsRead, // Correct export
};
