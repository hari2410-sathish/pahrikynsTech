const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  checkCourseAccess,
  checkToolAccess
} = require("../controllers/courseAccessController");

router.get("/:courseId/access", auth, checkCourseAccess);
router.get("/tool/:category/:tool/access", auth, checkToolAccess);

module.exports = router;
