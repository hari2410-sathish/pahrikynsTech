import API from "./axios";

/* ---------------------------------------------------------
   USER REGISTER + LOGIN + OTP
---------------------------------------------------------- */

// ✅ USER REGISTER
export function registerUser(data) {
  return API.post("/auth/user/register", data);
}

// ✅ SEND OTP
export function sendOTP(data) {
  return API.post("/auth/user/send-otp", data);
}

// ✅ VERIFY OTP
export function verifyOTP(data) {
  return API.post("/auth/user/verify-otp", data);
}

// ✅ RESEND OTP
export function resendOTP(data) {
  return API.post("/auth/user/resend-otp", data);
}

// ✅ LOGIN
export function loginUser(data) {
  return API.post("/auth/user/login", data);
}

// ✅ GOOGLE LOGIN
export function googleLogin(token) {
  return API.post("/auth/user/google-login", { token });
}

/* ---------------------------------------------------------
   CURRENT USER  🔥 MOST IMPORTANT
---------------------------------------------------------- */

export function getCurrentUser() {
  return API.get("/auth/user/me");
}

export function getDashboardStats() {
  return API.get("/auth/user/dashboard-stats");
}


/* ---------------------------------------------------------
   PASSWORD RESET (only if backend exists)
---------------------------------------------------------- */

export function requestPasswordReset(data) {
  return API.post("/auth/user/request-reset", data);
}

export function resetPassword(data) {
  return API.post("/auth/user/reset-password", data);
}

// ✅ UPDATE PROFILE
export function updateProfile(data) {
  return API.put("/auth/user/update-profile", data);
}

// ✅ CHANGE PASSWORD
export function changePassword(data) {
  return API.put("/auth/user/change-password", data);
}

// ✅ UPDATE PROGRESS
export function updateProgress(data) {
  return API.post("/auth/user/course-progress", data);
}
