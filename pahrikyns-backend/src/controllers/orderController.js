const prisma = require("../config/prismaClient");

/* ================================
   FETCH SINGLE ORDER (FOR USER)
================================ */
exports.getUserOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Security Check: Only allow if email matches or if admin
    if (order.customerEmail !== userEmail && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (err) {
    console.error("getUserOrderById error:", err);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};
