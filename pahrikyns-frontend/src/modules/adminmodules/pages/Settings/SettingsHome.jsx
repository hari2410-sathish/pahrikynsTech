import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Avatar,
  IconButton,
  Tooltip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ICONS */
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import RocketLaunchTwoToneIcon from "@mui/icons-material/RocketLaunchTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";
import HistoryTwoToneIcon from "@mui/icons-material/HistoryTwoTone";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";

export default function SettingsHome() {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      title: "OPERATIVE IDENTITY",
      description: "Recalibrate your digital signature, transmission channel, and overseer metadata.",
      icon: <PersonTwoToneIcon sx={{ fontSize: 32 }} />,
      path: "/admin/settings/profile",
      color: "#00eaff",
      delay: 0.1
    },
    {
      title: "SECURITY VAULT",
      description: "Maintain administrative integrity by rotating access keys and cipher sequences.",
      icon: <ShieldTwoToneIcon sx={{ fontSize: 32 }} />,
      path: "/admin/settings/password",
      color: "#f59e0b",
      delay: 0.2
    },
    {
      title: "ACCESS PROTOCOLS",
      description: "Manage 2FA shields, authorized sessions, and historical access signals.",
      icon: <SecurityTwoToneIcon sx={{ fontSize: 32 }} />,
      path: "/admin/settings/2fa",
      color: "#7b3fe4",
      delay: 0.3
    }
  ];

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER SECTION */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1.5, display: "block" }}>
            CONFIGURATION HUB · SYSTEM PROTOCOLS
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
           <SettingsTwoToneIcon sx={{ color: "#00eaff", fontSize: 40 }} />
           <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
             Protocol Terminal
           </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: "white", opacity: 0.4, maxWidth: 650, fontWeight: 500 }}>
          Precision control over your neural administrative environment and strategic security posture.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {settingsOptions.map((option) => (
          <Grid item xs={12} md={4} key={option.title}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: option.delay, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(option.path)}
              style={{ cursor: "pointer" }}
            >
              <Paper sx={{ 
                p: 6, 
                height: "100%",
                borderRadius: 8, 
                background: "rgba(255,255,255,0.02)", 
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "hidden",
                backgroundImage: `linear-gradient(135deg, ${option.color}05 0%, transparent 100%)`,
                transition: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderColor: option.color,
                  boxShadow: `0 40px 100px ${option.color}15`
                }
              }}>
                <Box sx={{ 
                  position: "absolute", 
                  top: -20, 
                  right: -20, 
                  opacity: 0.05, 
                  transform: "rotate(-15deg)"
                }}>
                  {React.cloneElement(option.icon, { sx: { fontSize: 160, color: option.color } })}
                </Box>

                <Avatar 
                  sx={{ 
                    width: 72, 
                    height: 72, 
                    mb: 5, 
                    bgcolor: "rgba(255,255,255,0.03)", 
                    color: option.color,
                    border: `1px solid ${option.color}22`,
                    boxShadow: `0 0 20px ${option.color}11`
                  }}
                >
                  {React.cloneElement(option.icon, { sx: { fontSize: 32 } })}
                </Avatar>

                <Typography variant="h5" fontWeight={900} mb={2} sx={{ color: "white", letterSpacing: "-0.01em" }}>
                  {option.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "white", opacity: 0.4, lineHeight: 1.8, fontWeight: 500, mb: 4 }}>
                  {option.description}
                </Typography>
                
                <Stack direction="row" spacing={1.5} alignItems="center">
                   <Typography variant="caption" sx={{ fontWeight: 900, color: option.color, letterSpacing: 2, display: "flex", alignItems: "center", gap: 1 }}>
                     INITIALIZE MODULE <BoltTwoToneIcon sx={{ fontSize: 16 }} />
                   </Typography>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ADDITIONAL SECTORS */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 2, display: "block", mb: 3 }}>AUXILIARY CHANNELS</Typography>
        <Grid container spacing={3}>
            {["SYSTEM LOGS", "SESSION ARCHIVE", "ENCRYPTION STATUS"].map((text, i) => (
                <Grid item xs={12} sm={4} key={text}>
                    <Paper 
                        onClick={() => navigate(i === 0 ? "/admin/settings/security-logs" : (i === 1 ? "/admin/settings/sessions" : "/admin/settings/2fa"))}
                        sx={{ 
                            p: 3, 
                            borderRadius: 4, 
                            bgcolor: "rgba(255,255,255,0.02)", 
                            border: "1px solid rgba(255,255,255,0.05)",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            cursor: "pointer",
                            transition: "0.3s",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.04)", borderColor: "#00eaff" }
                        }}
                    >
                        <HistoryTwoToneIcon sx={{ color: "rgba(255,255,255,0.2)" }} />
                        <Typography sx={{ fontWeight: 800, color: "white", fontSize: 12, letterSpacing: 1 }}>{text}</Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
