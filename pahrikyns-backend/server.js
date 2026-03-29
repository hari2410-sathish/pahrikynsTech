// =======================================
// 🔥 FINAL PRODUCTION-READY SERVER.JS
// =======================================

require("dotenv").config();
const validateEnvironment = require("./src/config/envValidator");

// ============================
// VALIDATE ENVIRONMENT
// ============================
validateEnvironment();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const helmet = require("helmet");

// ============================
// ROUTES
// ============================
const adminRoutes = require("./src/routes/adminRoutes");
const userRoutes = require("./src/routes/userRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");

// ============================
// APP
// ============================
const app = express();

// ============================
// 🔥 CORS — flexible for prod + local
// ============================
const defaultAllowedOrigins = [
  "http://54.226.206.161",
  "https://54.226.206.161",

  // 🔥 FRONTEND DOMAIN
  "http://pahrikyns.com",
  "https://pahrikyns.com",

  // 🔥 LOCAL DEV
  "http://localhost:5173",
  "https://localhost:5173",
  "http://localhost:5174",
  "https://localhost:5174",
  "http://127.0.0.1:5173",
];
function normalizeOrigin(origin) {
  try {
    const parsed = new URL(origin);
    return parsed.origin;
  } catch {
    return String(origin || "").trim().replace(/\/$/, "");
  }
}

const envAllowedOriginsRaw = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URLS,
]
  .filter(Boolean)
  .join(",");

const envAllowedOrigins = envAllowedOriginsRaw
  .split(",")
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

const allowedOrigins = new Set(
  [...defaultAllowedOrigins, ...envAllowedOrigins].map((origin) =>
    normalizeOrigin(origin)
  )
);

function isAllowedOrigin(origin) {
  const normalized = normalizeOrigin(origin);
  return allowedOrigins.has(normalized);
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow Postman/curl/server-to-server requests with no origin header
    if (!origin) {
      return callback(null, true);
    }

    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ============================
// SECURITY
// ============================
app.use(helmet());

// ============================
// BODY PARSERS
// ============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ============================
// STATIC FILES
// ============================
app.use("/uploads", express.static("uploads"));

// ============================
// SESSION (HTTP SAFE)
// ============================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret_session_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ============================
// HEALTH CHECK
// ============================
app.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

// ============================
// API ROUTES
// ============================
app.use("/auth/user", userRoutes);
app.use("/admin", adminRoutes);

const courseAccessRoutes = require("./src/routes/courseAccessRoutes");
app.use("/api/students", studentRoutes);
app.use("/courses", courseAccessRoutes);
app.use("/courses", require("./src/routes/courseRoutes"));
app.use("/api/notifications", notificationRoutes);
app.use("/api/orders", require("./src/routes/orderRoutes"));
app.use("/payments", require("./src/routes/paymentRoutes"));
app.use("/api/chat", require("./src/routes/chatRoutes"));
app.use("/api/cms", require("./src/routes/cmsRoutes"));
app.use("/api/announcements", require("./src/routes/announcementRoutes"));
app.use("/api/reviews", require("./src/routes/reviewRoutes"));
app.use("/api/achievements", require("./src/routes/achievementRoutes"));

// ============================
// GLOBAL ERROR HANDLER
// ============================
app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server error",
  });
});

// ============================
// HTTP SERVER
// ============================
const server = http.createServer(app);

// ============================
// SOCKET.IO
// ============================
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error(`Socket CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  },
});

app.set("io", io);

// ============================
// SOCKET AUTH
// ============================
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
    console.error("❌ Socket Auth Error:", err.message);
    next(new Error("Invalid token"));
  }
});

// ============================
// SOCKET EVENTS
// ============================
io.on("connection", (socket) => {
  const userId = socket.user?.id;

  console.log(`🔌 Socket Connected: ${socket.id} | User: ${userId}`);

  if (userId) socket.join(`user:${userId}`);

  socket.on("join_room", (room) => socket.join(room));
  socket.on("leave_room", (room) => socket.leave(room));

  socket.on("chat_message", ({ room, content, type = "text" }) => {
    io.to(room).emit("receive_message", {
      id: Date.now().toString(),
      senderId: userId,
      senderName: socket.user?.name || "User",
      content,
      type,
      timestamp: new Date(),
    });
  });

  socket.on("typing", ({ room, isTyping }) => {
    socket.to(room).emit("user_typing", { userId, isTyping });
  });

  socket.on("disconnect", () => {
    console.log(`❌ Socket Disconnected: ${socket.id}`);
  });
});

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});

// ============================
// BACKGROUND JOBS
// ============================
const startEmailRetryJob = require("./src/jobs/emailRetryJob");
const startInvoiceCleanupJob = require("./src/jobs/invoiceCleanupJob");

startEmailRetryJob();
startInvoiceCleanupJob();
