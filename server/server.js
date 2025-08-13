import app from "./src/app.js";
import dotenv from "dotenv";
import { createServer } from "http";
import initializeSocketServer from "./src/socket/socket.server.js";

dotenv.config();

const httpServer = createServer(app);

initializeSocketServer(httpServer);

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
