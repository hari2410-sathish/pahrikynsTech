// src/layouts/UserDashboard.jsx
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/Userdashboard/LeftSidebar";
import TopBar from "../components/Userdashboard/TopBar";

/* ======================================================
   USER DASHBOARD LAYOUT
   ====================================================== */

export default function UserDashboard() {
  const sidebarWidth = 240;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={styles.root}>
      {/* SIDEBAR */}
      {!isMobile && (
        <Box sx={styles.sidebar}>
          <LeftSidebar />
        </Box>
      )}

      {/* MAIN CONTENT */}
      <Box
        sx={{
          ...styles.main,
          ml: isMobile ? 0 : `${sidebarWidth}px`,
        }}
      >
        <TopBar />
        
        <Box sx={{ mt: 3, position: "relative" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    width: "100%",
    maxWidth: "100vw",
    overflowX: "hidden",
    background: "linear-gradient(180deg,#0a0f1d,#000)",
  },
  sidebar: {
    width: 240,
    position: "fixed",
    height: "100vh",
    left: 0,
    top: 0,
    zIndex: 1000,
  },
  main: {
    flexGrow: 1,
    maxWidth: "100%",
    overflowX: "hidden",
    p: { xs: 2, md: 4 },
    transition: "margin 0.3s ease",
  },
};
