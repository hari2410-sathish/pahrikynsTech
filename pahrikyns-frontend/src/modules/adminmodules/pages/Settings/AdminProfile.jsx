import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Alert,
  Snackbar,
  Stack,
  CircularProgress,
  Chip,
  IconButton
} from "@mui/material";
import { updateAdminProfile } from "../../Adminapi/admin";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import FingerprintTwoToneIcon from "@mui/icons-material/FingerprintTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";

export default function AdminProfile() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("adminData") || "{}"));
  const [formData, setFormData] = useState({
    name: admin.name || "",
    email: admin.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateAdminProfile(formData);
      setMessage({ type: "success", text: "IDENTITY MANIFESTATION UPDATED" });
      const updatedAdmin = { ...admin, ...res.admin };
      setAdmin(updatedAdmin);
      localStorage.setItem("adminData", JSON.stringify(updatedAdmin));
    } catch (err) {
      setMessage({ type: "error", text: "IDENTITY SYNCHRONIZATION FAILED" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                IDENTITY HUB · OPERATIVE PROFILE
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Identity Core
            </Typography>
        </Box>
      </Stack>

      <Grid container spacing={4} sx={{ maxWidth: 1200 }}>
        {/* LEFT: IDENTITY CORE CARD */}
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <Paper sx={{ 
              p: 6, 
              borderRadius: 8, 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.06)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              backgroundImage: "none",
              boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
            }}>
              <Box sx={{ position: "absolute", top: 24, right: 24 }}>
                <VerifiedUserTwoToneIcon sx={{ color: "#22c55e", fontSize: 24, filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.4))" }} />
              </Box>

              <Box sx={{ display: "inline-block", position: "relative", mb: 4 }}>
                <Avatar 
                  sx={{ 
                      width: 140, 
                      height: 140, 
                      bgcolor: "rgba(0, 234, 255, 0.05)", 
                      border: "2px solid rgba(0, 234, 255, 0.2)",
                      boxShadow: "0 0 30px rgba(0, 234, 255, 0.2)",
                      fontSize: 56, 
                      fontWeight: 900, 
                      color: "#00eaff" 
                  }}
                >
                  {admin?.name?.[0]?.toUpperCase()}
                </Avatar>
                <Chip 
                  label="ROOT" 
                  size="small"
                  sx={{ 
                      position: "absolute", 
                      bottom: -8, 
                      left: "50%", 
                      transform: "translateX(-50%)", 
                      bgcolor: "#00eaff", 
                      color: "black", 
                      fontWeight: 900, 
                      fontSize: 10,
                      px: 1,
                      border: "2px solid #000" 
                  }}
                />
              </Box>

              <Typography variant="h5" fontWeight={900} sx={{ color: "white", mb: 1 }}>{admin.name || "GUEST OPERATIVE"}</Typography>
              <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, mb: 5, display: "block", letterSpacing: 2 }}>SYSTEM OVERSEER</Typography>
              
              <Divider sx={{ mb: 4, borderColor: "rgba(255,255,255,0.06)" }} />

              <Stack spacing={4} alignItems="flex-start">
                 <Box sx={{ display: "flex", gap: 2.5, alignItems: "center" }}>
                   <Box sx={{ width: 40, height: 40, borderRadius: 3, bgcolor: "rgba(0, 234, 255, 0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <EmailTwoToneIcon sx={{ color: "#00eaff", fontSize: 20 }} />
                   </Box>
                   <Box textAlign="left">
                     <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 1 }}>PRIMARY SIGNAL</Typography>
                     <Typography sx={{ color: "white", fontWeight: 700, fontSize: 13 }}>{admin.email}</Typography>
                   </Box>
                 </Box>

                 <Box sx={{ display: "flex", gap: 2.5, alignItems: "center" }}>
                   <Box sx={{ width: 40, height: 40, borderRadius: 3, bgcolor: "rgba(0, 234, 255, 0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <BadgeTwoToneIcon sx={{ color: "#00eaff", fontSize: 20 }} />
                   </Box>
                   <Box textAlign="left">
                     <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 1 }}>DESIGNATION</Typography>
                     <Typography sx={{ color: "white", fontWeight: 700, fontSize: 13 }}>Chief Administrator</Typography>
                   </Box>
                 </Box>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>

        {/* RIGHT: MANIFEST UPDATER */}
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <Paper sx={{ p: 6, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", height: "100%", backgroundImage: "none", boxShadow: "0 40px 100px rgba(0,0,0,0.4)" }}>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 2, display: "block", mb: 1 }}>CORE SETTINGS</Typography>
              <Typography variant="h5" fontWeight={900} mb={6} sx={{ color: "white" }}>Manifest Calibration</Typography>
              
              <form onSubmit={handleUpdate}>
                <Stack spacing={5}>
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>DISPLAY SIGNATURE</Typography>
                        <TextField 
                            fullWidth 
                            variant="outlined"
                            placeholder="OPERATIVE NAME..."
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            sx={fieldStyle}
                        />
                    </Box>

                    <Box>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>COMMUNICATION SIGNAL</Typography>
                            <Chip label="SECURE" size="small" sx={{ bgcolor: "rgba(34, 197, 94, 0.1)", color: "#22c55e", fontWeight: 900, fontSize: 8 }} />
                        </Stack>
                        <TextField 
                            fullWidth 
                            variant="outlined"
                            placeholder="EMAIL TRANSMISSION..."
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            sx={fieldStyle}
                            helperText="Primary identifier for system handshakes and critical alerts."
                            FormHelperTextProps={{ sx: { opacity: 0.3, color: "white", fontWeight: 700, fontStyle: "italic", mt: 1.5 } }}
                        />
                    </Box>
                  
                  <Box sx={{ mt: 4 }}>
                    <Button 
                      type="submit" 
                      variant="contained" 
                      size="large" 
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <BoltTwoToneIcon />}
                      sx={{ 
                        borderRadius: "14px", 
                        py: 2, 
                        px: 8, 
                        fontWeight: 900, 
                        bgcolor: "#00eaff",
                        color: "black",
                        "&:hover": { bgcolor: "#00c4d6" },
                        boxShadow: "0 20px 40px rgba(0, 234, 255, 0.2)",
                        letterSpacing: 1.5
                      }}
                    >
                      {loading ? "SYNCHRONIZING..." : "EXECUTE UPDATE"}
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      <Snackbar 
        open={!!message.text} 
        autoHideDuration={4000} 
        onClose={() => setMessage({ ...message, text: "" })}
      >
        <Alert severity={message.type || "info"} sx={{ width: "100%", borderRadius: 4, fontWeight: 900, bgcolor: message.type === "success" ? "#22c55e" : "#f43f5e", color: "white" }} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    color: "white",
    bgcolor: "rgba(255,255,255,0.02)",
    fontWeight: 700,
    fontSize: 15,
    transition: "0.3s",
    "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
    "&.Mui-focused": { bgcolor: "rgba(0, 234, 255, 0.05)", boxShadow: "0 0 20px rgba(0, 234, 255, 0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.15)" }
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1 }
};
