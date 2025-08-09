import app from "./src/app.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import generateResponse from "./src/services/ai.service.js";

dotenv.config();

const httpServer = createServer(app);
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

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
