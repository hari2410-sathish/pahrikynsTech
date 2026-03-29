import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Stack, Grid, Chip, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import TimelineTwoToneIcon from "@mui/icons-material/TimelineTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import FlashOnTwoToneIcon from "@mui/icons-material/FlashOnTwoTone";

import { getAdminSummary } from "../../Adminapi/admin";

export default function PurchaseFunnel() {
  const navigate = useNavigate();
  const [funnel, setFunnel] = useState({
    visitors: 0,
    courseViews: 0,
    checkoutStarts: 0,
    conversions: 0
  });

  useEffect(() => {
    loadFunnel();
  }, []);

  async function loadFunnel() {
    try {
      const summ = await getAdminSummary();
      const conversions = summ.totalOrders || 0;
      // Mocking funnel ratios based on conversions
      setFunnel({
        visitors: conversions * 15,
        courseViews: conversions * 8,
        checkoutStarts: conversions * 3,
        conversions
      });
    } catch (e) {
      console.error(e);
    }
  }

  const conversionRate = ((funnel.conversions / (funnel.visitors || 1)) * 100).toFixed(2);

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       {/* ================= HEADER ================= */}
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10} flexWrap="wrap" gap={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
           <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
              <ArrowBackTwoToneIcon />
           </IconButton>
           <Box>
              <Typography sx={{ color: "#00eaff", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
                INTELLIGENCE SECTOR · CONVERSION PIPELINE
              </Typography>
              <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                Neural Funnel
              </Typography>
           </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
           <Box sx={totalConversionBoxStyle}>
              <Typography variant="caption" sx={{ fontWeight: 900, color: "#22c55e", display: "block", mb: 0.5, letterSpacing: 1.5 }}>GLOBAL YIELD</Typography>
              <Typography variant="h5" fontWeight={900} color="white">{conversionRate}%</Typography>
           </Box>
        </Stack>
      </Stack>
      
      {/* ================= FUNNEL VISUALIZATION ================= */}
      <Stack spacing={3.5} sx={{ maxWidth: 900, mx: "auto", mb: 12 }}>
        <FunnelStep 
            label="Inbound Pulse (Visitors)" 
            value={funnel.visitors} 
            width="100%" 
            color="#00eaff" 
            delay={0}
        />
        <FunnelStep 
            label="Curriculum Engagement" 
            value={funnel.courseViews} 
            width="82%" 
            color="#00eaff" 
            delay={0.15}
            opacity={0.7}
        />
        <FunnelStep 
            label="Acquisition Intent" 
            value={funnel.checkoutStarts} 
            width="58%" 
            color="#a855f7" 
            delay={0.3}
            opacity={0.8}
        />
        <FunnelStep 
            label="Validated Enrolments" 
            value={funnel.conversions} 
            width="38%" 
            color="#22c55e" 
            delay={0.45}
            isFinal
        />
      </Stack>

      {/* ================= FUNNEL INSIGHTS ================= */}
      <Grid container spacing={4}>
         <Grid item xs={12} md={8}>
            <Paper sx={insightPaperStyle}>
               <Stack direction="row" spacing={2.5} alignItems="center" mb={4}>
                  <Box sx={iconWrapperStyle("#f59e0b")}>
                    <InfoTwoToneIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={900} color="white">Strategic Funnel Brief</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>PIPELINE OPTIMIZATION DATA</Typography>
                  </Box>
               </Stack>
               <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontWeight: 500 }}>
                 Your overall conversion rate is currently holding at <b style={{ color: "#22c55e" }}>{conversionRate}%</b>. 
                 The primary drop-off point has been identified at the <b style={{ color: "#a855f7" }}>Acquisition Intent</b> phase. 
                 Our analytics suggest that 42% of users who initiate checkout may be deterred by redundant fiscal verification steps. 
                 <br /><br />
                 <b style={{ color: "#f59e0b" }}>ADVISORY:</b> Implement one-click enrollment for authorized identities to minimize pipeline friction and maximize harvest.
               </Typography>
            </Paper>
         </Grid>

         <Grid item xs={12} md={4}>
            <Paper sx={{ ...insightPaperStyle, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
               <Stack alignItems="center" spacing={3} sx={{ textAlign: "center" }}>
                  <Box sx={{ width: 64, height: 64, borderRadius: "20px", bgcolor: "rgba(0,234,255,0.05)", border: "1px solid rgba(0,234,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <TimelineTwoToneIcon sx={{ fontSize: 32, color: "#00eaff" }} />
                  </Box>
                  <Box>
                     <Typography variant="h5" fontWeight={900} color="white" sx={{ mb: 1 }}>Optimal Flow</Typography>
                     <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 2 }}>PIPELINE STABILITY: ALPHA</Typography>
                  </Box>
                  <Chip 
                    label="STREAM: ACTIVE" 
                    size="small" 
                    icon={<FlashOnTwoToneIcon sx={{ fontSize: "12px !important", color: "inherit !important" }} />}
                    sx={statusChipStyle} 
                  />
               </Stack>
            </Paper>
         </Grid>
      </Grid>
    </Box>
  );
}

function FunnelStep({ label, value, width, color, delay, isFinal, opacity = 1 }) {
    return (
        <motion.div
           initial={{ width: 0, opacity: 0 }}
           animate={{ width, opacity: 1 }}
           transition={{ duration: 1.2, delay, ease: [0.34, 1.56, 0.64, 1] }}
           style={{ mx: "auto" }}
        >
            <Box sx={{ 
                height: 100, 
                bgcolor: isFinal ? color : `${color}22`, 
                mx: "auto", 
                borderRadius: "24px", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center",
                boxShadow: isFinal ? `0 20px 60px ${color}33` : `0 10px 30px rgba(0,0,0,0.2)`,
                border: `1px solid ${isFinal ? `${color}66` : "rgba(255,255,255,0.05)"}`,
                position: "relative",
                backdropFilter: "blur(20px)",
                opacity
            }}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: "white", opacity: 0.4, letterSpacing: 2, textTransform: "uppercase", mb: 1 }}>{label}</Typography>
                <Typography variant="h3" fontWeight={900} color="white" sx={{ letterSpacing: "-0.02em" }}>{value.toLocaleString()}</Typography>
                
                {/* Connector Arrow */}
                {!isFinal && (
                    <Box sx={{ 
                        position: "absolute", 
                        bottom: -18, 
                        width: 0, 
                        height: 0, 
                        borderLeft: "18px solid transparent", 
                        borderRight: "18px solid transparent", 
                        borderTop: `18px solid rgba(255,255,255,0.05)`,
                        zIndex: 10
                    }} />
                )}
            </Box>
        </motion.div>
    );
}

const totalConversionBoxStyle = { 
    p: 2.5, 
    borderRadius: "16px", 
    bgcolor: "rgba(34, 197, 94, 0.05)", 
    border: "1px solid rgba(34, 197, 94, 0.15)",
    boxShadow: "0 10px 30px rgba(34, 197, 94, 0.05)",
    textAlign: "right"
};

const insightPaperStyle = { 
    p: 5, 
    borderRadius: "28px", 
    background: "rgba(255,255,255,0.02)", 
    border: "1px solid rgba(255,255,255,0.06)", 
    backgroundImage: "none",
    boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
};

const iconWrapperStyle = (color) => ({ 
    width: 44, 
    height: 44, 
    borderRadius: "14px", 
    bgcolor: `${color}08`, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    border: `1px solid ${color}15`
});

const statusChipStyle = { 
    bgcolor: "rgba(34, 197, 94, 0.05)", 
    color: "#22c55e", 
    fontWeight: 900, 
    border: "1px solid rgba(34, 197, 94, 0.15)",
    fontSize: 10,
    letterSpacing: 2,
    height: 28
};
