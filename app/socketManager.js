import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
const socket = io(import.meta.env.VITE_BASE_URL, {
  transports: ['websocket'], // Enforce WebSocket transport
  autoConnect: true          // Ensure auto-connect is enabled
});

// Setup Socket Events
export function setupSocket() {
  socket.on('connect', () => {
    console.log('Connected to the socket server:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the socket server');
  });

  socket.on('code', (data) => {
    console.log('Code received:', data);
    // Handle received 'code' event from the server
  });

  socket.on('chat-message', (data) => {
    console.log('Chat message received:', data);
    // Handle received 'chat-message' event from the server
    if (data.url === url) {
      // Check if the message is from the current user
      const isFromCurrentUser = data.senderId === socket.id;
      handleIncomingMessage(data.msg, isFromCurrentUser ? "you" : "other");
    }
  });

  socket.on('signal', (data) => {
    console.log('Signal data received:', data);
    // Handle received 'signal' event from the server
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
}

export { socket };
