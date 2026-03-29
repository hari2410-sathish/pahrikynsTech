import React, { useEffect, useState } from "react";
import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    Stack, 
    Avatar, 
    IconButton,
    CircularProgress,
    Chip
} from "@mui/material";
import {
  fetchTwoFAStatus,
  enableTwoFA,
  disableTwoFA,
} from "../../Adminapi/settingsAdmin";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import GppBadTwoToneIcon from "@mui/icons-material/GppBadTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";

export default function TwoFA() {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  async function loadStatus() {
    try {
      setLoading(true);
      const d = await fetchTwoFAStatus();
      setEnabled(d.enabled);
    } finally {
      setLoading(false);
    }
  }

  const toggle = async () => {
    setToggling(true);
    try {
        if (enabled) {
          await disableTwoFA();
        } else {
          await enableTwoFA();
        }
        const d = await fetchTwoFAStatus();
        setEnabled(d.enabled);
    } finally {
        setToggling(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress size={30} sx={{ color: "#00eaff" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#7b3fe4", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                ACCESS SHIELD · TWO-FACTOR AUTHENTICATION
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Shield Protocol
            </Typography>
        </Box>
      </Stack>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Paper 
          sx={{ 
            p: 6, 
            maxWidth: 600,
            borderRadius: 8, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
            backgroundImage: "linear-gradient(135deg, rgba(123, 63, 228, 0.02) 0%, transparent 100%)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
          }}
        >
          <Box sx={{ position: "absolute", top: -30, right: -30, opacity: 0.03 }}>
            <VerifiedUserTwoToneIcon sx={{ fontSize: 240, color: "#7b3fe4" }} />
          </Box>

          <Stack direction="row" spacing={3} alignItems="center" mb={6}>
             <Box sx={{ 
                 width: 80, 
                 height: 80, 
                 borderRadius: "24px", 
                 bgcolor: enabled ? "rgba(34, 197, 94, 0.05)" : "rgba(244, 63, 94, 0.05)", 
                 display: "flex", 
                 alignItems: "center", 
                 justifyContent: "center", 
                 color: enabled ? "#22c55e" : "#f43f5e", 
                 border: `1px solid ${enabled ? "rgba(34, 197, 94, 0.2)" : "rgba(244, 63, 94, 0.2)"}`,
                 boxShadow: `0 0 30px ${enabled ? "rgba(34, 197, 94, 0.1)" : "rgba(244, 63, 94, 0.1)"}`
             }}>
                {enabled ? <ShieldTwoToneIcon sx={{ fontSize: 40 }} /> : <GppBadTwoToneIcon sx={{ fontSize: 40 }} />}
             </Box>
             <Box>
                <Typography variant="h5" fontWeight={900} sx={{ color: "white", mb: 0.5 }}>
                    SHIELD: {enabled ? "ENGAGED" : "OFFLINE"}
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 800, letterSpacing: 1 }}>
                    {enabled ? "MULTI-FACTOR SECURE CHANNEL ACTIVE" : "AUTHENTICATION VULNERABILITY DETECTED"}
                </Typography>
             </Box>
          </Stack>

          <Typography variant="body2" sx={{ color: "white", opacity: 0.4, lineHeight: 1.8, mb: 6, maxWidth: 450 }}>
            Reinforce your administrative access with a cryptographic second-layer challenge. 
            Once engaged, every handshake will require an expiring token from your authorized mobile device.
          </Typography>

          <Box>
             <Button
                variant="contained"
                disabled={toggling}
                onClick={toggle}
                startIcon={toggling ? <CircularProgress size={18} color="inherit" /> : <BoltTwoToneIcon />}
                sx={{ 
                    borderRadius: "14px", 
                    py: 2, 
                    px: 6, 
                    fontWeight: 900, 
                    bgcolor: enabled ? "rgba(244, 63, 94, 1)" : "rgba(34, 197, 94, 1)",
                    color: "white",
                    "&:hover": { bgcolor: enabled ? "#e11d48" : "#16a34a" },
                    boxShadow: `0 20px 40px ${enabled ? "rgba(244, 63, 94, 0.2)" : "rgba(34, 197, 94, 0.2)"}`,
                    letterSpacing: 1.5,
                    border: "none"
                }}
             >
                {toggling ? "PROCESSING..." : (enabled ? "TERMINATE SHIELD" : "INITIALIZE SHIELD")}
             </Button>
          </Box>

          {enabled && (
             <Box sx={{ mt: 6, p: 3, borderRadius: 4, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(0, 234, 255, 0.05)" }}>
                 <Stack direction="row" spacing={2} alignItems="center">
                    <VerifiedUserTwoToneIcon sx={{ color: "#00eaff", fontSize: 18 }} />
                    <Typography variant="caption" sx={{ color: "white", opacity: 0.4, fontWeight: 700 }}>
                        Your identity is protected by Neural Layer-2 Encryption.
                    </Typography>
                 </Stack>
             </Box>
          )}
        </Paper>
      </motion.div>
    </Box>
  );
}
