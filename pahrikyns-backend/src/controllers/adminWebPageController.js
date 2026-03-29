const prisma = require("../config/prismaClient");

/**
 * LIST ALL PAGES
 */
exports.getWebPages = async (req, res) => {
    try {
        const pages = await prisma.webPage.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(pages);
    } catch (err) {
        console.error("getWebPages error:", err);
        res.status(500).json({ message: "Failed to fetch pages" });
    }
};

/**
 * GET SINGLE PAGE
 */
exports.getWebPageBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const page = await prisma.webPage.findUnique({
            where: { slug }
        });
        if (!page) return res.status(404).json({ message: "Page not found" });
        res.json(page);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch page" });
    }
};

/**
 * UPSERT PAGE (Update if exists, else create)
 */
exports.upsertWebPage = async (req, res) => {
    try {
        const { slug, title, content, isActive } = req.body;

        const page = await prisma.webPage.upsert({
            where: { slug },
            update: { title, content, isActive },
            create: { slug, title, content, isActive }
        });

        res.json({ success: true, page });
    } catch (err) {
        console.error("upsertWebPage error:", err);
        res.status(500).json({ message: "Failed to save page" });
    }
};

/**
 * DELETE PAGE
 */
exports.deleteWebPage = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.webPage.delete({ where: { id } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete page" });
    }
};
