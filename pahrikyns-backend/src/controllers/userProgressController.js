const { grantAchievement, grantPoints } = require("./achievementController");
const prisma = require("../config/prismaClient");

/* ============================================================
   USER MY COURSES
   ============================================================ */
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await prisma.userCourse.findMany({
      where: { userId: req.user.id },
      include: { course: true }
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

/* ============================================================
   UPDATE PROGRESS & MILESTONES
   ============================================================ */
exports.updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, lessonId, completed } = req.body;

    // To avoid double-granting points, check if it was already completed
    const existingProgress = await prisma.userProgress.findUnique({
      where: {
        userId_courseId_lessonId: { userId, courseId, lessonId }
      }
    });

    const isNewlyCompleted = completed && (!existingProgress || !existingProgress.completed);

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_courseId_lessonId: { userId, courseId, lessonId }
      },
      update: { completed },
      create: { userId, courseId, lessonId, completed }
    });

    let currentStats = null;

    if (isNewlyCompleted) {
       // 🎯 AWARD POINTS (20 xp per lesson)
       currentStats = await grantPoints(userId, 20);

       // 🏅 Milestone Logic: Count completed lessons for this course
       const completedCount = await prisma.userProgress.count({
         where: { userId, courseId, completed: true }
       });

       // 🏆 Achievement Logic
       if (completedCount === 1) {
         await grantAchievement(userId, "Quick Learner", "You completed your first lesson!", "bronze");
       } else if (completedCount === 5) {
         await grantAchievement(userId, "First Milestone", "5 lessons completed. Keep it up!", "silver");
       }
    }

    res.json({ 
       progress, 
       stats: currentStats 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ============================================================
   GET COURSE PROGRESS (LEGACY COMPAT)
   ============================================================ */
exports.getCourseProgress = async (req, res) => {
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId: req.user.id }
    });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course progress" });
  }
};
