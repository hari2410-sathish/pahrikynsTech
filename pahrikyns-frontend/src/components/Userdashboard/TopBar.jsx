import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Badge,
  InputBase,
  useMediaQuery,
  useTheme,
  Stack,
  Avatar,
  Tooltip,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationDrawer from "./NotificationDrawer";

export default function TopBar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const firstName = user?.name?.split(" ")[0] || "Learner";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/dashboard/courses?search=${searchQuery}`);
    }
  };

  return (
    <Box 
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        mb: 4,
        px: { xs: 1, md: 0 }
      }}
    >
      {/* LEFT: GREETING */}
      <Box>
        <Typography 
          sx={{ 
            fontSize: 14, 
            color: "rgba(255,255,255,0.4)", 
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            mb: 0.5
          }}
        >
          {greeting}
        </Typography>
        <Typography sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 900, color: "#fff" }}>
          Welcome, <span style={{ color: "#00eaff" }}>{firstName}</span>
        </Typography>
      </Box>

      {/* RIGHT: SEARCH & TOOLS */}
      <Stack direction="row" spacing={2} alignItems="center">
        {!isMobile && (
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: 3,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              width: 300,
              transition: "0.3s",
              "&:focus-within": {
                background: "rgba(255,255,255,0.08)",
                borderColor: "#00eaff"
              }
            }}
          >
            <SearchIcon sx={{ color: "rgba(255,255,255,0.3)", mr: 1, fontSize: 20 }} />
            <InputBase
              placeholder="Search courses..."
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              sx={{ color: "#fff", fontSize: 14 }}
            />
          </Paper>
        )}

        <Tooltip title="Notifications">
          <IconButton 
            onClick={() => setOpenDrawer(true)}
            sx={{ 
              p: 1.5,
              bgcolor: "rgba(255,255,255,0.04)", 
              border: "1px solid rgba(255,255,255,0.08)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
            }}
          >
            <Badge variant="dot" color="primary">
              <NotificationsIcon sx={{ color: "#fff" }} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Your Profile">
          <IconButton 
            onClick={() => navigate("/dashboard/profile")}
            sx={{ p: 0, border: "2px solid #00eaff" }}
          >
            <Avatar 
              src={user?.avatar} 
              sx={{ width: 44, height: 44 }}
            >
              {firstName[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Stack>

      {/* HIDDEN DRAWER */}
      <NotificationDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
    </Box>
  );
}
