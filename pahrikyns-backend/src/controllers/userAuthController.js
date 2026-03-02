const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendOTPEmail } = require("../helpers/generateOTP");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* ===========================
   REGISTER USER (STEP 1)
   OTP ONLY FOR REGISTER
=========================== */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Save temp user
    await prisma.tempUser.upsert({
      where: { email },
      update: { name, password: hashed },
      create: { name, email, password: hashed },
    });

    // Clear old OTPs
    await prisma.otpStore.deleteMany({ where: { email } });

    // Generate OTP
    const otp = await sendOTPEmail(email);
    const otpHash = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    await prisma.otpStore.create({
      data: {
        email,
        otpHash,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    // Socket notification
    const io = req.app.get("io");
    if (io) {
      io.emit("admin_notification", {
        title: "New Registration Attempt 📝",
        message: `OTP sent to ${email}`,
        type: "info",
        timestamp: new Date(),
      });
    }

    res.json({
      message: "OTP sent",
      requiresOTP: true,
      email,
    });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   LOGIN USER (PASSWORD ONLY)
   ❌ OTP NOT USED HERE
=========================== */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 🔒 BLOCK UNVERIFIED USERS
    if (!user.isVerified) {
      return res.status(403).json({
        error: "Please verify your email before login",
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // DB notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Login Alert 🔐",
        message: "You logged in successfully",
        type: "login",
      },
    });

    // Socket notification
    const io = req.app.get("io");
    if (io) {
      io.emit("admin_notification", {
        title: "User Login 🟢",
        message: `${user.email} just logged in.`,
        type: "success",
        timestamp: new Date(),
      });
    }

    // Update login stats (safe)
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastLoginAt: new Date(),
          lastLoginIp: req.ip || req.connection.remoteAddress,
          lastDevice: req.headers["user-agent"] || "Unknown",
        },
      });
    } catch (e) {
      console.warn("Login stats update failed:", e.message);
    }

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   VERIFY OTP (REGISTER ONLY)
=========================== */
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Missing email or OTP" });
    }

    const otpHash = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    const record = await prisma.otpStore.findFirst({
      where: { email, otpHash },
    });

    if (!record) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ error: "OTP expired" });
    }

    const tempUser = await prisma.tempUser.findUnique({ where: { email } });
    if (!tempUser) {
      return res.status(400).json({ error: "Temp user not found" });
    }

    const user = await prisma.user.create({
      data: {
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password,
        isVerified: true,
      },
    });

    await prisma.tempUser.delete({ where: { email } });
    await prisma.otpStore.deleteMany({ where: { email } });

    // Notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Welcome 🎉",
        message: "Your account registered successfully!",
        type: "register",
      },
    });

    const io = req.app.get("io");
    if (io) {
      io.emit("admin_notification", {
        title: "New User Registered 🚀",
        message: `${user.email} has joined the platform!`,
        type: "success",
        timestamp: new Date(),
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "OTP verified successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: true,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("verifyOTP error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ===========================
   GOOGLE LOGIN (AUTO VERIFIED)
=========================== */
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Google token missing" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();
    if (!email) {
      return res.status(400).json({ error: "Google email missing" });
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const hashed = await bcrypt.hash(
        crypto.randomBytes(16).toString("hex"),
        10
      );

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashed,
          isVerified: true,
          avatar: picture || null,
        },
      });

      await prisma.notification.create({
        data: {
          userId: user.id,
          title: "Welcome via Google 🎉",
          message: "Your account was created using Google",
          type: "register",
        },
      });
    }

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({ error: "Google authentication failed" });
  }
};
