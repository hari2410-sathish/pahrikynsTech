const prisma = require("../config/prismaClient");

/* ============================
   GET ALL USERS (PAGINATION)
============================ */
exports.getUsers = async (req, res) => {
  try {
    let { search = "", status = "all", page = 1 } = req.query;

    page = Number(page);
    const limit = 20;
    const skip = (page - 1) * limit;

    // Filters
    const where = {
      role: { not: "admin" }, // Exclude admins from the list if desired, or keep them
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    // Status filter
    // Frontend sends "all", "active", "blocked"
    // User model has `isVerified` (boolean) but frontend thinks in terms of Active/Blocked.
    // There isn't a direct "blocked" status in the User model shown in schema.
    // We will approximate:
    // "active" -> isVerified: true (or just all users?)
    // "blocked" -> No field for this?
    // User model: id, name, email, password, isVerified, createdAt, role, avatar...
    // Schema doesn't show `isActive` or `status` on User model.
    // We will just ignore status filter for "blocked" if the field is missing, or map to isVerified.

    if (status === "active") {
      where.isVerified = true;
    } else if (status === "blocked") {
      // where.isActive = false; // Model doesn't have this.
      // For now, we'll return empty or ignore.
      // Let's check if 'isVerified' is false?
      where.isVerified = false;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isVerified: true,
          createdAt: true,
          avatar: true,
          lastLoginAt: true,
          lastLoginIp: true,
          lastDevice: true,
          // We can't select courses count easily without relation.

          // Including payments to count?
          _count: {
            select: { payments: true }
          }
        },
      }),
      prisma.user.count({ where }),
    ]);

    // Map to frontend expectation
    const mappedUsers = users.map(u => ({
      ...u,
      // TODO: Schema update required. 'isVerified' is used as a proxy for 'isActive'.
      // Consider adding a dedicated 'status' enum to the User model (ACTIVE, BLOCKED, PENDING).
      isActive: u.isVerified,

      // TODO: 'UserCourse' relation is missing in this controller.
      // We need to fetch the count of enrolled courses for this user.
      // E.g., const count = await prisma.userCourse.count({ where: { userId: u.id } });
      coursesCount: 0,

      paymentsCount: u._count.payments
    }));

    res.json({
      success: true,
      users: mappedUsers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalUsers: total
    });

  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

/* ============================
   GET USER BY ID
============================ */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
        courses: {
          include: {
            course: true
          }
        },
        toolSubscriptions: true,
        _count: {
          select: { payments: true }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ FETCH ORDERS BY EMAIL
    const orders = await prisma.order.findMany({
      where: { customerEmail: user.email },
      include: { items: true },
      orderBy: { createdAt: "desc" }
    });

    // Calculate Spent
    const totalSpent = orders.reduce((sum, o) => sum + (o.grandTotal || o.totalAmount || 0), 0);

    const userData = {
      ...user,
      isActive: user.isVerified,
      orders,
      totalSpent,
    };

    res.json({ success: true, user: userData });

  } catch (err) {
    console.error("getUserById error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch user details" });
  }
};

/* ============================
   GET USER PAYMENTS
============================ */
exports.fetchUserPayments = async (req, res) => {
  try {
    const { id } = req.params;

    const payments = await prisma.payment.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, payments });
  } catch (err) {
    console.error("fetchUserPayments error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch payments" });
  }
};

/* ============================
   GRANT TOOL ACCESS (ADMIN)
============================ */
exports.grantToolAccess = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const { category, tool, planType } = req.body;
    
    // Calculate expiry based on plan
    const { calculateExpirationDate } = require("../config/pricing");
    const expiryDate = calculateExpirationDate(planType);

    const subscription = await prisma.toolSubscription.upsert({
      where: {
        userId_category_tool: { userId, category, tool }
      },
      update: {
        planType,
        validUntil: expiryDate
      },
      create: {
        userId,
        category,
        tool,
        planType,
        validUntil: expiryDate
      }
    });

    res.json({ success: true, message: "Access granted successfully", subscription });
  } catch (err) {
    console.error("grantToolAccess error:", err);
    res.status(500).json({ success: false, message: "Failed to grant access" });
  }
};

/* ============================
   EDIT / REVOKE TOOL ACCESS (ADMIN)
============================ */
exports.editToolAccess = async (req, res) => {
  try {
    const { subId } = req.params;
    const { planType, validUntil } = req.body;

    // If validUntil is expressly set to null, it means lifetime.
    // Otherwise fallback to whatever the payload says.
    // If we want to revoke, we can just delete it, or set validUntil to past date.
    
    if (planType === "revoke") {
      await prisma.toolSubscription.delete({ where: { id: subId } });
      return res.json({ success: true, message: "Access revoked" });
    }

    const { calculateExpirationDate } = require("../config/pricing");
    let expiryDate = validUntil !== undefined ? validUntil : calculateExpirationDate(planType);

    const subscription = await prisma.toolSubscription.update({
      where: { id: subId },
      data: { planType, validUntil: expiryDate }
    });

    res.json({ success: true, message: "Access updated successfully", subscription });
  } catch (err) {
    console.error("editToolAccess error:", err);
    res.status(500).json({ success: false, message: "Failed to modify access" });
  }
};
/* ============================
   TOGGLE USER STATUS (ACTIVE/BLOCKED)
============================ */
exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Use isVerified as proxy for isActive until schema fully updates
    const updated = await prisma.user.update({
      where: { id },
      data: { isVerified: !user.isVerified }
    });

    res.json({ success: true, isActive: updated.isVerified });
  } catch (err) {
    console.error("toggleUserStatus error:", err);
    res.status(500).json({ error: "Failed to toggle status" });
  }
};
