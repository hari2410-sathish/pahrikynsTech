const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendOTPEmail } = require("../helpers/generateOTP");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ===========================
// SAFE SOCKET EMIT HELPER
// ===========================
function safeEmit(req, event, payload) {
  try {
    const io = req.app?.get("io");
    if (io) io.emit(event, payload);
  } catch (e) {
    console.warn("Socket emit skipped:", e.message);
  }
}

/* ===========================
   REGISTER USER (STEP 1)
=========================== */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedName = String(name).trim();

    // Already registered?
    const exist = await prisma.user.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Save / update temp user
    await prisma.tempUser.upsert({
      where: { email: normalizedEmail },
      update: { name: normalizedName, password: hashed },
      create: { name: normalizedName, email: normalizedEmail, password: hashed },
    });

    // Clear old OTPs
    await prisma.otpStore.deleteMany({ where: { email: normalizedEmail } });

    // Send OTP (SAFE)
    let otp;
    try {
      otp = await sendOTPEmail(normalizedEmail);
    } catch (mailErr) {
      console.error("OTP mail failed:", mailErr.message);
      return res.status(500).json({
        success: false,
        message: "Unable to send OTP. Please try again later.",
      });
    }

    const otpHash = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    await prisma.otpStore.create({
      data: {
        email: normalizedEmail,
        otpHash,
        method: "email",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    // Socket notify (SAFE)
    safeEmit(req, "admin_notification", {
      title: "New Registration Attempt 📝",
      message: `OTP sent to ${normalizedEmail}`,
      type: "info",
      timestamp: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "OTP sent",
      data: {
        requiresOTP: true,
        email: normalizedEmail,
      }
    });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

/* ===========================
   LOGIN USER
=========================== */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email).trim().toLowerCase();

    const user = await prisma.user.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ success: false, message: "Please verify your email before login" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Self-heal legacy mixed-case emails in DB.
    if (user.email !== normalizedEmail) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { email: normalizedEmail },
        });
        user.email = normalizedEmail;
      } catch (e) {
        console.warn("Email normalization skipped:", e.message);
      }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // DB notification (SAFE)
    try {
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: "Login Alert 🔐",
          message: "You logged in successfully",
          type: "login",
        },
      });
    } catch (e) {
      console.warn("Notification skipped:", e.message);
    }

    // Socket notify
    safeEmit(req, "admin_notification", {
      title: "User Login 🟢",
      message: `${user.email} logged in`,
      type: "success",
      timestamp: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
        }
      }
    });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===========================
   VERIFY OTP (STEP 2)
=========================== */
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = String(email).trim().toLowerCase();

    const otpHash = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    const record = await prisma.otpStore.findFirst({
      where: {
        email: { equals: normalizedEmail, mode: "insensitive" },
        otpHash,
      },
    });

    if (!record) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    const tempUser = await prisma.tempUser.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });
    if (!tempUser) {
      return res.status(400).json({ success: false, message: "Temp user not found" });
    }

    const user = await prisma.user.create({
      data: {
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password,
        isVerified: true,
      },
    });

    await prisma.tempUser.deleteMany({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });
    await prisma.otpStore.deleteMany({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });

    safeEmit(req, "admin_notification", {
      title: "New User Registered 🚀",
      message: `${user.email} joined`,
      type: "success",
      timestamp: new Date(),
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: true,
          createdAt: user.createdAt,
        }
      }
    });
  } catch (err) {
    console.error("verifyOTP error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ===========================
   GOOGLE LOGIN
=========================== */
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();
    const normalizedEmail = String(email).trim().toLowerCase();
    if (!normalizedEmail) {
      return res.status(400).json({ success: false, message: "Google email missing" });
    }

    let user = await prisma.user.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });

    if (!user) {
      const hashed = await bcrypt.hash(
        crypto.randomBytes(16).toString("hex"),
        10
      );

      user = await prisma.user.create({
        data: {
          name,
          email: normalizedEmail,
          password: hashed,
          isVerified: true,
          avatar: picture || null,
        },
      });
    }

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Google login successful",
      data: {
        token: jwtToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
        }
      }
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({ success: false, message: "Google authentication failed" });
  }
};
