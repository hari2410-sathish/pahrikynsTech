const prisma = require("../config/prismaClient");

exports.getCourseBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        if (!slug || slug.trim().length === 0) {
            return res.status(400).json({ error: "Course slug is required" });
        }

        // Try finding exact match first (case insensitive)
        const course = await prisma.course.findFirst({
            where: {
                title: {
                    equals: slug,
                    mode: "insensitive",
                },
                status: "Published",
            },
        });

        if (course) {
            return res.json(course);
        }

        // Fallback: Try contains if exact failed (e.g. slug "ec2", title "Amazon EC2")
        const fuzzy = await prisma.course.findFirst({
            where: {
                title: {
                    contains: slug,
                    mode: "insensitive"
                },
                status: "Published",
            }
        });

        if (fuzzy) {
            return res.json(fuzzy);
        }

        // ✅ PROPER HANDLING: Return 404 if course not found
        return res.status(404).json({ 
            error: "Course not found",
            message: `No published course found matching "${slug}"`
        });
    } catch (err) {
        console.error("getCourseBySlug error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
