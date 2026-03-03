 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/pahrikyns-backend/server.js b/pahrikyns-backend/server.js
index a93db127c6e34b4c6c1782a9c0a19e5f64790e9d..0cd7fc3fbadbcf64725fa26ab36580616bb831a7 100644
--- a/pahrikyns-backend/server.js
+++ b/pahrikyns-backend/server.js
@@ -11,65 +11,81 @@ const validateEnvironment = require("./src/config/envValidator");
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
-// 🔥 CORS — EC2 FIXED
-// ============================
-const FRONTEND_URL = "http://54.226.206.161";
+// 🔥 CORS — flexible for prod + local
+// ============================
+const defaultAllowedOrigins = [
+  "http://54.226.206.161",
+  "http://localhost:5173",
+  "http://127.0.0.1:5173",
+];
+
+const envAllowedOrigins = (process.env.FRONTEND_URL || "")
+  .split(",")
+  .map((origin) => origin.trim())
+  .filter(Boolean);
+
+const allowedOrigins = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);
+
+const corsOptions = {
+  origin: (origin, callback) => {
+    // allow Postman/curl/server-to-server requests with no origin header
+    if (!origin) return callback(null, true);
+    if (allowedOrigins.has(origin)) return callback(null, true);
+    return callback(new Error(`CORS blocked for origin: ${origin}`));
+  },
+  credentials: true,
+  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
+  allowedHeaders: ["Content-Type", "Authorization"],
+};
 
-app.use(
-  cors({
-    origin: FRONTEND_URL,
-    credentials: true,
-    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
-    allowedHeaders: ["Content-Type", "Authorization"],
-  })
-);
+app.use(cors(corsOptions));
 
 // Preflight
-app.options("*", cors());
+app.options("*", cors(corsOptions));
 
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
@@ -103,51 +119,51 @@ app.use("/courses", require("./src/routes/courseRoutes"));
 app.use("/api/notifications", notificationRoutes);
 app.use("/payments", require("./src/routes/paymentRoutes"));
 app.use("/api/chat", require("./src/routes/chatRoutes"));
 
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
 // SOCKET.IO (EC2 FIXED)
 // ============================
 const io = new Server(server, {
   cors: {
-    origin: FRONTEND_URL,
+    origin: [...allowedOrigins],
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
 
EOF
)
