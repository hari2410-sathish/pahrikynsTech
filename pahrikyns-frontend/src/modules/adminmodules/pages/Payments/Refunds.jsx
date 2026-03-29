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
  Pagination,
  Button,
} from "@mui/material";

import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import ReplayTwoToneIcon from "@mui/icons-material/ReplayTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import FilterListTwoToneIcon from "@mui/icons-material/FilterListTwoTone";
import HistoryTwoToneIcon from "@mui/icons-material/HistoryTwoTone";

import { useNavigate } from "react-router-dom";
import { fetchAllPayments } from "../../Adminapi/paymentsAdmin";
import { motion, AnimatePresence } from "framer-motion";

/* ================= UTIL ================= */
const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function Refunds() {
  const navigate = useNavigate();

  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FILTER STATES */
  const [search, setSearch] = useState("");
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

  /* ================= LOAD REFUNDS ================= */
  const loadRefunds = async () => {
    try {
      setLoading(true);

      const res = await fetchAllPayments({
        status: "REFUNDED",
        search,
        startDate,
        endDate,
        page,
        limit: 10,
      });

      setRefunds(res.payments || []);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error(err);
      showToast("Failed to load refunds", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRefunds();
    // eslint-disable-next-line
  }, [page]);

  /* ================= HANDLERS ================= */
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadRefunds();
  };

  const handleClearFilters = () => {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setPage(1);
    setTimeout(loadRefunds, 100);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* ================= HEADER ================= */}
      <Box mb={6} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
            <Typography variant="caption" sx={{ color: "#f59e0b", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
              RECOVERY SECTOR · REVERSAL LOGS
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Capital Reversal
            </Typography>
        </Box>

        <IconButton onClick={loadRefunds} sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "white" }}>
            <HistoryTwoToneIcon />
        </IconButton>
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
            placeholder="SEARCH ORDER / ID / USER..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <SearchTwoToneIcon sx={{ mr: 1, opacity: 0.5, color: "#f59e0b" }} /> }}
            sx={filterStyle}
          />

          <Button 
            type="submit" 
            variant="contained" 
            sx={{ bgcolor: "#f59e0b", color: "black", fontWeight: 900, borderRadius: "12px", px: 4, py: 1, "&:hover": { bgcolor: "#d97706" } }}
          >
            PULL RECORDS
          </Button>

          {(search || startDate || endDate) && (
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
            <CircularProgress size={40} sx={{ color: "#f59e0b" }} />
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
              <TableRow>
                <TableCell sx={headerStyle}>PAYMENT ID</TableCell>
                <TableCell sx={headerStyle}>ORDER / USER</TableCell>
                <TableCell sx={headerStyle}>TRANSFERRED</TableCell>
                <TableCell sx={headerStyle}>SIGNAL</TableCell>
                <TableCell sx={headerStyle}>RECOVERY DATE</TableCell>
                <TableCell sx={headerStyle} align="right">OPTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {refunds.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 20 }}>
                    <Typography variant="body2" sx={{ opacity: 0.3, fontWeight: 900, letterSpacing: 2 }}>ZERO REVERSALS DETECTED</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <AnimatePresence mode="popLayout">
                  {refunds.map((p, idx) => (
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
                          <Typography variant="body2" fontWeight={800} sx={{ color: "white" }}>
                            {p.order?.invoiceNumber || p.orderId || "N/A"}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.4, color: "white" }}>
                            {p.user?.email}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={cellStyle}>
                        <Typography variant="body2" sx={{ fontWeight: 900, color: "white" }}>
                           {formatCurrency(p.amount)}
                        </Typography>
                      </TableCell>

                      <TableCell sx={cellStyle}>
                        <Chip
                          size="small"
                          icon={<ReplayTwoToneIcon sx={{ fontSize: "14px !important" }} />}
                          label="REVERSED"
                          sx={{ 
                            bgcolor: "rgba(245, 158, 11, 0.1)", 
                            color: "#f59e0b",
                            fontWeight: 900,
                            fontSize: 10,
                            border: "1px solid rgba(245, 158, 11, 0.2)",
                            letterSpacing: 0.5
                          }}
                        />
                      </TableCell>

                      <TableCell sx={cellStyle}>
                        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 800 }}>
                          {new Date(p.updatedAt || p.createdAt).toLocaleDateString()}
                        </Typography>
                      </TableCell>

                      <TableCell sx={cellStyle} align="right">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/admin/payments/${p.id}`)}
                          sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}
                        >
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
              onChange={(e, val) => setPage(val)}
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
    "&.Mui-focused": { bgcolor: "rgba(245, 158, 11, 0.05)", boxShadow: "0 0 20px rgba(245, 158, 11, 0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#f59e0b" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" }
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)", fontWeight: 900, fontSize: 11, letterSpacing: 1 },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1, fontWeight: 800, letterSpacing: 1 }
};
