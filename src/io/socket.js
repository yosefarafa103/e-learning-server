import { Server } from "socket.io";
import { createServer } from "http";
import { createNewMessage } from "../controller/messages.controller.js";

export function connectSocket(app) {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("conenction-success", { user: "Yosef" });
    socket.on("send-message", async (message, roomId) => {
      const msg = await createNewMessage(message);
      io.to(roomId).emit("send-message-success", msg);
    });
    socket.on("join-chat", (chatId) => {
      socket.join(chatId);
    });
  });
  io.on("disconnect", (socket) => {
    console.log("a user disconnected");
    socket.emit("disconnected-success", { user: "Yosef" });
  });
  return { server };
}
