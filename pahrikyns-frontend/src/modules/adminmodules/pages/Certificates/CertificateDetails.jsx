import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Stack,
  Avatar,
} from "@mui/material";

import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import PrintTwoToneIcon from "@mui/icons-material/PrintTwoTone";
import LinkTwoToneIcon from "@mui/icons-material/LinkTwoTone";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import FingerprintTwoToneIcon from "@mui/icons-material/FingerprintTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";

import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCertificateById,
  revokeCertificate
} from "../../Adminapi/certificatesAdmin";

import { generateCertificatePDF } 
  from "../../../../utils/certificates/generateCertificatePDF";

import CertificateViewer 
  from "../../components/certificates/CertificateViewer";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificateDetails() {
  const { certId } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ---------------- LOAD CERTIFICATE ----------------
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCertificateById(certId);
        setCertificate(data.certificate || data || null);
      } catch (err) {
        console.error("Failed to load certificate", err);
        showToast("Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [certId]);

  const verifyUrl = useMemo(() => {
    if (!certificate) return "";
    const code = certificate.code || certificate.publicId || certId;
    return `${window.location.origin}/verify/${code}`;
  }, [certificate, certId]);

  const statusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "issued" || s === "active") return "#00eaff";
    if (s === "revoked") return "#f43f5e";
    if (s === "expired") return "#f59e0b";
    return "rgba(255,255,255,0.4)";
  };

  const formatDate = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
    }
  };

  // ---------------- ACTIONS ----------------
  const handleDownload = async () => {
    if (!certificate) return;
    try {
      await generateCertificatePDF(certificate);
    } catch (err) {
      console.error("Download failed", err);
      showToast("Download failed – check PDF generator setup");
    }
  };

  const handlePrint = () => {
    if (verifyUrl) {
      window.open(verifyUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(verifyUrl);
      showToast("Verify link copied", "success");
    } catch {
      showToast("Copy failed");
    }
  };

  const handleRevoke = async () => {
    if (!certificate) return;
    const ok = window.confirm(
      "CRITICAL: Authorize permanent revocation of academic credential?"
    );
    if (!ok) return;

    try {
      setRevoking(true);
      const updated = await revokeCertificate(certificate._id || certId);
      if (updated.certificate) {
        setCertificate(updated.certificate);
      } else {
        setCertificate({
          ...(certificate || {}),
          status: "revoked",
        });
      }
      showToast("CREDENTIAL REVOKED", "success");
    } catch (err) {
      console.error("Revoke failed", err);
      showToast("Failed to revoke certificate");
    } finally {
      setRevoking(false);
    }
  };

  // ---------------- RENDER ----------------
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress size={60} sx={{ color: "#00eaff" }} />
      </Box>
    );
  }

  if (!certificate) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" sx={{ opacity: 0.5 }}>CREDENTIAL NOT FOUND</Typography>
        <Button onClick={() => navigate("/admin/certificates")} sx={{ mt: 2, color: "#00eaff" }}>RETURN TO ARCHIVE</Button>
      </Box>
    );
  }

  const user = certificate.user || certificate.student || {};
  const course = certificate.course || {};

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <Box mb={6} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={3}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <IconButton
            onClick={() => navigate("/admin/certificates")}
            sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>

          <Box>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                DIAGNOSTIC SECTOR · ASSET [{ (certificate.code || certId).slice(0, 8).toUpperCase() }]
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Credential Diagnostics
            </Typography>
          </Box>
        </Box>

        {/* ACTION BUTTONS */}
        <Stack direction="row" spacing={1.5}>
          <Tooltip title="COPY VERIFY LINK">
            <IconButton onClick={handleCopyLink} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
              <LinkTwoToneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="PRINT VIEW">
            <IconButton onClick={handlePrint} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
              <PrintTwoToneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="DOWNLOAD PDF">
            <IconButton onClick={handleDownload} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
              <DownloadTwoToneIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="LINKEDIN RECOGNITION">
            <IconButton
              onClick={() => {
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(verifyUrl)}`;
                window.open(url, "_blank");
              }}
              sx={{ bgcolor: "rgba(0, 119, 181, 0.1)", color: "#0077b5", border: "1px solid rgba(0, 119, 181, 0.2)", "&:hover": { bgcolor: "rgba(0, 119, 181, 0.2)" } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>

          <Button
            variant="contained"
            color="error"
            startIcon={revoking ? <CircularProgress size={16} color="inherit" /> : <BlockTwoToneIcon />}
            onClick={handleRevoke}
            disabled={revoking || certificate.status === "revoked"}
            sx={{ borderRadius: "12px", fontWeight: 900, px: 3, ml: 1 }}
          >
            {revoking ? "EXECUTING..." : "REVOKE ASSET"}
          </Button>
        </Stack>
      </Box>

      {/* MAIN CONTENT */}
      <Grid container spacing={4}>
        {/* LEFT: NEURAL DATA POINTS */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ 
            p: 4, mb: 4, 
            borderRadius: 6, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none"
          }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 2, display: "block", mb: 3 }}>RECIPIENT IDENTITY</Typography>
            <Stack direction="row" spacing={3} alignItems="center" mb={4}>
                <Avatar sx={{ 
                    width: 64, 
                    height: 64, 
                    bgcolor: 'rgba(0, 234, 255, 0.05)', 
                    border: "2px solid rgba(0, 234, 255, 0.2)",
                    color: "#00eaff"
                  }}>
                  {user.name?.[0] || <PersonTwoToneIcon />}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={900} sx={{ color: "white" }}>{user.name || user.fullName || "GUEST OPERATIVE"}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.4, color: "white" }}>{user.email || "NO_EMAIL_RECORD"}</Typography>
                </Box>
            </Stack>
            {user.phone && (
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>COMMUNICATION SIGNAL</Typography>
                <Typography variant="body2" fontWeight={800} sx={{ color: "white" }}>{user.phone}</Typography>
              </Box>
            )}
          </Paper>

          <Paper sx={{ 
            p: 4, mb: 4, 
            borderRadius: 6, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none"
          }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 2, display: "block", mb: 3 }}>ACADEMIC PROTOCOL</Typography>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>ASSET TITLE</Typography>
                    <Typography variant="body1" fontWeight={900} sx={{ color: "white" }}>{course.title || course.name || "UNSPECIFIED COURSE"}</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>CATEGORY</Typography>
                        <Typography variant="body2" fontWeight={700} sx={{ color: "#00eaff" }}>{course.category || "UNIDENTIFIED"}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>PERFORMANCE GRADE</Typography>
                        <Typography variant="body2" fontWeight={700} sx={{ color: "white" }}>{certificate.grade || "N/A"}</Typography>
                    </Grid>
                </Grid>
            </Stack>
          </Paper>

          <Paper sx={{ 
            p: 4, 
            borderRadius: 6, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none"
          }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 2, display: "block", mb: 3 }}>FINGERPRINT METADATA</Typography>
            <Stack spacing={2.5}>
                <Box>
                    <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>VALIDATION STATE</Typography>
                    <Chip
                        size="small"
                        label={certificate.status?.toUpperCase() || "UNKNOWN"}
                        sx={{ 
                            bgcolor: `${statusColor(certificate.status)}11`, 
                            color: statusColor(certificate.status),
                            fontWeight: 900,
                            fontSize: 10,
                            border: `1px solid ${statusColor(certificate.status)}33`,
                            letterSpacing: 0.5
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>AUTHORIZATION CODE</Typography>
                    <Typography sx={{ fontFamily: 'monospace', fontWeight: 900, color: "#00eaff", fontSize: 13 }}>{certificate.code || "NOT_ASSIGNED"}</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>ISSUED AT</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "white", fontSize: 11 }}>{formatDate(certificate.issuedAt)}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>EXPIRATORY SIGNAL</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "white", fontSize: 11 }}>{formatDate(certificate.expiresAt)}</Typography>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, display: "block", mb: 0.5 }}>UVERIFY ENCRYPTION LINK</Typography>
                    <Typography sx={{ fontSize: 10, opacity: 0.5, color: "white", wordBreak: "break-all", fontFamily: "monospace" }}>{verifyUrl}</Typography>
                </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* RIGHT: OPTICAL VERIFICATION PREVIEW */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 6, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                <FingerprintTwoToneIcon sx={{ color: "#00eaff", fontSize: 24 }} />
                <Typography variant="h6" fontWeight={900} sx={{ color: "white" }}>Optical Verification Preview</Typography>
            </Stack>

            <Box
              sx={{
                flex: 1,
                borderRadius: 4,
                overflow: "hidden",
                bgcolor: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 0 40px rgba(0, 0, 0, 0.5)",
                minHeight: 500
              }}
            >
              <CertificateViewer certificate={certificate} />
            </Box>
            
            <Typography variant="caption" sx={{ mt: 3, opacity: 0.4, textAlign: "center", color: "white", fontStyle: "italic" }}>
                SECURE RENDER · AES-256 VERIFIED SIGNAL
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type} variant="filled" sx={{ borderRadius: "12px", fontWeight: 800 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
