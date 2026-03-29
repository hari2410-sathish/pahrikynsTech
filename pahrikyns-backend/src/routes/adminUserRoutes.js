const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    fetchUserPayments,
    grantToolAccess,
    editToolAccess,
    toggleUserStatus
} = require("../controllers/adminUserController");

// Get all users
router.get("/", getUsers);

// Get single user
router.get("/:id", getUserById);

// Get user payments
router.get("/:id/payments", fetchUserPayments);

// Manage User Status
router.patch("/:id/status", toggleUserStatus);

// Manage User Tool Access
router.post("/:id/tools", grantToolAccess);
router.put("/tools/:subId", editToolAccess);

module.exports = router;
