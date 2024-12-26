import { WebSocketServer, WebSocket, RawData } from "ws";
import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";
import messageController from "../controllers/messageController";
const secret = "your_jwt_secret"; // Replace with your secret key

// Function to parse cookies from a string
const parseCookies = (cookieString: string): { [key: string]: string } => {
  return cookieString.split(";").reduce((cookies, cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    cookies[name] = value;
    return cookies;
  }, {} as { [key: string]: string });
};

// Define a custom type for the client object
interface Client {
  socket: WebSocket;
  username: string;
}

// Store connected clients with their user IDs
const clients = new Map<string, Client>();

export const initializeWebSocket = (server: any) => {
  const wss = new WebSocketServer({ server });
  console.log("WebSocket server started");

  wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    // Parse cookies from the request headers
    const cookies = parseCookies(req.headers.cookie || "");
    const token = cookies["auth_token"]; // Adjust for your cookie name

    if (!token) {
      ws.close();
      return;
    }

    const decoded = jwt.verify(token, secret) as {
      username: string;
      email: string;
    }; // Verify token and extract email
    clients.set(decoded.username, { socket: ws, username: decoded.username });

    // Handle client registration
    ws.on("message", (data: RawData) => {
      try {
        const parsedData = JSON.parse(data.toString());

        const { sender, receiver, message } = parsedData;
        messageController.create(parsedData);
        
        clients.forEach((client) => {
          if (
            client.username === receiver &&
            client.socket.readyState === WebSocket.OPEN
          ) {
            client.socket.send(
              JSON.stringify({ receiver, sender, message, date: new Date() })
            );
            
            console.log(`Message ${message} sent from ${sender} to ${receiver}`, client.username);
          }
        });
      } catch (error) {
        console.error("Invalid message format:", data.toString());
      }
    });

    // Handle client disconnection
    ws.on("close", () => {
      for (const [userId, client] of clients.entries()) {
        if (client.socket === ws) {
          clients.delete(userId);
          console.log(`User disconnected with ID: ${userId}`);
          break;
        }
      }
    });
  });
};
