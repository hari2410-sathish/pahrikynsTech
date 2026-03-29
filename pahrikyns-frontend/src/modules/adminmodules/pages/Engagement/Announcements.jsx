import React, { useEffect, useState } from "react";
import { 
  Box, Typography, Button, Paper, Grid, Card, 
  CardContent, IconButton, Chip, Dialog, DialogTitle, 
  DialogContent, DialogActions, TextField, CircularProgress, 
  Alert, MenuItem, Stack, Divider, Tooltip
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

/* ICONS */
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import SensorsTwoToneIcon from "@mui/icons-material/SensorsTwoTone";
import FlashOnTwoToneIcon from "@mui/icons-material/FlashOnTwoTone";
import PriorityHighTwoToneIcon from "@mui/icons-material/PriorityHighTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import PowerSettingsNewTwoToneIcon from "@mui/icons-material/PowerSettingsNewTwoTone";
import { useNavigate } from "react-router-dom";

export default function Announcements() {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", message: "", type: "info", expiresAt: "" });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/announcements/all`, { withCredentials: true });
      setAnnouncements(res.data);
    } catch (err) {
      setError("COMMUNICATION ERROR: FAILED TO FETCH SIGNAL FEED");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/announcements/create`, formData, { withCredentials: true });
      setOpen(false);
      setFormData({ title: "", message: "", type: "info", expiresAt: "" });
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/announcements/toggle/${id}`, {}, { withCredentials: true });
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/announcements/${id}`, { withCredentials: true });
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <Box sx={{ p: 10, textAlign: "center" }}>
        <CircularProgress sx={{ color: "#00eaff" }} size={60} thickness={4} />
        <Typography variant="caption" sx={{ display: "block", mt: 3, fontWeight: 900, color: "#00eaff", letterSpacing: 4 }}>SYNCHRONIZING BROADCASTS...</Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER SECTION */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={6} flexWrap="wrap" gap={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
           <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
              <ArrowBackTwoToneIcon />
           </IconButton>
           <Box>
              <Typography sx={{ color: "#00eaff", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
                TRANSMISSION HUB · GLOBAL SIGNALS
              </Typography>
              <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                Broadcast Center
              </Typography>
           </Box>
        </Stack>
        <Button 
          variant="contained" 
          startIcon={<AddCircleTwoToneIcon />}
          onClick={() => setOpen(true)}
          sx={actionButtonStyle}
        >
          INITIATE BROADCAST
        </Button>
      </Stack>

      {error && <Alert severity="error" variant="filled" sx={{ mb: 4, borderRadius: "16px", fontWeight: 800 }}>{error}</Alert>}

      <Grid container spacing={4}>
        <AnimatePresence>
            {announcements.map((a, idx) => (
              <Grid item xs={12} md={6} key={a.id} component={motion.div} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}>
                <Card sx={glassCardStyle}>
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                      <Chip 
                        label={a.type.toUpperCase()} 
                        size="small" 
                        icon={getTypeIcon(a.type)}
                        sx={getTypeChipStyle(a.type)}
                      />
                      <Stack direction="row" spacing={1}>
                        <Tooltip title={a.isActive ? "ONLINE" : "OFFLINE"}>
                            <IconButton size="small" onClick={() => handleToggle(a.id)} sx={{ color: a.isActive ? "#22c55e" : "rgba(255,255,255,0.2)", transition: "all 0.3s" }}>
                                <PowerSettingsNewTwoToneIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="TERMINATE SIGNAL">
                            <IconButton size="small" onClick={() => handleDelete(a.id)} sx={{ color: "#f43f5e", opacity: 0.3, "&:hover": { opacity: 1, bgcolor: "rgba(244, 63, 94, 0.1)" } }}>
                                <DeleteSweepTwoToneIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>
                    <Typography variant="h6" fontWeight={900} color="white" gutterBottom sx={{ letterSpacing: "-0.01em" }}>{a.title}</Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 3, lineHeight: 1.6, minHeight: 48, fontWeight: 500 }}>{a.message}</Typography>
                    
                    <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.05)" }} />
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <SensorsTwoToneIcon sx={{ fontSize: 14, color: "#00eaff" }} />
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 1 }}>
                          LIFESPAN: {a.expiresAt ? new Date(a.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase() : "PERMANENT"}
                        </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </AnimatePresence>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm" PaperProps={{ sx: dialogStyle }}>
        <DialogTitle sx={{ p: 4, pb: 2 }}>
            <Typography sx={{ color: "#00eaff", fontWeight: 900, fontSize: 10, letterSpacing: 3, mb: 1 }}>NEW SIGNAL MANIFEST</Typography>
            <Typography variant="h4" fontWeight={900} sx={{ color: "white", letterSpacing: "-0.02em" }}>Initiate Broadcast</Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={4} sx={{ mt: 1 }}>
            <Box>
                <Typography sx={dialogLabelStyle}>BROADCAST TITLE</Typography>
                <TextField fullWidth value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="E.G. CORE SYSTEM RECALIBRATION..." sx={fieldStyle} />
            </Box>
            
            <Box>
                <Typography sx={dialogLabelStyle}>SIGNAL MESSAGE</Typography>
                <TextField fullWidth multiline rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="ENTER DETAILED TRANSMISSION..." sx={fieldStyle} />
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography sx={dialogLabelStyle}>PRIORITY LAYER</Typography>
                    <TextField select fullWidth value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} sx={selectStyle}>
                        <MenuItem value="info">INFO PROTOCOL</MenuItem>
                        <MenuItem value="warning">CRITICAL ALERT</MenuItem>
                        <MenuItem value="success">OPTIMAL STATUS</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={dialogLabelStyle}>EXPIRATION CYCLE</Typography>
                    <TextField type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.expiresAt} onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })} sx={fieldStyle} />
                </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 2, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Button onClick={() => setOpen(false)} sx={{ fontWeight: 900, color: "rgba(255,255,255,0.4)" }}>ABORT</Button>
          <Button variant="contained" onClick={handleSave} disabled={!formData.title || !formData.message} sx={actionButtonStyle}>
            TRANSMIT BROADCAST
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

const getTypeIcon = (type) => {
    if (type === "warning") return <PriorityHighTwoToneIcon sx={{ fontSize: "14px !important" }} />;
    if (type === "success") return <CheckCircleTwoToneIcon sx={{ fontSize: "14px !important" }} />;
    return <SensorsTwoToneIcon sx={{ fontSize: "14px !important" }} />;
};

const getTypeChipStyle = (type) => {
    const isWarn = type === "warning";
    const isSucc = type === "success";
    const color = isWarn ? "#f59e0b" : isSucc ? "#22c55e" : "#00eaff";
    
    return {
        bgcolor: `rgba(${isWarn ? '245,158,11' : isSucc ? '34,197,94' : '0,234,255'}, 0.05)`,
        color: color,
        fontWeight: 900,
        fontSize: 10,
        borderRadius: "8px",
        px: 1,
        border: `1px solid rgba(${isWarn ? '245,158,11' : isSucc ? '34,197,94' : '0,234,255'}, 0.15)`,
        letterSpacing: 2,
        boxShadow: `0 0 15px rgba(${isWarn ? '245,158,11' : isSucc ? '34,197,94' : '0,234,255'}, 0.05)`
    };
};

const glassCardStyle = {
    borderRadius: 8, 
    border: "1px solid rgba(255,255,255,0.06)", 
    background: "rgba(255,255,255,0.01)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    transition: "all 0.4s",
    "&:hover": { transform: "translateY(-8px)", borderColor: "rgba(0, 234, 255, 0.2)", boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }
};

const actionButtonStyle = {
    borderRadius: "14px", 
    px: 4, 
    fontWeight: 900, 
    bgcolor: "#00eaff", 
    color: "#000", 
    "&:hover": { bgcolor: "#00c4d6", transform: "translateY(-2px)" },
    boxShadow: "0 10px 25px rgba(0, 234, 255, 0.2)",
    transition: "all 0.3s",
    textTransform: "uppercase",
    letterSpacing: 1
};

const dialogStyle = {
    bgcolor: "rgba(2, 6, 23, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.08)",
    backgroundImage: "none"
};

const dialogLabelStyle = {
    fontSize: 10,
    fontWeight: 900,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: 2,
    mb: 1.5,
    textTransform: "uppercase"
};

const fieldStyle = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "14px",
        color: "white",
        bgcolor: "rgba(255,255,255,0.02)",
        fontSize: 14,
        fontWeight: 700,
        "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
        "&.Mui-focused fieldset": { borderColor: "#00eaff" }
    },
    "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.15)", opacity: 1 }
};

const selectStyle = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "14px",
        color: "white",
        bgcolor: "rgba(255,255,255,0.02)",
        "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
        "&.Mui-focused fieldset": { borderColor: "#00eaff" }
    },
    "& .MuiSvgIcon-root": { color: "#00eaff" }
};
