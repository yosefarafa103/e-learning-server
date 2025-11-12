import { Server } from "socket.io";
import { createServer } from "http";
import {
  createNewMessage,
  deleteMessage,
  editMessage,
} from "../controller/messages.controller.js";

export function connectSocket(app) {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  let onlineUsers = [];
  io.on("connection", (socket) => {
    console.log("a user connected");
    // Joining Chat
    socket.on("join-chat", (chatId) => {
      socket.join(chatId);
      console.log("user join to room");
    });
    socket.on("new-client-connection", (client) => {
      if (!onlineUsers.some((u) => u.userId === client.userId))
        onlineUsers.push({ userId: client.userId, socketId: socket.id });
      io.emit("online-users", onlineUsers);
    });
    // Success Connection
    socket.emit("conenction-success", { user: "Yosef" });
    // Sending Messages
    socket.on("send-message", async (message, roomId) => {
      const msg = await createNewMessage(message);
      io.to(roomId).emit("send-message-success", msg);
    });
    // Editing Messaging
    socket.on("update-message", async (data) => {
      try {
        const updated = await editMessage(data);
        const returnedMessage = updated.updatedMessage || updated;
        if (data.chatId) {
          io.to(data.chatId).emit("update-message-success", returnedMessage);
        }
      } catch (error) {
        console.error("Error updating message:", error);
      }
    });
    // Deleting Message
    socket.on("delete-message", async (msg) => {
      try {
        await deleteMessage(msg);
        io.to(msg.chatId).emit("delete-message-success", msg);
        console.log("deleted");
      } catch (error) {
        console.log(error);
      }
    });
  });
  io.on("disconnect", (socket) => {
    console.log("a user disconnected");
    socket.emit("disconnected-success", { user: "Yosef" });
  });
  return { server };
}
