const express = require('express');
const notificationRoutes = require('./routes/notificationRoutes');
const { setupWebSocket } = require('./utils/messageBroker');

// Express App Setup



const app = express();
app.use(express.json());

// API Routes
app.use('/api/notifications', notificationRoutes);

// Start Express Server
const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Setup WebSocket Server
setupWebSocket(server);
