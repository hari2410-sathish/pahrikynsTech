const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authenticateToken = require("../middlewares/authMiddleware");

// PUBLIC: Get course reviews
router.get("/course/:courseId", reviewController.getCourseReviews);

// AUTH: Post/Update review
router.post("/post", authenticateToken, reviewController.postReview);

// AUTH/ADMIN: Delete review
router.delete("/:id", authenticateToken, reviewController.deleteReview);

module.exports = router;
