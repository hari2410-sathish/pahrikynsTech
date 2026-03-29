const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    if (!trimmedEmail || !trimmedPassword) {
      console.log("DEBUG: missing credentials");
      return res.status(400).json({ error: "Missing credentials" });
    }

    const admin = await prisma.admin.findUnique({
      where: { email: trimmedEmail },
    });

    if (!admin) {
      console.log("DEBUG: admin not found for email:", trimmedEmail);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ error: "Admin account is deactivated" });
    }

    const match = await bcrypt.compare(trimmedPassword, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ PRE-OTP TOKEN (ADMIN)
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin",
        stage: "pre-otp",
      },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.json({
      ok: true,
      next: "otp",
      token,
    });
  } catch (err) {
    console.error("adminLogin error:", err);
    return res.status(500).json({ error: "Admin login failed" });
  }
}

/**
 * UPDATE ADMIN PROFILE
 */
async function updateAdminProfile(req, res) {
  try {
    const { name, email } = req.body;
    const adminId = req.user.id; // From adminAuthMiddleware

    const updated = await prisma.admin.update({
      where: { id: adminId },
      data: { name, email },
    });

    res.json({ ok: true, admin: { id: updated.id, name: updated.name, email: updated.email } });
  } catch (err) {
    console.error("updateAdminProfile error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
}

/**
 * CHANGE ADMIN PASSWORD
 */
async function changeAdminPassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.user.id;

    const admin = await prisma.admin.findUnique({ where: { id: adminId } });
    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match) {
      return res.status(401).json({ error: "Current password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: adminId },
      data: { password: hashedPassword },
    });

    res.json({ ok: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("changeAdminPassword error:", err);
    res.status(500).json({ error: "Failed to change password" });
  }
}

module.exports = { adminLogin, updateAdminProfile, changeAdminPassword };
