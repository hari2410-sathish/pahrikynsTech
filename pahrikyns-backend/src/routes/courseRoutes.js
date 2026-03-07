const express = require("express");
const router = express.Router();
const { getCourseBySlug } = require("../controllers/courseController");
const { checkCourseAccess } = require("../controllers/courseAccessController");
const auth = require("../middlewares/authMiddleware");

// Access Check Route (Protected)
// NOTE: keep this route above /:slug to avoid matching "access" as slug.
router.get("/:courseId/access", auth, checkCourseAccess);

// Public route to fetch course details by slug/title
router.get("/:slug", getCourseBySlug);

module.exports = router;
