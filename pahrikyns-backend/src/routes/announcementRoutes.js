const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");
const authenticateAdmin = require("../middlewares/adminAuthMiddleware");

// PUBLIC: Get active announcements
router.get("/active", announcementController.getActiveAnnouncements);

// ADMIN ONLY
router.get("/all", authenticateAdmin, announcementController.getAllAnnouncements);
router.post("/create", authenticateAdmin, announcementController.createAnnouncement);
router.patch("/toggle/:id", authenticateAdmin, announcementController.toggleAnnouncement);
router.delete("/:id", authenticateAdmin, announcementController.deleteAnnouncement);

module.exports = router;
