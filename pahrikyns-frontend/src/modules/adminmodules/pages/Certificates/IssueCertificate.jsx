import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Autocomplete,
  Divider,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";

import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import FingerprintTwoToneIcon from "@mui/icons-material/FingerprintTwoTone";
import GavelTwoToneIcon from "@mui/icons-material/GavelTwoTone";

import { useNavigate } from "react-router-dom";

import { fetchAllUsers } from "../../Adminapi/users";
import { fetchAdminCourses } from "../../Adminapi/coursesAdmin";
import { issueCertificate } from "../../Adminapi/certificatesAdmin";
import { motion } from "framer-motion";

export default function IssueCertificate() {
  const navigate = useNavigate();

  // ================= STATE =================
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [certificateCode, setCertificateCode] = useState("");
  const [remarks, setRemarks] = useState("");

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ================= LOAD USERS =================
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoadingUsers(true);
        const data = await fetchAllUsers();
        setUsers(data.users || data || []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  // ================= LOAD COURSES =================
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoadingCourses(true);
        const data = await fetchAdminCourses();
        setCourses(data.courses || data || []);
      } catch (err) {
        console.error(err);
        showToast("Failed to load courses");
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);

  // ================= AUTO CERTIFICATE CODE =================
  useEffect(() => {
    if (selectedUser && selectedCourse) {
      const code = `CERT-${selectedUser._id?.slice(-5)}-${selectedCourse._id?.slice(
        -5
      )}-${Date.now().toString().slice(-4)}`;
      setCertificateCode(code.toUpperCase());
    }
  }, [selectedUser, selectedCourse]);

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!selectedUser || !selectedCourse) {
      showToast("Select user & course");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        userId: selectedUser._id || selectedUser.id,
        courseId: selectedCourse._id || selectedCourse.id,
        certificateCode,
        remarks,
      };

      await issueCertificate(payload);

      showToast("Certificate issued successfully!", "success");

      setTimeout(() => {
        navigate("/admin/certificates");
      }, 1200);
    } catch (err) {
      console.error(err);
      showToast("Failed to issue certificate");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= RENDER =================
  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* ================= HEADER ================= */}
       <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate("/admin/certificates")} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                AUTHORIZATION SECTOR · ASSET ISSUANCE
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Credential Authorization
            </Typography>
        </Box>
      </Stack>

      <Paper
        sx={{
          p: 6,
          borderRadius: 8,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          backgroundImage: "none",
          maxWidth: 1000,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Grid container spacing={6}>
          {/* ================= USER ================= */}
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1, display: "block", mb: 2 }}>OPERATIVE SELECTION</Typography>

            {loadingUsers ? (
              <CircularProgress size={26} sx={{ color: "#00eaff" }} />
            ) : (
              <Autocomplete
                options={users}
                getOptionLabel={(u) => `${u.name || u.fullName || "User"} - ${u.email}`}
                value={selectedUser}
                onChange={(e, val) => setSelectedUser(val)}
                sx={autoCompleteStyle}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    placeholder="SEARCH OPERATIVE BY NAME / EMAIL..." 
                    InputProps={{ ...params.InputProps, startAdornment: <PersonTwoToneIcon sx={{ color: "#00eaff", mr: 1, opacity: 0.6 }} /> }}
                  />
                )}
              />
            )}
          </Grid>

          {/* ================= COURSE ================= */}
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1, display: "block", mb: 2 }}>ACADEMIC PARAMETER</Typography>

            {loadingCourses ? (
              <CircularProgress size={26} sx={{ color: "#00eaff" }} />
            ) : (
              <Autocomplete
                options={courses}
                getOptionLabel={(c) => c.title || c.name || "Course"}
                value={selectedCourse}
                onChange={(e, val) => setSelectedCourse(val)}
                sx={autoCompleteStyle}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    placeholder="SELECT ACADEMIC ASSET..." 
                    InputProps={{ ...params.InputProps, startAdornment: <SchoolTwoToneIcon sx={{ color: "#00eaff", mr: 1, opacity: 0.6 }} /> }}
                  />
                )}
              />
            )}
          </Grid>

          {/* ================= CERT CODE ================= */}
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1, display: "block", mb: 2 }}>ASSIGNED FINGERPRINT</Typography>
            <TextField
              value={certificateCode}
              fullWidth
              disabled
              placeholder="AUTO GENERATED"
              sx={fieldStyle}
              InputProps={{ startAdornment: <FingerprintTwoToneIcon sx={{ color: "#00eaff", mr: 1, opacity: 0.3 }} /> }}
            />
          </Grid>

          {/* ================= STATUS ================= */}
          <Grid item xs={12} md={6}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1, display: "block", mb: 2 }}>INITIAL ASSET STATE</Typography>
            <TextField 
                value="ISSUED" 
                fullWidth 
                disabled 
                sx={fieldStyle}
                InputProps={{ startAdornment: <VerifiedUserTwoToneIcon sx={{ color: "#22c55e", mr: 1, opacity: 0.4 }} /> }}
            />
          </Grid>

          {/* ================= REMARKS ================= */}
          <Grid item xs={12}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1, display: "block", mb: 2 }}>AUTHORIZATION REMARKS</Typography>
            <TextField
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              placeholder="TRAINER NOTES / ADMINISTRATIVE AUTHORIZATION DETAILS..."
              sx={fieldStyle}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.05)" }} />

        {/* ================= PREVIEW ================= */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="caption" sx={{ fontWeight: 900, color: "#00eaff", letterSpacing: 2, display: "block", mb: 3 }}>HOLOGRAPHIC AUTHORIZATION PREVIEW</Typography>

          <Paper
            sx={{
              p: 4,
              background: "rgba(0, 234, 255, 0.02)",
              border: "1px dashed rgba(0, 234, 255, 0.3)",
              borderRadius: 4,
              boxShadow: "0 0 40px rgba(0, 234, 255, 0.05)"
            }}
          >
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 1 }}>OPERATIVE</Typography>
                    <Typography variant="body1" fontWeight={900} sx={{ color: selectedUser ? "white" : "rgba(255,255,255,0.1)" }}>
                        {selectedUser ? (selectedUser.name || selectedUser.fullName) : "AWAITING SELECTION..."}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 1 }}>ACADEMIC ASSET</Typography>
                    <Typography variant="body1" fontWeight={900} sx={{ color: selectedCourse ? "white" : "rgba(255,255,255,0.1)" }}>
                        {selectedCourse ? (selectedCourse.title || selectedCourse.name) : "AWAITING SELECTION..."}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 1 }}>FINGERPRINT</Typography>
                    <Typography sx={{ fontFamily: 'monospace', fontWeight: 900, color: certificateCode ? "#00eaff" : "rgba(255,255,255,0.1)", fontSize: 13 }}>
                        {certificateCode || "NOT_GENERATED"}
                    </Typography>
                </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* ================= ACTIONS ================= */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/certificates")}
            sx={{ borderRadius: "12px", color: "white", borderColor: "rgba(255,255,255,0.1)", fontWeight: 900, px: 4 }}
          >
            CANCEL SIGNAL
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting || !selectedUser || !selectedCourse}
            sx={{ 
                bgcolor: "#00eaff", 
                color: "black", 
                fontWeight: 900, 
                px: 6, 
                py: 1.5,
                borderRadius: "12px", 
                "&:hover": { bgcolor: "#00c4d6" },
                "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.1)" },
                boxShadow: "0 0 20px rgba(0, 234, 255, 0.2)",
                animation: selectedUser && selectedCourse ? "pulse-btn 2s infinite" : "none"
            }}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <GavelTwoToneIcon />}
          >
            {submitting ? "AUTHORIZING..." : "EXECUTE ISSUANCE"}
          </Button>
        </Stack>
      </Paper>

      {/* ================= TOAST ================= */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type} variant="filled" sx={{ borderRadius: "12px", fontWeight: 800 }}>{toast.msg}</Alert>
      </Snackbar>

      <style>
        {`
          @keyframes pulse-btn {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 234, 255, 0.4); }
            70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(0, 234, 255, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 234, 255, 0); }
          }
        `}
      </style>
    </Box>
  );
}

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    color: "white",
    bgcolor: "rgba(255,255,255,0.03)",
    fontSize: 14,
    fontWeight: 700,
    transition: "all 0.3s",
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&.Mui-focused": { bgcolor: "rgba(0, 234, 255, 0.05)", boxShadow: "0 0 20px rgba(0, 234, 255, 0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&.Mui-disabled": { bgcolor: "rgba(0, 0, 0, 0.2)", opacity: 0.8 },
    "&.Mui-disabled fieldset": { borderColor: "rgba(255,255,255,0.03)" },
    "&.Mui-disabled .MuiOutlinedInput-input": { WebkitTextFillColor: "rgba(255,255,255,0.5)", fontFamily: "monospace" }
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1, fontWeight: 700 }
};

const autoCompleteStyle = {
  ...fieldStyle,
  "& .MuiAutocomplete-endAdornment .MuiIconButton-root": { color: "rgba(255,255,255,0.3)" }
};
