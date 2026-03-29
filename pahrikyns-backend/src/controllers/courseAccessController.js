const prisma = require("../config/prismaClient");

exports.checkCourseAccess = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ access: false });
    }

    // 1️⃣ FREE course check
    if (course.price === 0) {
      return res.json({ access: true, reason: "FREE" });
    }

    // 2️⃣ Subscription check (Unlocks EVERYTHING)
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (subscription?.status === "ACTIVE") {
      return res.json({ access: true, reason: "SUBSCRIPTION" });
    }

    // 3️⃣ Paid Course Check
    const paidCourse = await prisma.userCourse.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (paidCourse?.paid) {
      return res.json({ access: true, reason: "COURSE_PURCHASE" });
    }

    // ❌ Access Denied
    return res.json({
      access: false,
      message: "This course requires payment or an active subscription.",
      price: course.price
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ access: false });
  }
};

exports.checkToolAccess = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, tool } = req.params;

    // Admin has full access
    if (req.user.role === "admin") {
      return res.json({ access: true, reason: "ADMIN" });
    }

    // Check active tool subscription
    const sub = await prisma.toolSubscription.findUnique({
      where: {
        userId_category_tool: { userId, category, tool },
      },
    });

    if (sub) {
      if (sub.validUntil === null || new Date(sub.validUntil) > new Date()) {
        return res.json({ access: true, reason: "TOOL_SUBSCRIPTION" });
      } else {
        const { getBasePrice } = require("../config/pricing");
        return res.json({ access: false, message: "Subscription expired", basePrice: getBasePrice(category, tool) });
      }
    }

    const { getBasePrice } = require("../config/pricing");
    return res.json({ access: false, message: "Purchase required to access this tool.", basePrice: getBasePrice(category, tool) });
  } catch (err) {
    console.error("checkToolAccess error:", err);
    res.status(500).json({ access: false });
  }
};
