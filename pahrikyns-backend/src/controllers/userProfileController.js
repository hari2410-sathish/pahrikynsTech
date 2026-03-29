const prisma = require("../config/prismaClient");
const bcrypt = require("bcryptjs");

/* ============================================================
   GET CURRENT USER
============================================================ */
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
        avatar: true,
        points: true,
        level: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("getCurrentUser error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

/* ============================================================
   UPDATE PROFILE
============================================================ */
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { name: name.trim() },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        createdAt: true,
        avatar: true,
        points: true,
        level: true,
      },
    });

    res.json({
      message: "Profile updated successfully",
      user: updated,
    });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

/* ============================================================
   CHANGE PASSWORD
============================================================ */
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Old password and new password required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ error: "Old password incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashed },
    });

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("changePassword error:", err);
    res.status(500).json({ error: "Failed to change password" });
  }
};

/* ============================================================
   GET ALL USERS (FOR CHAT)
============================================================ */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: req.user.id }, // Exclude self
        role: "user", // Optional: only fetch normal users
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    res.json(users);
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/* ============================================================
   GET DASHBOARD STATS
============================================================ */
exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Enrolled Courses Count
    const enrolledCourses = await prisma.userCourse.count({
      where: { userId }
    });

    // 2. Completed Lessons
    const completedLessons = await prisma.userProgress.count({
      where: { userId, completed: true }
    });

    // 3. Total Lessons in Enrolled Courses
    const userCourses = await prisma.userCourse.findMany({
      where: { userId },
      include: { course: true }
    });

    let totalLessonsInEnrolled = 0;
    userCourses.forEach((uc) => {
      totalLessonsInEnrolled += (uc.course?.lessons || 1);
    });

    // 4. Overall Progress
    let overallProgress = 0;
    if (totalLessonsInEnrolled > 0) {
      overallProgress = Math.round((completedLessons / totalLessonsInEnrolled) * 100);
    }

    // 5. Weekly Activity (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentProgress = await prisma.userProgress.findMany({
      where: { userId, createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true }
    });

    const activityData = Array(7).fill(0);
    const today = new Date();
    recentProgress.forEach((p) => {
      const diff = Math.floor((today - new Date(p.createdAt)) / (1000 * 60 * 60 * 24));
      if (diff >= 0 && diff < 7) {
        activityData[6 - diff]++;
      }
    });

    // 6. Recent Achievements
    const achievements = await prisma.achievement.findMany({
      where: { userId },
      take: 3,
      orderBy: { unlockedAt: "desc" }
    });

    // 7. Certificates
    const certificates = await prisma.certificate.findMany({
      where: { userId },
      include: { course: true }
    });

    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true, level: true }
    });

    res.json({
      enrolledCourses,
      completedLessons,
      overallProgress,
      learningHours: Math.round(completedLessons * 0.5),
      streak: userCourses.length > 0 ? 5 : 0, 
      weeklyActivity: activityData,
      achievements,
      certificates,
      points: userData?.points || 0,
      level: userData?.level || 1
    });
  } catch (err) {
    console.error("getDashboardStats error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
