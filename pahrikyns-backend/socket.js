const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const logger = require("./src/utils/logger");
const admin = require("./src/config/firebaseAdmin");

let io;
const onlineUsers = new Map(); // userId -> Set(socketIds)

function isAllowedOrigin(origin) {
  // We can reuse the allowed origins logic, but for simplicity we allow standard origins
  const allowed = [
    "http://54.226.206.161", "https://54.226.206.161",
    "http://pahrikyns.com", "https://pahrikyns.com",
    "http://localhost:5173", "https://localhost:5173"
  ];
  if (process.env.FRONTEND_URL) allowed.push(process.env.FRONTEND_URL);
  
  if (!origin) return true;
  return allowed.some(allowedOrigin => origin.startsWith(allowedOrigin));
}

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || isAllowedOrigin(origin)) return callback(null, true);
        return callback(new Error(`Socket CORS blocked for origin: ${origin}`));
      },
      credentials: true,
    },
  });

  // Socket Auth Middleware
  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.query?.token ||
        socket.handshake.headers?.authorization?.split(" ")[1];
      if (!token) return next(new Error("Auth token missing"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      logger.error("Socket Auth Error:", err.message);
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user?.id;
    socket.userId = userId;

    logger.info(`🔌 Socket Connected: ${socket.id} | User: ${userId}`);

    // Register Presence automatically on connect
    if (userId) {
      socket.join(`user:${userId}`);
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId).add(socket.id);
      
      io.emit("user_online", { userId });
      socket.emit("online_users", Array.from(onlineUsers.keys()));
    }

    socket.on("join_room", (room) => {
      socket.join(room);
      logger.info(`User ${userId} joined room: ${room}`);
    });

    socket.on("leave_room", (room) => {
      socket.leave(room);
      logger.info(`User ${userId} left room: ${room}`);
    });

    socket.on("typing", ({ room, isTyping }) => {
      socket.to(room).emit("user_typing", { userId, isTyping });
    });

    socket.on("chat_message", async (data) => {
      try {
        const { room, content, type = "text", fileUrl, threadId } = data;
        const senderName = socket.user?.name || "User";
        
        const timestamp = new Date().toISOString();
        const messageData = {
          room,
          content,
          type,
          senderId: userId,
          senderName,
          fileUrl: fileUrl || null,
          threadId: threadId || null,
          createdAt: timestamp,
          reactions: []
        };

        // Try to save to Firestore if admin is configured properly
        try {
          if(admin && admin.apps.length > 0) {
            const db = admin.firestore();
            const docRef = await db.collection("messages").add(messageData);
            messageData.id = docRef.id;

            if (threadId) {
              const parentRef = db.collection("messages").doc(threadId);
              await parentRef.update({
                replyCount: admin.firestore.FieldValue.increment(1),
                lastReplyAt: timestamp
              });

              io.to(room).emit("message_updated", {
                id: threadId,
                replyCount: admin.firestore.FieldValue.increment(1),
                lastReplyAt: timestamp
              });
            }
          } else {
            messageData.id = Date.now().toString(); // Fallback ID if no Firestore
          }
        } catch (dbErr) {
          logger.error("Firestore Error:", dbErr.message);
          messageData.id = Date.now().toString(); // Fallback ID
        }

        io.to(room).emit("receive_message", messageData);

      } catch (err) {
        logger.error("Error saving message:", err);
      }
    });

    socket.on("disconnect", () => {
      if (userId && onlineUsers.has(userId)) {
        const userSockets = onlineUsers.get(userId);
        userSockets.delete(socket.id);

        if (userSockets.size === 0) {
          onlineUsers.delete(userId);
          io.emit("user_offline", { userId });
          logger.info(`User ${userId} went offline`);
        }
      }
      logger.info(`❌ Socket Disconnected: ${socket.id}`);
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = { initSocket, getIo };
