const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get active announcements for users
exports.getActiveAnnouncements = async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      },
      orderBy: { createdAt: "desc" }
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Create announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, type, expiresAt } = req.body;
    const announcement = await prisma.announcement.create({
      data: {
        title,
        message,
        type: type || "info",
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      }
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Toggle active status
exports.toggleAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const current = await prisma.announcement.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ error: "Not found" });

    const updated = await prisma.announcement.update({
      where: { id },
      data: { isActive: !current.isActive }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.announcement.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
