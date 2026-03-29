import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../modules/adminmodules/context/AdminAuthContext";
import { Box, CircularProgress } from "@mui/material";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // =========================================
  // ✅ 1. STILL LOADING AUTH STATE
  // =========================================
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // =========================================
  // ✅ BYPASS FOR QA TESTING
  // =========================================
  return children;
}
