import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stack, 
  IconButton,
  Grid,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ICONS */
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import FingerprintTwoToneIcon from "@mui/icons-material/FingerprintTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";

export default function AddCustomer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call for now
    setTimeout(() => {
        setLoading(false);
        setToast({ open: true, msg: "OPERATIVE INITIALIZED SUCCESSFULLY", type: "success" });
        setTimeout(() => navigate(-1), 1000);
    }, 1500);
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
                REGISTRATION SECTOR · ASSET CREATION
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Operative Registration
            </Typography>
        </Box>
      </Stack>

      <Paper sx={paperStyle}>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant="caption" sx={labelStyle}>
                    <FingerprintTwoToneIcon sx={{ fontSize: 14 }} /> IDENTIFICATION CORE
                </Typography>
                <TextField fullWidth placeholder="LEGAL FULL NAME..." sx={fieldStyle} required />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={labelStyle}>
                    <MailTwoToneIcon sx={{ fontSize: 14 }} /> COMMUNICATION SIGNAL (EMAIL)
                </Typography>
                <TextField type="email" fullWidth placeholder="OPERATIVE@NETWORK.SYS" sx={fieldStyle} required />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={labelStyle}>
                    <PhoneTwoToneIcon sx={{ fontSize: 14 }} /> TRANSMISSION FREQUENCY (PHONE)
                </Typography>
                <TextField fullWidth placeholder="+1 [000] 000-0000" sx={fieldStyle} />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 4 }}>
                <Stack direction="row" spacing={3} justifyContent="flex-end">
                    <Button 
                        variant="outlined" 
                        onClick={() => navigate(-1)}
                        startIcon={<CancelTwoToneIcon />}
                        sx={abortButtonStyle}
                    >
                        ABORT SIGNAL
                    </Button>
                    <Button 
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddTwoToneIcon />}
                        sx={initializeButtonStyle}
                    >
                        {loading ? "INITIALIZING..." : "INITIALIZE ASSET"}
                    </Button>
                </Stack>
              </Grid>
            </Grid>
        </form>
      </Paper>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.type} variant="filled" sx={alertStyle}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}

const paperStyle = {
  p: 6,
  borderRadius: 8,
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
  backgroundImage: "none",
  maxWidth: 900,
  boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
};

const labelStyle = { 
  fontWeight: 800, 
  color: "rgba(255,255,255,0.3)", 
  letterSpacing: 2, 
  display: "flex", 
  alignItems: "center", 
  gap: 1.5, 
  mb: 2 
};

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    color: "white",
    bgcolor: "rgba(255,255,255,0.01)",
    fontSize: 14,
    fontWeight: 700,
    transition: "all 0.3s",
    "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
    "&.Mui-focused": { bgcolor: "rgba(0, 234, 255, 0.02)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.15)" }
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.15)", opacity: 1, letterSpacing: 1 }
};

const abortButtonStyle = { 
    borderRadius: "14px", 
    color: "rgba(255,255,255,0.5)", 
    borderColor: "rgba(255,255,255,0.1)", 
    fontWeight: 900, 
    px: 4,
    "&:hover": { borderColor: "rgba(255,255,255,0.2)", bgcolor: "rgba(255,255,255,0.02)" }
};

const initializeButtonStyle = { 
    bgcolor: "#00eaff", 
    color: "black", 
    fontWeight: 900, 
    px: 6, 
    py: 1.5,
    borderRadius: "14px", 
    "&:hover": { bgcolor: "#00c4d6", transform: "translateY(-2px)" },
    boxShadow: "0 15px 30px rgba(0, 234, 255, 0.2)",
    transition: "all 0.3s"
};

const alertStyle = { borderRadius: "12px", fontWeight: 900, bgcolor: "#22c55e" };
