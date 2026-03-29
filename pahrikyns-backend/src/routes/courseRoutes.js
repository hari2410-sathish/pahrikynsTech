const express = require("express");
const router = express.Router();
const { getCourseBySlug } = require("../controllers/courseController");
const { checkCourseAccess, checkToolAccess } = require("../controllers/courseAccessController");
const auth = require("../middlewares/authMiddleware");

// Access Check Route (Protected)
// NOTE: keep this route above /:slug to avoid matching "access" as slug.
router.get("/:courseId/access", auth, checkCourseAccess);
router.get("/tool/:category/:tool/access", auth, checkToolAccess);

// Public route to fetch course details by slug/title
router.get("/:slug", getCourseBySlug);

module.exports = router;
