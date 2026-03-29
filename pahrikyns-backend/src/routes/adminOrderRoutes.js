const express = require("express");
const router = express.Router();

const adminAuth = require("../middlewares/adminAuthMiddleware");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  emailInvoice,
} = require("../controllers/adminOrderController");

const {
  createOrderPayment,
  verifyOrderPayment,
} = require("../controllers/adminOrderPaymentController");

// 🔐 Admin protection
router.use(adminAuth);

/* =========================
   ORDERS
========================= */
router.post("/", createOrder);
router.get("/stats", require("../controllers/adminOrderController").getOrderStats);
router.get("/", getOrders);

/* ⚠️ Specific routes FIRST */
router.post("/verify-payment", verifyOrderPayment);

/* =========================
   SINGLE ORDER
========================= */
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", cancelOrder);

/* =========================
   PAYMENTS
========================= */
router.post("/:id/pay", createOrderPayment);

/* =========================
   INVOICE
========================= */
router.post("/:id/email-invoice", emailInvoice);

module.exports = router;
