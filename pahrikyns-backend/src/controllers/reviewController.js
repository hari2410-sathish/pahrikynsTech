const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get course reviews
exports.getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { courseId },
      include: {
        user: {
          select: { name: true, avatar: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const stats = await prisma.review.aggregate({
      where: { courseId },
      _avg: { rating: true },
      _count: { id: true }
    });

    res.json({ reviews, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post a review
exports.postReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, comment } = req.body;

    // Security Check: Has user purchased the course?
    const hasAccess = await prisma.userCourse.findUnique({
      where: { userId_courseId: { userId, courseId } }
    });

    if (!hasAccess) {
      return res.status(403).json({ error: "Purchase required to review" });
    }

    const review = await prisma.review.upsert({
      where: {
        userId_courseId: { userId, courseId }
      },
      update: { rating, comment },
      create: { userId, courseId, rating, comment }
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete review (Admin or Owner)
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({ where: { id } });
    
    if (!review) return res.status(404).json({ error: "Not found" });

    if (req.user.role !== "admin" && review.userId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await prisma.review.delete({ where: { id } });
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
