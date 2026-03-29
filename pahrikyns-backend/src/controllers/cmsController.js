const prisma = require("../config/prismaClient");

/**
 * GET ALL PUBLISHED BLOG POSTS
 */
async function getPublicBlogPosts(req, res) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        author: true,
        thumbnail: true,
        content: true, // Optionally truncate this in the client
        createdAt: true,
      }
    });
    res.json(posts);
  } catch (err) {
    console.error("getPublicBlogPosts error:", err);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
}

/**
 * GET SINGLE BLOG POST BY SLUG
 */
async function getPublicBlogPostBySlug(req, res) {
  try {
    const { slug } = req.params;
    const post = await prisma.blogPost.findFirst({
      where: { slug, isActive: true },
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("getPublicBlogPostBySlug error:", err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

/**
 * GET SINGLE WEB PAGE BY SLUG
 */
async function getPublicWebPageBySlug(req, res) {
  try {
    const { slug } = req.params;
    const page = await prisma.webPage.findFirst({
      where: { slug, isActive: true },
    });
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  } catch (err) {
    console.error("getPublicWebPageBySlug error:", err);
    res.status(500).json({ error: "Failed to fetch page" });
  }
}

module.exports = {
  getPublicBlogPosts,
  getPublicBlogPostBySlug,
  getPublicWebPageBySlug,
};
