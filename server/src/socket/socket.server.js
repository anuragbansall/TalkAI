import { Server } from "socket.io";
import generateResponse from "../services/ai.service.js";

const initializeSocketServer = (httpServer) => {
  const io = new Server(httpServer);

  // Store conversation history per socket connection
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Initialize history for this socket
    socket.history = [];

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });

    socket.on("message", async (message) => {
      console.log("Received message:", message);

      socket.history.push({ role: "user", parts: [{ text: message }] });

      const response = await generateResponse(message, socket.history);
      socket.history.push({ role: "model", parts: [{ text: response }] });

      socket.emit("message", response);
    });
  });
};

export default initializeSocketServer;