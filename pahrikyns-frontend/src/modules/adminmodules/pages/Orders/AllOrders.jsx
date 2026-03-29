import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TextField,
  Paper,
  Stack,
  IconButton,
  Tooltip,
  InputAdornment,
  CircularProgress,
  Divider,
  Grid,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchOrders, getOrdersStats } from "../../Adminapi/ordersAdmin";
import { motion, AnimatePresence } from "framer-motion";

/* ICONS */
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import PendingActionsTwoToneIcon from "@mui/icons-material/PendingActionsTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";
import SensorsTwoToneIcon from "@mui/icons-material/SensorsTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";

const statusColor = (status) => {
  switch (status) {
    case "COMPLETED": return "#22c55e";
    case "PAID": return "#00eaff";
    case "CANCELLED": return "#ef4444";
    default: return "#f59e0b";
  }
};

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [res, s] = await Promise.all([
        fetchOrders(),
        getOrdersStats()
      ]);
      setOrders(res.orders || []);
      setStats(s || { total: 0, pending: 0, revenue: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.customer?.toLowerCase().includes(q) ||
      o.invoiceNumber?.toLowerCase().includes(q)
    );
  });

  return (
    <Box sx={{ p: 4 }}>
      {/* HEADER SECTION */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6, alignItems: "center" }}>
        <Box>
           <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
             FISCAL OPERATIONS · SECTOR-07
           </Typography>
           <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
             Commerce Ledger
           </Typography>
        </Box>
        <Stack direction="row" spacing={3} alignItems="center">
           <Chip 
              icon={<SensorsTwoToneIcon sx={{ "&&": { color: "#00eaff" }, animation: "pulse 2s infinite" }} />} 
              label="LIVE DATA SYNC ACTIVE" 
              sx={{ 
                fontWeight: 900, 
                color: "#00eaff", 
                borderColor: "rgba(0,234,255,0.3)", 
                bgcolor: "rgba(0,234,255,0.05)",
                fontSize: 10,
                letterSpacing: 1,
                px: 1
              }}
            />
           <TextField
            placeholder="OMNI-SEARCH: CUSTOMER OR INVOICE..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00eaff", fontSize: 20, opacity: 0.6 }} />
                </InputAdornment>
              ),
            }}
            sx={searchStyle}
          />
          <IconButton sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white", borderRadius: 3, p: 1.5, border: "1px solid rgba(255,255,255,0.06)" }}>
            <FileDownloadTwoToneIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* KPI GRID */}
      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} sm={4}>
          <KpiCard label="Global Volume" value={stats.total} icon={<ShoppingCartTwoToneIcon />} color="#00eaff" trend="+12.5%" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard label="Awaiting Fulfillment" value={stats.pending} icon={<PendingActionsTwoToneIcon />} color="#f59e0b" trend="Stable" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard label="Realized Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon={<AccountBalanceWalletTwoToneIcon />} color="#22c55e" trend="+8.2%" />
        </Grid>
      </Grid>

      {/* ORDERS TABLE */}
      <Paper sx={{ 
        borderRadius: 6, 
        overflow: "hidden", 
        background: "rgba(255,255,255,0.02)", 
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "none"
      }}>
        <Table>
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
            <TableRow>
              <TableCell sx={headerStyle}>FISCAL IDENTITY</TableCell>
              <TableCell sx={headerStyle}>RECIPIENT ORIGIN</TableCell>
              <TableCell sx={headerStyle}>PROGRESS CYCLE</TableCell>
              <TableCell sx={headerStyle}>TREASURY STATUS</TableCell>
              <TableCell sx={headerStyle}>VALUE</TableCell>
              <TableCell sx={headerStyle}>TIMESTAMP</TableCell>
              <TableCell sx={headerStyle} align="right">DIAGNOSTICS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 20 }}>
                  <CircularProgress size={40} sx={{ color: "#00eaff" }} />
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 20, opacity: 0.5, color: "white" }}>
                   <SensorsTwoToneIcon sx={{ fontSize: 48, opacity: 0.1, mb: 2 }} />
                   <Typography variant="body2" sx={{ fontWeight: 900, letterSpacing: 2 }}>VAULT EMPTY: NO RECORDS DETECTED</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((o, idx) => (
                  <TableRow
                    component={motion.tr}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    key={o.id}
                    hover
                    sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" }, cursor: "pointer" }}
                    onClick={() => navigate(`/admin/orders/${o.id}`)}
                  >
                    <TableCell sx={cellStyle}>
                       <Typography variant="body2" sx={{ fontWeight: 900, color: "#00eaff", letterSpacing: 1 }}>
                         #{o.invoiceNumber || o.id.slice(0, 8)}
                       </Typography>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                       <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(0, 234, 255, 0.05)", border: "1px solid rgba(0, 234, 255, 0.2)", color: "#00eaff", fontSize: 13, fontWeight: 900 }}>
                            {o.customer?.[0] || <PersonTwoToneIcon fontSize="small" />}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "white" }}>{o.customer}</Typography>
                       </Stack>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      <Box sx={{ width: 100 }}>
                         <Stack direction="row" justifyContent="space-between" mb={0.5}>
                            <Typography variant="caption" sx={{ fontWeight: 900, color: statusColor(o.status), fontSize: 9 }}>{o.status}</Typography>
                         </Stack>
                         <Box sx={{ height: 4, width: "100%", bgcolor: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: o.status === "COMPLETED" ? "100%" : "60%" }}
                              style={{ height: "100%", bgcolor: statusColor(o.status), borderRadius: 2 }} 
                            />
                         </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      <Chip
                        label={o.paymentStatus}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          bgcolor: o.paymentStatus === "PAID" ? "rgba(34, 197, 94, 0.05)" : "rgba(245, 158, 11, 0.05)", 
                          color: o.paymentStatus === "PAID" ? "#22c55e" : "#f59e0b",
                          fontWeight: 900,
                          fontSize: 9,
                          borderColor: o.paymentStatus === "PAID" ? "rgba(34, 197, 94, 0.2)" : "rgba(245, 158, 11, 0.2)",
                          letterSpacing: 0.5
                        }}
                      />
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      <Typography variant="body2" sx={{ color: "white", fontWeight: 900 }}>
                        ₹{Number(o.grandTotal || o.totalAmount).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      <Typography variant="caption" sx={{ color: "white", opacity: 0.4, fontWeight: 800 }}>
                        {new Date(o.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cellStyle} align="right">
                       <IconButton size="small" sx={{ color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.03)", border: "1px solid rgba(0, 234, 255, 0.1)" }}>
                         <VisibilityTwoToneIcon sx={{ fontSize: 16 }} />
                       </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </Paper>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}

function KpiCard({ label, value, icon, color, trend }) {
  return (
    <Paper sx={{ 
      p: 4, 
      borderRadius: 6, 
      background: "rgba(255,255,255,0.02)", 
      border: `1px solid ${color}33`,
      position: "relative",
      overflow: "hidden",
      backgroundImage: "none"
    }}>
      <Box sx={{ position: "absolute", top: -15, right: -15, opacity: 0.05, color }}>
         {React.cloneElement(icon, { sx: { fontSize: 110 } })}
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <Box sx={{ bgcolor: `${color}11`, p: 1.5, borderRadius: 3, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {React.cloneElement(icon, { sx: { fontSize: 24, color } })}
        </Box>
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ bgcolor: "rgba(34, 197, 94, 0.05)", p: "4px 8px", borderRadius: 2 }}>
           <TrendingUpTwoToneIcon sx={{ fontSize: 12, color: "#22c55e" }} />
           <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 900, fontSize: 10 }}>{trend}</Typography>
        </Stack>
      </Stack>
      <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.4, letterSpacing: 2, color: "white", textTransform: "uppercase", display: "block", mb: 1 }}>{label}</Typography>
      <Typography variant="h3" fontWeight={900} sx={{ color: "white", letterSpacing: "-0.03em" }}>{value}</Typography>
      
      {/* Neural Graph Mock */}
      <Box sx={{ mt: 3, pt: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
         <svg width="100%" height="20" style={{ opacity: 0.3 }}>
            <motion.path
              d="M0 10 Q 20 0, 40 15 T 80 10 T 120 18 T 160 5 T 200 12"
              fill="none"
              stroke={color}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
         </svg>
      </Box>
    </Paper>
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

const searchStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    color: "white",
    width: 350,
    bgcolor: "rgba(255,255,255,0.03)",
    fontSize: 12,
    fontWeight: 800,
    transition: "all 0.3s",
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&.Mui-focused": { bgcolor: "rgba(0, 234, 255, 0.05)", boxShadow: "0 0 20px rgba(0, 234, 255, 0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" }
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1, fontWeight: 800, letterSpacing: 1 }
};
