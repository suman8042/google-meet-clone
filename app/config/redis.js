import { createClient } from 'redis';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create Redis client
const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10)  // Ensure port is an integer
    }
});

// Handle Redis connection errors
client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

// Explicitly connect the client
(async () => {
    try {
        await client.connect(); // Connect using async/await
        console.log('Redis client connected successfully.');
    } catch (err) {
        console.error('Redis connection failed:', err);
    }
})();

export default client;
