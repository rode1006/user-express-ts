import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
import { initializeWebSocket } from "./services/websocket";

dotenv.config();

// MongoDB Connection
const mongoUri = process.env.MONGO_URI as string;
connectDB(mongoUri);

// Start the server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Initialize WebSocket
initializeWebSocket(server);
