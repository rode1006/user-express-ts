import cors from "cors";

export const corsMiddleware = cors({
    origin: "http://localhost:4200", // The frontend URL
    credentials: true,
});
