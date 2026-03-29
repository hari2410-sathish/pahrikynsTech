import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert, 
  Paper, 
  Stack, 
  IconButton,
  Tooltip,
  Button,
  Chip,
  Divider
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ================= API ================= */
import { getAdminSummary, getAdminRevenue, getAdminEnrollments } from "../../Adminapi/admin";

/* ================= COMPONENTS ================= */
import LineChart from "../../components/chart/LineChart";

/* ================= ICONS ================= */
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import HubTwoToneIcon from "@mui/icons-material/HubTwoTone";

const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function AnalyticsOverview() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);
      const [summary, revenue, enrollments] = await Promise.all([
        getAdminSummary(),
        getAdminRevenue(),
        getAdminEnrollments()
      ]);

      setStats(summary);
      setRevenueData(revenue.map(r => ({ name: r.month, value: r.revenue })));
      setEnrollmentData(enrollments.map(e => ({ name: e.month || e.date, value: e.count })));
    } catch (err) {
      setError("STRATEGIC DATA UNREACHABLE. UPLINK SYNCHRONIZATION FAILED.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80vh", gap: 3 }}>
        <CircularProgress size={60} thickness={4} sx={{ color: "#00eaff" }} />
        <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4 }}>SYNCHRONIZING INTELLIGENCE...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: "16px", fontWeight: 900, bgcolor: "#f43f5e" }}>{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER SECTION */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={8} flexWrap="wrap" gap={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
           <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
              <ArrowBackTwoToneIcon />
           </IconButton>
           <Box>
              <Typography sx={{ color: "#00eaff", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
                INTELLIGENCE SECTOR · STRATEGIC INSIGHTS
              </Typography>
              <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                Neural Projection
              </Typography>
           </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
           <Button
            variant="outlined"
            onClick={loadAnalytics}
            startIcon={<RefreshIcon />}
            sx={secondaryButtonStyle}
          >
            RECALIBRATE CORE
          </Button>
          <Tooltip title="EXPORT INTELLIGENCE">
            <IconButton sx={iconButtonStyle}>
              <FileDownloadTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {/* KPI GRID */}
      <Grid container spacing={3} mb={8}>
        {[
          { label: "Realized Revenue", value: formatCurrency(stats.revenue), trend: "+14.2%", icon: <MonetizationOnTwoToneIcon />, color: "#00eaff" },
          { label: "Pipeline Volume", value: stats.totalOrders, trend: "+22.1%", icon: <ShoppingBagTwoToneIcon />, color: "#a855f7" },
          { label: "Learner Density", value: stats.totalStudents, trend: "+8.4%", icon: <PeopleAltTwoToneIcon />, color: "#22c55e" },
          { label: "Catalog Depth", value: stats.totalCourses, trend: "OPTIMAL", icon: <AutoStoriesTwoToneIcon />, color: "#f59e0b" }
        ].map((tile, i) => (
          <Grid item xs={12} sm={6} md={3} key={tile.label}>
             <InsightTile {...tile} delay={i * 0.1} />
          </Grid>
        ))}
      </Grid>

      {/* ANALYSIS SECTION */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Paper sx={chartPaperStyle}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={iconWrapperStyle("#00eaff")}>
                   <TrendingUpTwoToneIcon sx={{ color: "#00eaff" }} />
                </Box>
                <Box>
                   <Typography variant="h6" fontWeight={900} color="white">Revenue Projection</Typography>
                   <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>FISCAL TRAJECTORY ANALYSIS</Typography>
                </Box>
              </Stack>
              <Chip label="7D PULSE" size="small" sx={pulseChipStyle} />
            </Stack>
            <Box sx={{ height: 400 }}>
              <LineChart data={revenueData} color="#00eaff" />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Paper sx={{ ...chartPaperStyle, height: "100%" }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={6}>
               <Box sx={iconWrapperStyle("#a855f7")}>
                  <HubTwoToneIcon sx={{ color: "#a855f7" }} />
               </Box>
               <Box>
                  <Typography variant="h6" fontWeight={900} color="white">Acquisition Flux</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>USER GROWTH METRICS</Typography>
               </Box>
            </Stack>
            <Box sx={{ height: 320 }}>
              <LineChart data={enrollmentData} color="#a855f7" />
            </Box>
            
            <Box sx={recommendationStyle}>
               <Stack direction="row" spacing={2}>
                  <BoltTwoToneIcon sx={{ color: "#f59e0b", mt: 0.5 }} />
                  <Box>
                     <Typography variant="caption" sx={{ fontWeight: 900, color: "#f59e0b", display: "block", mb: 0.5, letterSpacing: 1 }}>STRATEGIC ADVISORY</Typography>
                     <Typography variant="body2" sx={{ opacity: 0.8, color: "white", fontSize: 12, lineHeight: 1.5, fontWeight: 500 }}>
                        Positive momentum detected in learner acquisition. Scale marketing assets in high-traction sectors to maximize ROI.
                     </Typography>
                  </Box>
               </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function InsightTile({ label, value, trend, icon, color, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
       <Paper sx={tileStyle}>
          <Box sx={{ position: "absolute", top: -15, right: -15, opacity: 0.05, color }}>{React.cloneElement(icon, { sx: { fontSize: 100 } })}</Box>
          <Stack spacing={3}>
             <Box sx={{ width: 52, height: 52, borderRadius: "16px", bgcolor: `${color}10`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
                {icon}
             </Box>
             <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.4, letterSpacing: 2, textTransform: "uppercase", display: "block", mb: 1, color: "white" }}>{label}</Typography>
                <Stack direction="row" alignItems="baseline" spacing={2}>
                   <Typography variant="h4" fontWeight={900} sx={{ color: "white", letterSpacing: "-0.03em" }}>{value}</Typography>
                   <Typography variant="caption" sx={{ color: trend.startsWith("+") ? "#22c55e" : "white", fontWeight: 900, fontSize: 11, opacity: trend.startsWith("+") ? 1 : 0.4 }}>{trend}</Typography>
                </Stack>
             </Box>
          </Stack>
       </Paper>
    </motion.div>
  );
}

const secondaryButtonStyle = { 
    fontWeight: 900, 
    color: "rgba(255,255,255,0.4)", 
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: "14px",
    px: 3,
    "&:hover": { color: "#00eaff", borderColor: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.05)" },
    transition: "all 0.3s"
};

const iconButtonStyle = { 
    bgcolor: "rgba(255,255,255,0.03)", 
    border: "1px solid rgba(255,255,255,0.06)", 
    borderRadius: "14px", 
    color: "white", 
    "&:hover": { color: "#00eaff", borderColor: "rgba(0, 234, 255, 0.3)", bgcolor: "rgba(0, 234, 255, 0.05)" },
    transition: "all 0.3s"
};

const tileStyle = { 
    p: 4, 
    borderRadius: "20px", 
    background: "rgba(255,255,255,0.02)", 
    border: `1px solid rgba(255,255,255,0.06)`,
    position: "relative",
    overflow: "hidden",
    backgroundImage: "none",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    transition: "transform 0.3s",
    "&:hover": { transform: "translateY(-5px)", borderColor: "rgba(255,255,255,0.12)" }
};

const chartPaperStyle = { 
    p: 5, 
    borderRadius: "24px", 
    background: "rgba(255,255,255,0.02)", 
    border: "1px solid rgba(255,255,255,0.06)", 
    backgroundImage: "none",
    boxShadow: "0 30px 70px rgba(0,0,0,0.3)"
};

const iconWrapperStyle = (color) => ({ 
    width: 48, 
    height: 48, 
    borderRadius: "14px", 
    bgcolor: `${color}10`, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    border: `1px solid ${color}20`
});

const pulseChipStyle = { 
    bgcolor: "rgba(0, 234, 255, 0.05)", 
    color: "#00eaff", 
    fontWeight: 900, 
    border: "1px solid rgba(0, 234, 255, 0.15)",
    fontSize: 10,
    letterSpacing: 1
};

const recommendationStyle = { 
    mt: 6, 
    p: 3, 
    borderRadius: "16px", 
    bgcolor: "rgba(245, 158, 11, 0.03)", 
    border: "1px solid rgba(245, 158, 11, 0.08)",
    boxShadow: "inset 0 0 20px rgba(245, 158, 11, 0.02)"
};
