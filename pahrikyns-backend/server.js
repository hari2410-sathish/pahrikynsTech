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
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const logger = require("./src/utils/logger");
const { globalErrorHandler } = require("./src/utils/errorHandler");
const { initSocket } = require("./socket");

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
// SECURITY & RATE LIMITING
// ============================
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use("/api/", apiLimiter);
app.use("/auth/", apiLimiter);

// ============================
// LOGGING
// ============================
app.use(morgan("combined", {
  stream: { write: (message) => logger.info(message.trim()) }
}));

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
// Handle unknown routes
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  next(err);
});

// Centralized Error Handling Middleware
app.use(globalErrorHandler);

// ============================
// HTTP SERVER
// ============================
const server = http.createServer(app);

// ============================
// SOCKET.IO INITIALIZATION
// ============================
initSocket(server);

// ============================
// START SERVER
// ============================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`🚀 Server running at http://0.0.0.0:${PORT}`);
});

// ============================
// BACKGROUND JOBS
// ============================
const startEmailRetryJob = require("./src/jobs/emailRetryJob");
const startInvoiceCleanupJob = require("./src/jobs/invoiceCleanupJob");

startEmailRetryJob();
startInvoiceCleanupJob();

// triggered restart

// triggered restart 2

// triggered restart 3
