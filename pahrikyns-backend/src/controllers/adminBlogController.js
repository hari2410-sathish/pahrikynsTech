const prisma = require("../config/prismaClient");

/**
 * LIST ALL POSTS
 */
exports.getBlogPosts = async (req, res) => {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(posts);
    } catch (err) {
        console.error("getBlogPosts error:", err);
        res.status(500).json({ message: "Failed to fetch blog posts" });
    }
};

/**
 * GET BLOG STATS
 */
exports.getBlogStats = async (req, res) => {
    try {
        const total = await prisma.blogPost.count();
        const published = await prisma.blogPost.count({ where: { isActive: true } });
        const drafts = await prisma.blogPost.count({ where: { isActive: false } });
        
        res.json({ total, published, drafts });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch blog stats" });
    }
};

/**
 * GET SINGLE POST
 */
exports.getBlogPostBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await prisma.blogPost.findUnique({
            where: { slug }
        });
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch post" });
    }
};

/**
 * UPSERT POST
 */
exports.upsertBlogPost = async (req, res) => {
    try {
        const { id, slug, title, content, author, thumbnail, isActive } = req.body;

        const post = await prisma.blogPost.upsert({
            where: { slug: slug || "" },
            update: { title, content, author, thumbnail, isActive },
            create: { slug, title, content, author, thumbnail, isActive }
        });

        res.json({ success: true, post });
    } catch (err) {
        console.error("upsertBlogPost error:", err);
        res.status(500).json({ message: "Failed to save post" });
    }
};

/**
 * DELETE POST
 */
exports.deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.blogPost.delete({ where: { id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete post" });
    }
};
