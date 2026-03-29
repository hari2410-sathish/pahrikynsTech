import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Skeleton,
  Avatar,
  LinearProgress,
  ListItemAvatar,
  Tooltip
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

/* ================= API ================= */
import {
  getAdminSummary,
  getAdminEnrollments,
  getAdminActivity,
  getAdminCompletion,
} from "../../Adminapi/admin";
import { fetchDashboardTransactions } from "../../Adminapi/paymentsAdmin";

/* ================= UTILS ================= */
import { generateInvoicePDF } from "../../../../utils/generateInvoicePDF";

/* ================= CHARTS ================= */
import PieMini from "../../components/chart/PieMini";
import LineChart from "../../components/chart/LineChart";
import BarChart from "../../components/chart/BarChart";

/* ================= ICONS ================= */
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import AssessmentTwoToneIcon from "@mui/icons-material/AssessmentTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";
import ShieldTwoToneIcon from "@mui/icons-material/ShieldTwoTone";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [portfolioData, setPortfolioData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [summaryRes, enrollmentsRes, activityRes, completionRes, transactionsRes] = await Promise.all([
        getAdminSummary(),
        getAdminEnrollments(),
        getAdminActivity(),
        getAdminCompletion(),
        fetchDashboardTransactions(),
      ]);
      setSummary(summaryRes || {});
      setPortfolioData((enrollmentsRes || []).map((i) => ({ value: i.count })));
      setVolumeData((activityRes || []).map((i) => ({ value: i.value })));
      setCompletionPercent(completionRes?.percentage || 0);
      setRecentTransactions(transactionsRes?.data?.data || []);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <Box sx={{ p: 4 }}>
      {/* HEADER SECTION */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6, alignItems: "flex-end" }}>
        <Box>
           <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 3, mb: 1, display: "block" }}>
             ADMINISTRATIVE SECTOR ALPHA
           </Typography>
           <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
             Operation Command
           </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
           <Button
            startIcon={<RefreshIcon />}
            onClick={loadDashboard}
            sx={{ 
              fontWeight: 800, 
              color: "rgba(255,255,255,0.4)", 
              textTransform: "none",
              "&:hover": { color: "#00eaff" } 
            }}
          >
            RE-SYNC DATA
          </Button>
          <Box sx={{ 
            px: 2.5, 
            py: 1, 
            borderRadius: 4, 
            bgcolor: "rgba(34,197,94,0.05)", 
            border: "1px solid rgba(34,197,94,0.2)", 
            display: "flex", 
            alignItems: "center", 
            gap: 1.5 
          }}>
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#22c55e", boxShadow: "0 0 15px #22c55e" }} />
            <Typography sx={{ color: "#22c55e", fontSize: 11, fontWeight: 900, letterSpacing: 1 }}>SYSTEM STATUS: OPTIMAL</Typography>
          </Box>
        </Stack>
      </Box>

      {/* KPI GRID */}
      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} md={3}>
          <KPITile label="Realized Revenue" value={formatCurrency(summary.revenue)} icon={<MonetizationOnTwoToneIcon />} color="#00eaff" loading={loading} />
        </Grid>
        <Grid item xs={12} md={3}>
          <KPITile label="Global Students" value={summary.totalStudents || 0} icon={<PeopleAltTwoToneIcon />} color="#22c55e" loading={loading} />
        </Grid>
        <Grid item xs={12} md={3}>
          <KPITile label="In-Flight Sessions" value={summary.activeStudents || 0} icon={<BoltTwoToneIcon />} color="#7b3fe4" loading={loading} />
        </Grid>
        <Grid item xs={12} md={3}>
          <KPITile label="Curriculum Velocity" value={`${completionPercent}%`} icon={<AssessmentTwoToneIcon />} color="#f59e0b" loading={loading} />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Stack spacing={4}>
            {/* ENROLLMENT CHART */}
            <Paper sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h6" fontWeight={900} sx={{ color: "white", letterSpacing: 1 }}>ENROLLMENT VELOCITY</Typography>
                <Chip label="7D TREND" size="small" sx={{ bgcolor: "rgba(0, 234, 255, 0.1)", color: "#00eaff", fontWeight: 900, fontSize: 10 }} />
              </Stack>
              <Box sx={{ height: 320 }}>
                <LineChart data={portfolioData} color="#00eaff" />
              </Box>
            </Paper>

            {/* TRANSACTION LEDGER */}
            <Paper sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
               <Typography variant="h6" fontWeight={900} sx={{ color: "white", letterSpacing: 1, mb: 4 }}>TRANSACTION LEDGER</Typography>
               <List>
                <AnimatePresence>
                  {recentTransactions.slice(0, 5).map((tx, idx) => (
                    <motion.div 
                      key={tx.id} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ListItem 
                        sx={{ 
                          py: 2, 
                          px: 2, 
                          mb: 1,
                          borderRadius: 3,
                          bgcolor: "rgba(255,255,255,0.01)",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.03)" }
                        }}
                        secondaryAction={
                          <Tooltip title="Secure Receipt">
                            <IconButton 
                              onClick={() => generateInvoicePDF(tx)}
                              sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)", "&:hover": { color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.1)" } }}
                            >
                              <FileDownloadTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "rgba(0, 234, 255, 0.05)", color: "#00eaff" }}>
                            <MonetizationOnTwoToneIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={<Typography variant="body2" sx={{ fontWeight: 900, color: "white" }}>TXN-{tx.id.slice(0, 8).toUpperCase()}</Typography>}
                          secondary={<Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 700 }}>{new Date(tx.createdAt).toLocaleDateString()} • {tx.status}</Typography>}
                        />
                        <Box sx={{ mr: 6 }}>
                          <Typography variant="body1" sx={{ fontWeight: 900, color: "#22c55e" }}>{formatCurrency(tx.amount)}</Typography>
                        </Box>
                      </ListItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
               </List>
               {recentTransactions.length === 0 && !loading && (
                 <Typography sx={{ textAlign: "center", py: 4, opacity: 0.3, fontWeight: 800 }}>ZERO MOVEMENT DETECTED</Typography>
               )}
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Stack spacing={4}>
            {/* PERFORMANCE RADIAL */}
            <Paper sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
              <Typography variant="h6" fontWeight={900} sx={{ color: "white", letterSpacing: 1, mb: 4, textAlign: "left" }}>SYSTEM PERFORMANCE</Typography>
              <Box sx={{ transform: "scale(1.2)", my: 4 }}>
                <PieMini value={completionPercent} />
              </Box>
              <Box sx={{ mt: 4, textAlign: "left" }}>
                 <Stack direction="row" justifyContent="space-between" mb={1.5}>
                    <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.5, letterSpacing: 1 }}>CORE INTEGRITY</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: "#22c55e" }}>ACTIVE</Typography>
                 </Stack>
                 <LinearProgress 
                    variant="determinate" 
                    value={99.9} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4, 
                      bgcolor: "rgba(255,255,255,0.05)", 
                      "& .MuiLinearProgress-bar": { 
                        bgcolor: "#22c55e",
                        boxShadow: "0 0 10px #22c55e"
                      } 
                    }} 
                 />
              </Box>
            </Paper>

            {/* DISTRIBUTION BAR */}
            <Paper sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Typography variant="h6" fontWeight={900} sx={{ color: "white", letterSpacing: 1, mb: 4 }}>ACTIVITY DISTRIBUTION</Typography>
              <Box sx={{ height: 240 }}>
                <BarChart data={volumeData} color="#7b3fe4" />
              </Box>
            </Paper>

            {/* SECURITY INFUSE */}
            <Paper sx={{ p: 3, borderRadius: 5, background: "linear-gradient(135deg, rgba(123, 63, 228, 0.1), rgba(0, 234, 255, 0.1))", border: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 2 }}>
               <ShieldTwoToneIcon sx={{ color: "#00eaff" }} />
               <Box>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: "white", letterSpacing: 0.5 }}>FIREWALL ACTIVE</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.6, fontSize: 10, color: "white" }}>Administrative perimeter is being monitored for unauthorized access attempts.</Typography>
               </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

function KPITile({ label, value, icon, color, loading }) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }}>
      <Paper sx={{ 
        p: 3.5, 
        borderRadius: 5, 
        background: "rgba(255,255,255,0.02)", 
        border: `1px solid rgba(255,255,255,0.06)`,
        position: "relative",
        overflow: "hidden",
        backgroundImage: "none"
      }}>
        <Box sx={{ position: "absolute", top: -10, right: -10, opacity: 0.1 }}>{React.cloneElement(icon, { sx: { fontSize: 80, color } })}</Box>
        <Stack spacing={2}>
           <Box sx={{ width: 44, height: 44, borderRadius: 3, bgcolor: `${color}11`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
             {icon}
           </Box>
           <Box>
             <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.4, letterSpacing: 1.5, textTransform: "uppercase" }}>{label}</Typography>
             {loading ? (
               <Skeleton width="60%" height={40} sx={{ bgcolor: "rgba(255,255,255,0.05)" }} />
             ) : (
               <Typography variant="h4" fontWeight={900} sx={{ color: "white", letterSpacing: "-0.02em" }}>{value}</Typography>
             )}
           </Box>
        </Stack>
      </Paper>
    </motion.div>
  );
}
