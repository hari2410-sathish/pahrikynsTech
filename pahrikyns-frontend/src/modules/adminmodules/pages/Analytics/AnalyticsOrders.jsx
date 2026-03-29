import React from "react";
import { Box, Typography, Paper, Stack, Grid, IconButton, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import TimelineTwoToneIcon from "@mui/icons-material/TimelineTwoTone";

/* COMPONENTS */
import BarChart from "../../components/chart/BarChart";

export default function AnalyticsOrders() {
  const navigate = useNavigate();

  const mockOrderData = [
    { label: "MON", value: 32 },
    { label: "TUE", value: 45 },
    { label: "WED", value: 38 },
    { label: "THU", value: 52 },
    { label: "FRI", value: 48 },
    { label: "SAT", value: 25 },
    { label: "SUN", value: 18 }
  ];

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       {/* ================= HEADER ================= */}
       <Stack direction="row" alignItems="center" spacing={3} mb={10}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
            <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#a855f7", fontWeight: 900, letterSpacing: 4, mb: 1.5, display: "block" }}>
                INTELLIGENCE SECTOR · ORDER ARCHIVE
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
              Order Registry
            </Typography>
        </Box>
      </Stack>

      <Grid container spacing={4}>
         <Grid item xs={12} md={7}>
            <Paper sx={chartPaperStyle}>
               <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={iconWrapperStyle("#a855f7")}>
                       <TimelineTwoToneIcon sx={{ color: "#a855f7" }} />
                    </Box>
                    <Box>
                       <Typography variant="h6" fontWeight={900} color="white">Transmission Volume</Typography>
                       <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>DAILY ACQUISITION SIGNALS</Typography>
                    </Box>
                  </Stack>
                  <Chip label="7D CYCLE" size="small" sx={pulseChipStyle} />
               </Stack>
               <BarChart data={mockOrderData} height={250} />
            </Paper>
         </Grid>

         <Grid item xs={12} md={5}>
            <Paper sx={insightPaperStyle}>
               <Stack spacing={4}>
                  <Box>
                     <Typography variant="caption" sx={{ fontWeight: 900, color: "#a855f7", display: "block", mb: 1, letterSpacing: 2 }}>FISCAL ARCHIVE STATUS</Typography>
                     <Typography variant="h4" fontWeight={900} color="white">Optimal Flow</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8, fontWeight: 500 }}>
                    Order registration has stabilized following the latest patch deployment. 
                    We are seeing a notable <b style={{ color: "#a855f7" }}>15% increase</b> in Thursday acquisition signals, likely corresponding to mid-week skill-gap identification among professional learners.
                  </Typography>
                  
                  <Stack spacing={2}>
                     <DetailRow label="TOTAL TRANSACTIONS" value="2,412" color="#a855f7" />
                     <DetailRow label="PEAK SIGNAL DAY" value="THURSDAY" color="#00eaff" />
                     <DetailRow label="AVERAGE YIELD" value="₹4,250" color="#22c55e" />
                  </Stack>
               </Stack>
            </Paper>
         </Grid>
      </Grid>
    </Box>
  );
}

function DetailRow({ label, value, color }) {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 2, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>{label}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 900, color }}>{value}</Typography>
        </Stack>
    );
}

const chartPaperStyle = { 
    p: 5, 
    borderRadius: "28px", 
    background: "rgba(255,255,255,0.02)", 
    border: "1px solid rgba(255,255,255,0.06)", 
    backgroundImage: "none",
    boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
};

const insightPaperStyle = { 
    p: 6, 
    height: "100%",
    borderRadius: "28px", 
    background: "rgba(255,255,255,0.02)", 
    border: "1px solid rgba(255,255,255,0.06)", 
    backgroundImage: "none",
    boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
};

const iconWrapperStyle = (color) => ({ 
    width: 48, 
    height: 48, 
    borderRadius: "14px", 
    bgcolor: `${color}08`, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    border: `1px solid ${color}15`
});

const pulseChipStyle = { 
    bgcolor: "rgba(168, 85, 247, 0.05)", 
    color: "#a855f7", 
    fontWeight: 900, 
    border: "1px solid rgba(168, 85, 247, 0.15)",
    fontSize: 10,
    letterSpacing: 2
};
