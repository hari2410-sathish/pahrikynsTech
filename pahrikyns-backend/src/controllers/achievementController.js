const prisma = require("../config/prismaClient");

// Get user achievements
exports.getUserAchievements = async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({
      where: { userId: req.user.id },
      orderBy: { unlockedAt: "desc" }
    });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Internal function to grant points & handle level up
exports.grantPoints = async (userId, pointsToAdd) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true, level: true }
    });

    if (!user) return;

    const oldLevel = user.level || 1;
    const newPoints = (user.points || 0) + pointsToAdd;
    
    // Simple logic: 100 points per level
    const newLevel = Math.floor(newPoints / 100) + 1;

    await prisma.user.update({
      where: { id: userId },
      data: { points: newPoints, level: newLevel }
    });

    // Notify on level up
    if (newLevel > oldLevel) {
       await prisma.notification.create({
         data: {
           userId,
           title: "✨ Level Up!",
           message: `Congratulations! You've reached Level ${newLevel}. Your manifestation is growing stronger!`,
           type: "SUCCESS"
         }
       });
    }

    return { points: newPoints, level: newLevel };
  } catch (err) {
    console.error("grantPoints error:", err);
  }
};

// Internal function to grant achievement
exports.grantAchievement = async (userId, title, description, badge) => {
  try {
    const existing = await prisma.achievement.findFirst({
      where: { userId, title }
    });
    if (existing) return;

    await prisma.achievement.create({
      data: { userId, title, description, badge }
    });
    
    // Also send a notification
    await prisma.notification.create({
      data: {
        userId,
        title: `🏆 New Achievement: ${title}`,
        message: description,
        type: "SUCCESS"
      }
    });

    // Award bonus points for achievement?
    await exports.grantPoints(userId, 50);

  } catch (error) {
    console.error("Grant achievement failed", error);
  }
};
