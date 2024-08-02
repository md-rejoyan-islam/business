import dotenv from "dotenv";

// config
dotenv.config();

export const port: string = process.env.SERVER_PORT || "5050";
export const hostname: string = process.env.SERVER_HOST || "127.0.0.1";
