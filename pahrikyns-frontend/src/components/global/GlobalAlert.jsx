import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

export default function GlobalAlert() {
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    fetchActive();
  }, []);

  const fetchActive = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/announcements/active`);
      if (res.data && res.data.length > 0) {
        setAnnouncements(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch announcements", err);
    }
  };

  if (announcements.length === 0) return null;

  const current = announcements[0]; // Show the most recent one

  const getStyles = () => {
    switch (current.type) {
      case "warning": return { bg: "#f59e0b", color: "#fff", icon: <WarningIcon /> };
      case "success": return { bg: "#10b981", color: "#fff", icon: <CheckCircleIcon /> };
      default: return { bg: "linear-gradient(90deg, #00eaff, #0066ff)", color: "#000", icon: <InfoIcon /> };
    }
  };

  const styles = getStyles();

  return (
    <Collapse in={open}>
      <Box 
        sx={{ 
          background: styles.bg, 
          color: styles.color,
          py: 1, 
          px: 2, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          position: "relative",
          zIndex: 2000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, maxWidth: "md" }}>
          <Box sx={{ display: "flex", opacity: 0.9 }}>{styles.icon}</Box>
          <Typography variant="body2" sx={{ fontWeight: 800, textAlign: "center", letterSpacing: 0.5 }}>
            {current.title}: {current.message}
          </Typography>
        </Box>
        <IconButton 
          size="small" 
          onClick={() => setOpen(false)}
          sx={{ position: "absolute", right: 8, color: "inherit", opacity: 0.7, "&:hover": { opacity: 1 } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Collapse>
  );
}
