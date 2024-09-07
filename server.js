import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware setup
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat-message', (data) => {
    console.log('Chat message received:', data);
      socket.broadcast.emit('chat-message', { ...data, senderId: socket.id });// Broadcast message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
  });
});

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
