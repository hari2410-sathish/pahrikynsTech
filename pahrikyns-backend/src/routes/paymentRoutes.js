const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
// const adminAuth = require("../middlewares/adminAuthMiddleware"); 
// ↑ irundha use pannu, illa na auth use pannalam

const {
  createPayment,
  verifyPayment,
  getMyPayments,
  getAllPayments,
  refundPayment,
  getPaymentById,
} = require("../controllers/paymentController");

const {
  createToolPayment,
  verifyToolPayment
} = require("../controllers/toolPaymentController");

/* =====================================================
   USER ROUTES
===================================================== */

// 🔹 Create course payment + Razorpay order
router.post("/course/create", auth, createPayment);

// 🔹 Verify Razorpay payment (after success)
router.post("/course/verify", auth, verifyPayment);

// 🔹 Create TOOL payment + Razorpay order
router.post("/tool/create", auth, createToolPayment);

// 🔹 Verify TOOL Razorpay payment
router.post("/tool/verify", auth, verifyToolPayment);

// 🔹 Get logged-in user's payments
router.get("/my", auth, getMyPayments);

/* =====================================================
   ADMIN ROUTES
===================================================== */

// 🔹 Get all payments (admin dashboard)
router.get("/admin", auth, getAllPayments);

// 🔹 Get single payment details
router.get("/admin/:id", auth, getPaymentById);

// 🔹 Refund a payment
router.post("/admin/refund/:id", auth, refundPayment);

module.exports = router;
