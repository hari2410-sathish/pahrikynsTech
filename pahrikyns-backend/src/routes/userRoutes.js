const express = require("express");
const router = express.Router();

/* -------------------- AUTH (Login / Register / Google) -------------------- */
const {
  registerUser,
  loginUser,
  verifyOTP,
  googleLogin,
} = require("../controllers/userAuthController");

/* -------------------- USER PROFILE -------------------- */
const {
  getCurrentUser,
  updateProfile,
  changePassword,
  getDashboardStats,
} = require("../controllers/userProfileController");

/* -------------------- USER COURSES + SUBSCRIPTION + PROGRESS -------------------- */
const {
  getMyCourses,
  getCourseProgress,
  updateCourseProgress,
  subscriptionStatus,
} = require("../controllers/userCourseController");

/* -------------------- OTP (SEND / RESEND) -------------------- */
const {
  sendUserOTP,
  resendUserOTP,
} = require("../controllers/userOtpController");

/* -------------------- MIDDLEWARE -------------------- */
const auth = require("../middlewares/authMiddleware");

/* =========================
   PUBLIC ROUTES
========================= */
const { handleValidationErrors, validationRules, validators } = require("../middlewares/validateRequest");

// ✅ REGISTER → SEND OTP
router.post(
  "/register",
  [
    validators.body("name").notEmpty().withMessage("Name is required"),
    validationRules.email(),
    validationRules.password(6),
    handleValidationErrors,
  ],
  registerUser
);

// ✅ LOGIN
router.post(
  "/login",
  [
    validationRules.email(),
    validators.body("password").notEmpty().withMessage("Password is required"),
    handleValidationErrors,
  ],
  loginUser
);

// ✅ SEND OTP
router.post(
  "/send-otp",
  [
    validationRules.email(),
    handleValidationErrors
  ],
  sendUserOTP
);

// ✅ VERIFY OTP
router.post(
  "/verify-otp",
  [
    validationRules.email(),
    validators.body("otp").notEmpty().withMessage("OTP is required"),
    handleValidationErrors
  ],
  verifyOTP
);

// ✅ RESEND OTP
router.post(
  "/resend-otp",
  [
    validationRules.email(),
    handleValidationErrors
  ],
  resendUserOTP
);

// ✅ GOOGLE LOGIN
router.post(
  "/google-login",
  [
    validators.body("token").notEmpty().withMessage("Google token missing"),
    handleValidationErrors
  ],
  googleLogin
);

/* =========================
   PROTECTED ROUTES (JWT)
========================= */

// ✅ CURRENT USER
router.get("/me", auth, getCurrentUser);

// ✅ ALL USERS (For Chat)
const { getAllUsers } = require("../controllers/userProfileController");
router.get("/users", auth, getAllUsers);

// ✅ PROFILE
router.put("/update-profile", auth, updateProfile);
router.put("/change-password", auth, changePassword);
router.get("/dashboard-stats", auth, getDashboardStats);

// ✅ SUBSCRIPTION STATUS (FOR UserProtectedRoute)
router.get("/subscription-status", auth, subscriptionStatus);

// ✅ MY COURSES
router.get("/my-courses", auth, getMyCourses);

// ✅ COURSE PROGRESS
router.get("/course-progress/:courseId", auth, getCourseProgress);
router.post("/course-progress", auth, updateCourseProgress);

module.exports = router;
