import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Snackbar,
  Stack,
  CircularProgress,
  IconButton,
  InputAdornment,
  Chip
} from "@mui/material";
import { changeAdminPassword } from "../../Adminapi/admin";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";
import KeyTwoToneIcon from "@mui/icons-material/KeyTwoTone";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage({ type: "error", text: "KEY MISMATCH: DATA ALIGNMENT ERROR" });
    }

    setLoading(true);
    try {
      await changeAdminPassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setMessage({ type: "success", text: "SECURITY CREDENTIALS RECALIBRATED" });
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "ACCESS DENIED: INVALID KEY" });
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
            <Typography variant="caption" sx={{ color: "#f59e0b", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                SECURITY VAULT · CREDENTIAL ROTATION
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Cipher Shift
            </Typography>
        </Box>
      </Stack>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Paper 
          sx={{ 
            p: 6, 
            maxWidth: 700,
            borderRadius: 8, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
            overflow: "hidden",
            backgroundImage: "linear-gradient(135deg, rgba(245, 158, 11, 0.02) 0%, transparent 100%)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
          }}
        >
          <Box sx={{ position: "absolute", top: -30, right: -30, opacity: 0.03 }}>
            <SecurityTwoToneIcon sx={{ fontSize: 240, color: "#f59e0b" }} />
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" mb={6}>
             <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "rgba(245, 158, 11, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                <KeyTwoToneIcon fontSize="medium" />
             </Box>
             <Box>
                <Typography variant="h6" fontWeight={900} sx={{ color: "white" }}>Recalibration Protocol</Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 800 }}>MANDATORY CYCLIC ROTATION</Typography>
             </Box>
          </Stack>

          <form onSubmit={handleUpdate}>
            <Stack spacing={5}>
              <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>CURRENT ACCESS KEY</Typography>
                  <TextField 
                    type={showPass ? "text" : "password"}
                    fullWidth 
                    variant="outlined"
                    placeholder="ENTER EXISTING KEY..."
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    required
                    sx={fieldStyle}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPass(!showPass)} sx={{ color: "rgba(255,255,255,0.3)" }}>
                            {showPass ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
              </Box>

              <Box sx={{ height: 1, bgcolor: "rgba(255,255,255,0.05)", mx: -6 }} />

              <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>NEW ACCESS KEY</Typography>
                      <TextField 
                        type={showPass ? "text" : "password"}
                        fullWidth 
                        variant="outlined"
                        placeholder="MIN 8 CHARS..."
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        required
                        sx={fieldStyle}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>KEY CONFIRMATION</Typography>
                      <TextField 
                        type={showPass ? "text" : "password"}
                        fullWidth 
                        variant="outlined"
                        placeholder="RE-ENTER NEW KEY..."
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        sx={fieldStyle}
                      />
                  </Grid>
              </Grid>
              
              <Box sx={{ mt: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ShieldTwoToneIcon />}
                  sx={{ 
                    borderRadius: "14px", 
                    py: 2, 
                    px: 8, 
                    fontWeight: 900, 
                    bgcolor: "#f59e0b",
                    color: "black",
                    "&:hover": { bgcolor: "#d97706" },
                    boxShadow: "0 20px 40px rgba(245, 158, 11, 0.2)",
                    letterSpacing: 1.5
                  }}
                >
                  {loading ? "AUTHORIZING..." : "EXECUTE ROTATION"}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </motion.div>

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
    "&.Mui-focused": { bgcolor: "rgba(245, 158, 11, 0.05)", boxShadow: "0 0 20px rgba(245, 158, 11, 0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#f59e0b" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.15)" }
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.15)", opacity: 1 }
};
