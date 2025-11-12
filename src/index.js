import express from "express";
import cors from "cors";
import { connectSocket } from "./io/socket.js";
import mongoose from "mongoose";
import connectDB from "./lib/db.js";
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("🚀 Express + TypeScript server is rusnning!");
});
const { server } = connectSocket(app);
connectDB().then(() => console.log("mongodb connected"));

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
