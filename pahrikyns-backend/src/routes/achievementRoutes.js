const express = require("express");
const router = express.Router();
const achievementController = require("../controllers/achievementController");
const authenticateToken = require("../middlewares/authMiddleware");

// Get user achievements
router.get("/", authenticateToken, achievementController.getUserAchievements);

module.exports = router;
