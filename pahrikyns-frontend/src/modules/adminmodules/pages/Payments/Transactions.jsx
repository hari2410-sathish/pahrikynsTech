import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    CircularProgress,
    Snackbar,
    Alert,
    IconButton,
    TextField,
    Stack,
    Tooltip,
    MenuItem,
    Pagination,
    Button,
} from "@mui/material";

import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import TerminalTwoToneIcon from "@mui/icons-material/TerminalTwoTone";

import { useNavigate } from "react-router-dom";
import { fetchAllPayments } from "../../Adminapi/paymentsAdmin";
import { motion, AnimatePresence } from "framer-motion";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

const statusColor = (status) => {
    switch (status) {
        case "PAID":
        case "SUCCESS":
            return "#22c55e";
        case "FAILED":
            return "#ef4444";
        case "REFUNDED":
            return "#f59e0b";
        default:
            return "rgba(255,255,255,0.4)";
    }
};

export default function Transactions() {
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    /* FILTER STATES */
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [toast, setToast] = useState({
        open: false,
        msg: "",
        type: "success",
    });

    const showToast = (msg, type = "success") =>
        setToast({ open: true, msg, type });

    /* ================= LOAD ================= */
    const loadTransactions = async () => {
        try {
            setLoading(true);
            const res = await fetchAllPayments({
                page,
                limit: 15,
                search,
                status,
                startDate,
                endDate,
            });

            setTransactions(res.payments || []);
            setTotalPages(res.totalPages || 1);
        } catch (err) {
            console.error(err);
            showToast("Failed to load transactions", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions();
        // eslint-disable-next-line
    }, [page]);

    /* ================= HANDLERS ================= */
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        loadTransactions();
    };

    const handleClearFilters = () => {
        setSearch("");
        setStatus("");
        setStartDate("");
        setEndDate("");
        setPage(1);
        setTimeout(loadTransactions, 100);
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        showToast("Signal Copied to Clipboard");
    };

    return (
        <Box sx={{ p: 4 }}>
            {/* ================= HEADER ================= */}
            <Box mb={6} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                        SECURITY SECTOR · CRYPTO-LOGS
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
                        Secure Ledger
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2}>
                    <IconButton onClick={loadTransactions} sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "white" }}>
                        <RefreshTwoToneIcon />
                    </IconButton>
                </Stack>
            </Box>

            {/* ================= FILTERS TERMINAL ================= */}
            <Paper sx={{ 
                p: 3, mb: 6, 
                borderRadius: "20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundImage: "none"
            }}>
                <Stack
                    direction="row"
                    component="form"
                    onSubmit={handleFilterSubmit}
                    spacing={2}
                    flexWrap="wrap"
                    alignItems="center"
                >
                    <TextField
                        size="small"
                        placeholder="SEARCH TXN ID, ORDER ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{ startAdornment: <TerminalTwoToneIcon sx={{ mr: 1, opacity: 0.5, color: "#22c55e" }} /> }}
                        sx={filterStyle}
                    />

                    <TextField
                        select
                        size="small"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ ...filterStyle, minWidth: 150 }}
                    >
                        <MenuItem value="">ALL STATES</MenuItem>
                        <MenuItem value="PAID">SECURE (SUCCESS)</MenuItem>
                        <MenuItem value="PENDING">WAITING (PENDING)</MenuItem>
                        <MenuItem value="FAILED">BREACH (FAILED)</MenuItem>
                        <MenuItem value="REFUNDED">REVERSED (REFUND)</MenuItem>
                    </TextField>

                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{ bgcolor: "#22c55e", color: "black", fontWeight: 900, borderRadius: "12px", px: 4, py: 1, "&:hover": { bgcolor: "#16a34a" } }}
                    >
                        SCAN LEDGER
                    </Button>

                    {(search || status || startDate || endDate) && (
                        <Button onClick={handleClearFilters} sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 800 }}>RESET</Button>
                    )}
                </Stack>
            </Paper>

            {/* ================= TABLE ================= */}
            <Paper sx={{ 
                borderRadius: 6, 
                overflow: "hidden", 
                background: "rgba(255,255,255,0.02)", 
                border: "1px solid rgba(255,255,255,0.06)",
                backgroundImage: "none"
            }}>
                {loading ? (
                    <Box p={20} textAlign="center">
                        <CircularProgress size={40} sx={{ color: "#22c55e" }} />
                    </Box>
                ) : (
                    <Table>
                        <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
                            <TableRow>
                                <TableCell sx={headerStyle}>TRANSACTION ID</TableCell>
                                <TableCell sx={headerStyle}>GATEWAY SIGNATURE</TableCell>
                                <TableCell sx={headerStyle}>ORDER REF</TableCell>
                                <TableCell sx={headerStyle}>VALUE</TableCell>
                                <TableCell sx={headerStyle}>SYSTEM STATE</TableCell>
                                <TableCell sx={headerStyle}>TIMESTAMP</TableCell>
                                <TableCell sx={headerStyle} align="right">DIAGNOSTICS</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 20 }}>
                                        <SecurityTwoToneIcon sx={{ fontSize: 60, opacity: 0.1, mb: 2 }} />
                                        <Typography variant="body2" sx={{ opacity: 0.3, fontWeight: 900, letterSpacing: 2 }}>ZERO RECORDS DETECTED IN LOGS</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {transactions.map((t, idx) => (
                                        <TableRow 
                                          component={motion.tr}
                                          initial={{ opacity: 0, y: 5 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: idx * 0.02 }}
                                          key={t.id} 
                                          hover
                                          sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" } }}
                                        >
                                            <TableCell sx={cellStyle}>
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Typography sx={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 900, color: "#22c55e", textShadow: "0 0 10px rgba(34, 197, 94, 0.3)" }}>
                                                       {t.id.slice(0, 12).toUpperCase()}
                                                    </Typography>
                                                    <IconButton size="small" onClick={() => copyToClipboard(t.id)} sx={{ color: "rgba(255,255,255,0.3)" }}>
                                                        <ContentCopyTwoToneIcon sx={{ fontSize: 14 }} />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>

                                            <TableCell sx={cellStyle}>
                                                {t.razorpayPaymentId ? (
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <Typography sx={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: "white", opacity: 0.6 }}>
                                                           {t.razorpayPaymentId}
                                                        </Typography>
                                                        <IconButton size="small" onClick={() => copyToClipboard(t.razorpayPaymentId)} sx={{ color: "rgba(255,255,255,0.2)" }}>
                                                            <ContentCopyTwoToneIcon sx={{ fontSize: 14 }} />
                                                        </IconButton>
                                                    </Stack>
                                                ) : (
                                                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.2)" }}>N/A</Typography>
                                                )}
                                            </TableCell>

                                            <TableCell sx={cellStyle}>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: "white" }}>
                                                   {t.razorpayOrderId || t.orderId || "-"}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={cellStyle}>
                                                <Typography variant="body2" sx={{ fontWeight: 900, color: "white" }}>
                                                  {formatCurrency(t.amount)}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={cellStyle}>
                                                <Chip
                                                    size="small"
                                                    label={t.status}
                                                    sx={{ 
                                                        bgcolor: `${statusColor(t.status)}11`, 
                                                        color: statusColor(t.status),
                                                        fontWeight: 900,
                                                        fontSize: 10,
                                                        border: `1px solid ${statusColor(t.status)}33`,
                                                        letterSpacing: 0.5
                                                    }}
                                                />
                                            </TableCell>

                                            <TableCell sx={cellStyle}>
                                                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 800 }}>
                                                    {new Date(t.createdAt).toLocaleString()}
                                                </Typography>
                                            </TableCell>

                                            <TableCell sx={cellStyle} align="right">
                                                <IconButton size="small" onClick={() => navigate(`/admin/payments/${t.id}`)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
                                                    <VisibilityTwoToneIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </AnimatePresence>
                            )}
                        </TableBody>
                    </Table>
                )}

                {totalPages > 1 && (
                    <Box p={3} display="flex" justifyContent="center" borderTop="1px solid rgba(255,255,255,0.05)">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, v) => setPage(v)}
                            sx={{ "& .MuiPaginationItem-root": { color: "rgba(255,255,255,0.5)", fontWeight: 900 } }}
                        />
                    </Box>
                )}
            </Paper>

            {/* ================= TOAST ================= */}
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

const headerStyle = {
  color: "rgba(255,255,255,0.3)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 1.5,
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  py: 3,
  px: 3
};

const cellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  py: 3,
  px: 3
};

const filterStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    color: "white",
    width: 350,
    bgcolor: "rgba(255,255,255,0.03)",
    fontSize: 12,
    fontWeight: 800,
    transition: "all 0.3s",
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&.Mui-focused": { bgcolor: "rgba(34, 197, 94, 0.05)", boxShadow: "0 0 20px rgba(34, 197, 94, 0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#22c55e" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" }
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)", fontWeight: 900, fontSize: 11, letterSpacing: 1 },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1, fontWeight: 800, letterSpacing: 1 }
};
