const express = require("express");
const router = express.Router();
const {
  getPublicBlogPosts,
  getPublicBlogPostBySlug,
  getPublicWebPageBySlug
} = require("../controllers/cmsController");

router.get("/blog", getPublicBlogPosts);
router.get("/blog/:slug", getPublicBlogPostBySlug);
router.get("/page/:slug", getPublicWebPageBySlug);

module.exports = router;
