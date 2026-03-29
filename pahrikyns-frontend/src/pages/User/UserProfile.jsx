import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  Divider,
  Grid,
  Chip,
  Alert,
  CircularProgress
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { updateProfile } from "../../api/auth";
import { motion } from "framer-motion";

/* ICONS */
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarsIcon from "@mui/icons-material/Stars";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function UserProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setMsg({ type: "", text: "" });
      const res = await updateProfile({ name: form.name });
      updateUser(res.data.user);
      setMsg({ type: "success", text: "Profile manifestation complete." });
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Failed to update identity record." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" mb={6}>
        <VerifiedIcon sx={{ color: "#00eaff" }} />
        <Box>
          <Typography variant="h3" fontWeight={900} sx={{ background: "linear-gradient(90deg, #fff, #666)", WebkitBackgroundClip: "text", color: "transparent" }}>
            My Identity
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.5 }}>Manage your digital presence and achievements.</Typography>
        </Box>
      </Stack>

      <Grid container spacing={4}>
        {/* LEFT: FORM */}
        <Grid item xs={12} md={7}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Paper sx={{ p: 5, borderRadius: 5, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}>
              {msg.text && <Alert severity={msg.type === "success" ? "success" : "error"} variant="filled" sx={{ mb: 4, borderRadius: 2 }}>{msg.text}</Alert>}

              <Stack spacing={4}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  sx={inputStyle}
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  value={form.email}
                  sx={inputStyle}
                  disabled
                  helperText="Registered email cannot be changed."
                />

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleUpdate}
                  disabled={loading}
                  sx={{
                    py: 1.8,
                    borderRadius: 3,
                    background: "linear-gradient(90deg, #00eaff, #7b3fe4)",
                    fontWeight: 900,
                    boxShadow: "0 10px 30px rgba(0, 234, 255, 0.2)",
                    "&:hover": { background: "linear-gradient(90deg, #00c4d6, #6934c9)" }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "SAFEGUARD CHANGES"}
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>

        {/* RIGHT: STATS & BADGES */}
        <Grid item xs={12} md={5}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Paper sx={{ p: 5, borderRadius: 5, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
              <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
                <Avatar
                  sx={{ width: 120, height: 120, bgcolor: "rgba(0,234,255,0.1)", border: "2px solid #00eaff", fontSize: 40, fontWeight: 900, color: "#00eaff" }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
                <Chip
                  icon={<EmojiEventsIcon sx={{ fontSize: "14px !important", color: "white" }} />}
                  label={`LVL ${user?.level || 1}`}
                  sx={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)", bgcolor: "#7b3fe4", color: "white", fontWeight: 900, fontSize: 11, border: "2px solid #000" }}
                />
              </Box>

              <Typography variant="h5" fontWeight={900} gutterBottom>{user?.name}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.5, mb: 4 }}>High-End Digital Explorer</Typography>

              <Divider sx={{ mb: 4, borderColor: "rgba(255,255,255,0.1)" }} />

              <Stack spacing={3}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ opacity: 0.4, fontWeight: 700 }}>RECOGNITION POINTS</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <StarsIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
                    <Typography variant="h6" fontWeight={900}>{user?.points || 0}</Typography>
                  </Stack>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ opacity: 0.4, fontWeight: 700 }}>ACCOUNT STATUS</Typography>
                  <Chip label="VERIFIED" size="small" sx={{ bgcolor: "rgba(34,197,94,0.1)", color: "#22c55e", fontWeight: 900, borderRadius: 1, border: "1px solid rgba(34,197,94,0.3)" }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ opacity: 0.4, fontWeight: 700 }}>JOINED ECOSYSTEM</Typography>
                  <Typography variant="body2" fontWeight={700}>{new Date(user?.createdAt).toLocaleDateString()}</Typography>
                </Box>
              </Stack>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    color: "white",
    bgcolor: "rgba(255,255,255,0.03)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" }
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#00eaff" }
};
