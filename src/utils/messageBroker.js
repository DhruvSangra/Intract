const WebSocket = require('ws');
const redis = require('redis');

// Redis Publisher and Subscriber
const publisher = redis.createClient();
const subscriber = redis.createClient();

// Publish a Message to a Channel
const publishMessage = (channel, message) => {
    return new Promise((resolve, reject) => {
        publisher.publish(channel, message, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
};

// WebSocket Setup
const clients = {};

const setupWebSocket = (server) => {
    const wsServer = new WebSocket.Server({ server });

    wsServer.on('connection', (socket, req) => {
        const userId = req.url.split('=')[1];
        clients[userId] = socket;

        socket.on('close', () => {
            delete clients[userId];
        });
    });

    // Subscribe to Redis Channel
    subscriber.subscribe('notification_channel');

    subscriber.on('message', (channel, message) => {
        const { target, userId, message: msg, source, timestamp } = JSON.parse(message);

        if (target === 'specific' && clients[userId]) {
            clients[userId].send(JSON.stringify({ message: msg, source, timestamp }));
        } else if (target === 'all_users') {
            for (const client in clients) {
                clients[client].send(JSON.stringify({ message: msg, source, timestamp }));
            }
        }
    });
};

module.exports = { setupWebSocket, publishMessage };
