import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  TextField,
  MenuItem,
  Pagination,
  Grid,
  Divider,
} from "@mui/material";

import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";

import { useNavigate } from "react-router-dom";
import { fetchAllPayments } from "../../Adminapi/paymentsAdmin";
import { generateInvoicePDF } from "../../../../utils/generateInvoicePDF";
import { motion, AnimatePresence } from "framer-motion";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= HELPERS ================= */
const formatCurrency = (amt = 0) =>
  `₹${Number(amt || 0).toLocaleString("en-IN")}`;

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

export default function AllPayments() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, msg: "", type: "success" });

  /* FILTER STATES */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const showToast = (msg, type = "success") =>
    setToast({ open: true, msg, type });

  /* ================= LOAD ================= */
  const loadPayments = async () => {
    try {
      setLoading(true);
      const res = await fetchAllPayments({
        page,
        limit: 10,
        search,
        status,
        startDate,
        endDate,
      });

      setPayments(res.payments || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      showToast("Failed to load payments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
    // eslint-disable-next-line
  }, [page]);

  /* ================= HANDLERS ================= */
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadPayments();
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    setTimeout(loadPayments, 100);
  };

  /* ================= VISUALS ================= */
  const chartData = useMemo(() => {
    const map = {};
    payments.forEach((p) => {
      if (p.status !== "PAID" && p.status !== "SUCCESS") return;
      const d = new Date(p.createdAt);
      const key = `${d.getDate()}/${d.getMonth() + 1}`;
      map[key] = (map[key] || 0) + Number(p.amount || 0);
    });

    return Object.entries(map).map(([k, v]) => ({
      date: k,
      revenue: v,
    }));
  }, [payments]);

  return (
    <Box sx={{ p: 4 }}>
      {/* ================= HEADER ================= */}
      <Box mb={6} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
           <Typography variant="caption" sx={{ color: "#a855f7", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
             FINANCIAL SECTOR · ENCRYPTED
           </Typography>
           <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
             Fiscal Intelligence
           </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
           <IconButton onClick={loadPayments} sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "white" }}>
             <RefreshTwoToneIcon />
           </IconButton>
        </Stack>
      </Box>

      <Grid container spacing={4} mb={6}>
        {/* ================= REVENUE TREND ================= */}
        <Grid item xs={12} md={8}>
           <Paper sx={{ 
              p: 4, 
              borderRadius: 6, 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.06)", 
              height: 320,
              display: "flex",
              flexDirection: "column",
              backgroundImage: "none"
           }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                 <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1, display: "block", mb: 0.5 }}>NEURAL TREND</Typography>
                    <Typography variant="h6" fontWeight={900} sx={{ color: "white" }}>Revenue Trajectory</Typography>
                 </Box>
                 {chartData.length > 0 && (
                   <Chip label="ACTIVE FLOW" color="success" size="small" sx={{ fontWeight: 900, fontSize: 10, letterSpacing: 0.5 }} icon={<BoltTwoToneIcon fontSize="small" />} />
                 )}
              </Stack>
              
              <Box sx={{ flex: 1, minHeight: 0 }}>
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                      <RechartsTooltip 
                         contentStyle={{ backgroundColor: "rgba(2, 6, 23, 0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white" }}
                         itemStyle={{ color: "#22c55e", fontWeight: 900 }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.2 }}>
                     <Typography variant="body2" sx={{ fontWeight: 900 }}>WAITING FOR REVENUE SIGNALS...</Typography>
                  </Box>
                )}
              </Box>
           </Paper>
        </Grid>

        {/* ================= FILTERS TERMINAL ================= */}
        <Grid item xs={12} md={4}>
           <Paper sx={{ 
              p: 4, 
              borderRadius: 6, 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.06)", 
              height: 320,
              backgroundImage: "none"
           }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1, display: "block", mb: 3 }}>FILTER INTERFACE</Typography>
              <Stack spacing={2.5}>
                  <TextField
                    size="small"
                    placeholder="OMNI-SEARCH: IDENTITY, ID, EMAIL..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <SearchTwoToneIcon sx={{ mr: 1, opacity: 0.5, color: "#a855f7" }} /> }}
                    sx={filterStyle}
                  />

                  <TextField
                    select
                    size="small"
                    label="SYSTEM STATUS"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={filterStyle}
                  >
                    <MenuItem value="">ALL SIGNALS</MenuItem>
                    <MenuItem value="PAID">PAID (STABLE)</MenuItem>
                    <MenuItem value="PENDING">PENDING (LATENCY)</MenuItem>
                    <MenuItem value="FAILED">FAILED (ERROR)</MenuItem>
                    <MenuItem value="REFUNDED">REFUNDED (RECOVERED)</MenuItem>
                  </TextField>

                  <Box>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={handleFilterSubmit}
                      sx={{ bgcolor: "#a855f7", color: "white", fontWeight: 900, borderRadius: "12px", py: 1.5, mb: 1, "&:hover": { bgcolor: "#9333ea" } }}
                    >
                      EXECUTE FILTER
                    </Button>
                    { (search || status || startDate || endDate) && (
                      <Button fullWidth size="small" onClick={handleClearFilters} sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 800 }}>RESET DIANOSTICS</Button>
                    )}
                  </Box>
              </Stack>
           </Paper>
        </Grid>
      </Grid>

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
            <CircularProgress size={40} sx={{ color: "#a855f7" }} />
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
              <TableRow>
                <TableCell sx={headerStyle}>PAYMENT ID</TableCell>
                <TableCell sx={headerStyle}>IDENTITY</TableCell>
                <TableCell sx={headerStyle}>PROTOCOL</TableCell>
                <TableCell sx={headerStyle}>VALUE</TableCell>
                <TableCell sx={headerStyle}>STATUS</TableCell>
                <TableCell sx={headerStyle}>TIMESTAMP</TableCell>
                <TableCell sx={headerStyle} align="right">OPTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 20 }}>
                    <Typography variant="body2" sx={{ opacity: 0.3, fontWeight: 900, letterSpacing: 2 }}>ZERO TRANSACTIONS DETECTED</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <AnimatePresence mode="popLayout">
                  {payments.map((p, idx) => (
                    <TableRow 
                      component={motion.tr}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      key={p.id}
                      hover
                      sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" } }}
                    >
                      <TableCell sx={cellStyle}>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', fontWeight: 900, color: "rgba(255,255,255,0.4)" }}>
                          {p.id.slice(0, 10).toUpperCase()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={cellStyle}>
                        <Box>
                          <Typography variant="body2" fontWeight={800} sx={{ color: "white" }}>{p.user?.name || "GUEST OPERATIVE"}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.4, color: "white" }}>{p.user?.email}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={cellStyle}>
                        <Typography variant="body2" fontWeight={900} sx={{ color: "white", opacity: 0.5, fontSize: 11 }}>
                           {p.course ? "ACADEMIC" : p.order ? "COMMERCE" : p.toolName ? `TOOL: ${p.toolName.toUpperCase()}` : "GENERAL"}
                        </Typography>
                      </TableCell>
                      <TableCell sx={cellStyle}>
                        <Typography variant="body2" fontWeight={900} sx={{ color: "#22c55e" }}>
                           {formatCurrency(p.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell sx={cellStyle}>
                        <Chip
                          size="small"
                          label={p.status}
                          sx={{ 
                            bgcolor: `${statusColor(p.status)}11`, 
                            color: statusColor(p.status),
                            fontWeight: 900,
                            fontSize: 10,
                            border: `1px solid ${statusColor(p.status)}33`,
                            letterSpacing: 0.5
                          }}
                        />
                      </TableCell>
                      <TableCell sx={cellStyle}>
                        <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)" }}>
                          {new Date(p.createdAt).toLocaleDateString()}
                        </Typography>
                      </TableCell>

                      <TableCell sx={cellStyle} align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                          <IconButton size="small" onClick={() => navigate(`/admin/payments/${p.id}`)} sx={{ color: "white", bgcolor: "rgba(255,255,255,0.03)" }}>
                            <VisibilityTwoToneIcon sx={{ fontSize: 18 }} />
                          </IconButton>
                          {p.order && (
                            <IconButton size="small" onClick={() => generateInvoicePDF(p.order)} sx={{ color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.05)" }}>
                              <ReceiptLongTwoToneIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                          )}
                        </Stack>
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
    bgcolor: "rgba(255,255,255,0.03)",
    fontSize: 12,
    fontWeight: 800,
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#a855f7" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" }
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)", fontWeight: 900, fontSize: 11, letterSpacing: 1 },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1 }
};
