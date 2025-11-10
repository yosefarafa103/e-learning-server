import express from "express";
import cors from "cors";
import { connectSocket } from "./io/socket.js";
import mongoose from "mongoose";
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("🚀 Express + TypeScript server is rusnning!");
});
const { server } = connectSocket(app);
const conenctionStr =
  "mongodb+srv://jooyosef173_db_user:nZ2Lv5kuXbDN35rr@cluster0.in98l92.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(conenctionStr).then(() => console.log("mongodb connected"));
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
