import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Divider,
  IconButton,
  Avatar,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ReplayTwoToneIcon from "@mui/icons-material/ReplayTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import FingerprintTwoToneIcon from "@mui/icons-material/FingerprintTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";

import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPaymentById,
  refundPayment,
} from "../../Adminapi/paymentsAdmin";
import { motion } from "framer-motion";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0, currency = "INR") =>
  `${currency === "INR" ? "₹" : ""}${Number(amount || 0).toLocaleString(
    "en-IN"
  )}`;

export default function PaymentDetails() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refundLoading, setRefundLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "success",
  });

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  /* ================= LOAD PAYMENT ================= */
  const loadPayment = async () => {
    try {
      setLoading(true);
      const res = await fetchPaymentById(paymentId);
      setPayment(res.payment || res);
    } catch (err) {
      console.error(err);
      showToast("Failed to load payment", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayment();
    // eslint-disable-next-line
  }, [paymentId]);

  /* ================= REFUND ================= */
  const handleRefund = async () => {
    if (!payment) return;

    if (payment.status !== "PAID" && payment.status !== "SUCCESS") {
      showToast("Only PAID payments can be refunded", "info");
      return;
    }

    if (!window.confirm("CRITICAL: Authorize Capital Reversal?")) return;

    try {
      setRefundLoading(true);
      await refundPayment(payment.id);
      showToast("REVERSAL EXECUTED");
      loadPayment();
    } catch (err) {
      console.error(err);
      showToast("Reversal Failed", "error");
    } finally {
      setRefundLoading(false);
    }
  };

  /* ================= STATUS CHIP ================= */
  const renderStatus = (status) => {
    const s = String(status || "").toLowerCase();

    if (s === "paid" || s === "success")
      return (
        <Chip
          icon={<CheckCircleTwoToneIcon sx={{ fontSize: "16px !important" }} />}
          label="STABLE (PAID)"
          sx={{ bgcolor: "rgba(34, 197, 94, 0.1)", color: "#22c55e", fontWeight: 900, border: "1px solid rgba(34, 197, 94, 0.2)" }}
        />
      );

    if (s === "refunded")
      return (
        <Chip
          icon={<ReplayTwoToneIcon sx={{ fontSize: "16px !important" }} />}
          label="REVERSED (REFUNDED)"
          sx={{ bgcolor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", fontWeight: 900, border: "1px solid rgba(245, 158, 11, 0.2)" }}
        />
      );

    if (s === "failed")
      return (
        <Chip
          icon={<ErrorTwoToneIcon sx={{ fontSize: "16px !important" }} />}
          label="FAILED (BREACH)"
          sx={{ bgcolor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", fontWeight: 900, border: "1px solid rgba(239, 68, 68, 0.2)" }}
        />
      );

    return <Chip label={status || "UNKNOWN"} variant="outlined" sx={{ fontWeight: 900 }} />;
  };

  /* ================= STATES ================= */
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress size={60} sx={{ color: "#a855f7" }} />
      </Box>
    );
  }

  if (!payment) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" sx={{ opacity: 0.5 }}>NODE NOT FOUND</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2, color: "#a855f7" }}>RETURN TO HUB</Button>
      </Box>
    );
  }

  const {
    id,
    amount,
    currency,
    status,
    orderId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    createdAt,
    user,
    course,
    order
  } = payment;

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#a855f7", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
              DIAGNOSTIC SECTOR · NODE [{id.slice(0, 8).toUpperCase()}]
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Transaction Intelligence
            </Typography>
        </Box>
      </Stack>

      <Grid container spacing={4}>
        {/* LEFT COLUMN: CORE DIAGNOSTICS */}
        <Grid item xs={12} md={8}>
          {/* SUMMARY HERO */}
          <Paper sx={{ 
            p: 6, mb: 4, 
            borderRadius: 8, 
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none",
            position: "relative",
            overflow: "hidden"
          }}>
             <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                 <Chip label="LIVE SYNC" size="small" icon={<Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#22c55e", mr: 1, animation: "pulse 2s infinite" }} />} sx={{ fontWeight: 900, fontSize: 10, bgcolor: "rgba(34, 197, 94, 0.05)", color: "#22c55e", border: "1px solid rgba(34, 197, 94, 0.2)" }} />
             </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 2, display: "block", mb: 1 }}>CORE CAPITAL FLUX</Typography>
                <Typography variant="h1" fontWeight={900} sx={{ color: "white", textShadow: "0 0 30px rgba(168, 85, 247, 0.2)" }}>
                  {formatCurrency(amount, currency)}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 2, display: "block", mb: 2 }}>SYSTEM STATE</Typography>
                {renderStatus(status)}
              </Box>
            </Stack>

            <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.05)" }} />

            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, letterSpacing: 1, display: "block", mb: 1 }}>TIMESTAMP</Typography>
                <Typography variant="body1" fontWeight={700} sx={{ color: "white" }}>{new Date(createdAt).toLocaleString().toUpperCase()}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, letterSpacing: 1, display: "block", mb: 1 }}>INTERNAL ID</Typography>
                <Typography sx={{ fontFamily: 'monospace', fontWeight: 900, color: "#a855f7", fontSize: 13 }}>{id.toUpperCase()}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, letterSpacing: 1, display: "block", mb: 1 }}>ASSET PROTOCOL</Typography>
                <Typography variant="body1" fontWeight={700} sx={{ color: "white" }}>
                  {course ? `ACADEMIC: ${course.title?.toUpperCase()}` : 
                   payment.toolName ? `TOOL: ${payment.toolName.toUpperCase()} (${payment.planType})` :
                   order ? "COMMERCE TRANSACTION" : "GENERAL SIGNAL"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* GATEWAY SIGNATURES */}
          <Paper sx={{ 
            p: 4, 
            borderRadius: 6, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none"
          }}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
                <SecurityTwoToneIcon sx={{ color: "#22c55e", fontSize: 24 }} />
                <Typography variant="h6" fontWeight={900} sx={{ color: "white" }}>Gateway Encrypted Signatures</Typography>
            </Stack>
            <Table size="small">
              <TableBody>
                <TableRow sx={rowStyle}>
                  <TableCell sx={labelStyle}>EXTERNAL PAYMENT SIGNATURE</TableCell>
                  <TableCell sx={valueStyle}>{razorpayPaymentId || "NOT_ASSIGNED"}</TableCell>
                </TableRow>
                <TableRow sx={rowStyle}>
                  <TableCell sx={labelStyle}>EXTERNAL ORDER SIGNATURE</TableCell>
                  <TableCell sx={valueStyle}>{razorpayOrderId || "NOT_ASSIGNED"}</TableCell>
                </TableRow>
                <TableRow sx={rowStyle}>
                  <TableCell sx={labelStyle}>INTERNAL ORDER BINDING</TableCell>
                  <TableCell sx={valueStyle}>{orderId || "UNBOUND"}</TableCell>
                </TableRow>
                <TableRow sx={rowStyle}>
                  <TableCell sx={labelStyle}>VERIFICATION KEY</TableCell>
                  <TableCell sx={{ ...valueStyle, wordBreak: "break-all", fontSize: 11, maxWidth: 300 }}>
                    {razorpaySignature || "NO_SIGNATURE_DATA"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* RIGHT COLUMN: IDENTITY & ACTIONS */}
        <Grid item xs={12} md={4}>
          {/* USER IDENTITY */}
          <Paper sx={{ 
            p: 4, mb: 4, 
            borderRadius: 6, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none"
          }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 2, display: "block", mb: 3 }}>IDENTITY PACKET</Typography>
            <Stack direction="row" spacing={3} alignItems="center" mb={4}>
              <Avatar sx={{ 
                  width: 64, 
                  height: 64, 
                  bgcolor: 'rgba(168, 85, 247, 0.1)', 
                  border: "2px solid rgba(168, 85, 247, 0.3)",
                  color: "#a855f7"
                }}>
                {user?.name?.[0] || <PersonTwoToneIcon />}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ color: "white" }}>{user?.name || "GUEST OPERATIVE"}</Typography>
                <Typography variant="caption" sx={{ fontFamily: "monospace", opacity: 0.4, color: "white" }}>UUID: {user?.id?.slice(0, 16).toUpperCase()}</Typography>
              </Box>
            </Stack>

            <Stack spacing={2}>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <EmailTwoToneIcon sx={{ color: "rgba(255,255,255,0.3)", fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "white" }}>{user?.email || "NO_EMAIL_RECORD"}</Typography>
                  </Stack>
              </Box>
            </Stack>
          </Paper>

          {/* ORDER DIAGNOSTICS */}
          {order && (
            <Paper sx={{ 
              p: 4, mb: 4, 
              borderRadius: 6, 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.06)",
              backgroundImage: "none"
            }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 2, display: "block", mb: 3 }}>COMMERCE PACKET</Typography>
              <Stack spacing={2.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 800 }}>INVOICE REF</Typography>
                  <Typography variant="body2" fontWeight={900} sx={{ color: "#00eaff" }}>{order.invoiceNumber || "-"}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 800 }}>ASSET COUNT</Typography>
                  <Typography variant="body2" fontWeight={900} sx={{ color: "white" }}>{order.items?.length || 0} UNITS</Typography>
                </Stack>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ReceiptTwoToneIcon />}
                    onClick={() => navigate('/admin/orders')}
                    sx={{ mt: 1, borderRadius: "12px", color: "white", borderColor: "rgba(255,255,255,0.1)", fontWeight: 900, "&:hover": { borderColor: "#00eaff", color: "#00eaff" } }}
                >
                    VIEW COMMERCE LEDGER
                </Button>
              </Stack>
            </Paper>
          )}

          {/* SECURITY ACTIONS */}
          <Paper sx={{ 
            p: 4, 
            borderRadius: 6, 
            background: "rgba(239, 68, 68, 0.02)", 
            border: "1px solid rgba(239, 68, 68, 0.1)",
            backgroundImage: "none"
          }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#ef4444", letterSpacing: 2, display: "block", mb: 3 }}>SECURITY OPERATIONS</Typography>
            <Button
              fullWidth
              variant="contained"
              disabled={refundLoading || (status !== "PAID" && status !== "SUCCESS")}
              onClick={handleRefund}
              sx={{ 
                  bgcolor: "#ef4444", 
                  color: "white", 
                  fontWeight: 900, 
                  py: 1.5, 
                  borderRadius: "12px", 
                  "&:hover": { bgcolor: "#dc2626" },
                  "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.1)" }
              }}
              startIcon={refundLoading ? <CircularProgress size={16} color="inherit" /> : <ReplayTwoToneIcon />}
            >
              EXECUTE REVERSAL
            </Button>

            <Typography variant="caption" sx={{ mt: 2, opacity: 0.4, textAlign: 'center', display: "block", fontStyle: "italic" }}>
              CRITICAL: ALL REVERSALS ARE FINAL AND PROCESSED VIA GATEWAY.
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

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
          }
        `}
      </style>
    </Box>
  );
}

const rowStyle = {
  "& .MuiTableCell-root": {
    borderBottom: "1px solid rgba(255,255,255,0.03)",
    py: 2.5
  }
};

const labelStyle = {
  color: "rgba(255,255,255,0.3)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 1.5,
  width: "40%"
};

const valueStyle = {
  color: "white",
  fontWeight: 800,
  fontFamily: "monospace",
  fontSize: 13,
  letterSpacing: 0.5
};
