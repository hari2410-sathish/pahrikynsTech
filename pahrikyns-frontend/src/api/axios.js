import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ IMPORTANT
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Auto attach token
API.interceptors.request.use((config) => {
  const url = config.url || "";

  // ===============================
  // ADMIN ROUTES → ADMIN TOKEN
  // ===============================
  if (url.startsWith("/admin") || url.includes("/admin")) {
    const adminToken = localStorage.getItem("ADMIN_TOKEN");
    if (adminToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  }

  // ===============================
  // USER ROUTES → USER TOKEN
  // ===============================
  if (
    url.startsWith("/auth/user") ||
    url.startsWith("/payments") ||
    url.startsWith("/courses") ||
    url.startsWith("/api/notifications")
  ) {
    const userToken = localStorage.getItem("USER_TOKEN");
    if (userToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
  }

  return config;
});

// 🌐 Global Response Interceptor
API.interceptors.response.use(
  (response) => {
    // If the backend wrapped data in { success, data, message }, we might still return response
    // to avoid breaking existing code, but existing code expects response.data
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized: Auto-logout user
        localStorage.removeItem("USER_TOKEN");
        localStorage.removeItem("ADMIN_TOKEN");
        
        // Optionally redirect to login page if we're not already there
        const currentPath = window.location.pathname;
        if (currentPath.startsWith("/admin")) {
          if (currentPath !== "/admin/login") {
            window.location.href = "/admin/login";
          }
        } else {
          if (currentPath !== "/login") {
            window.location.href = "/login";
          }
        }
      }
      
      // Standardize the error object returned to the components
      const errorMessage = error.response.data?.message || "An unexpected error occurred.";
      error.message = errorMessage;
    }
    return Promise.reject(error);
  }
);

export default API;
