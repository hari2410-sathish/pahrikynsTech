import React from "react";
import { Box, Typography, Paper, Stack, Grid, IconButton, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";

/* COMPONENTS */
import PieMini from "../../components/chart/PieMini";

export default function AnalyticsCustomers() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       {/* ================= HEADER ================= */}
       <Stack direction="row" alignItems="center" spacing={3} mb={10}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
            <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 900, letterSpacing: 4, mb: 1.5, display: "block" }}>
                INTELLIGENCE SECTOR · CUSTOMER DENSITY
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
              Learner Flux
            </Typography>
        </Box>
      </Stack>

      <Grid container spacing={4}>
         <Grid item xs={12} md={4}>
            <Paper sx={summaryPaperStyle}>
               <Stack alignItems="center" spacing={4} sx={{ textAlign: "center" }}>
                  <Box sx={iconWrapperStyle("#22c55e")}>
                     <PeopleAltTwoToneIcon sx={{ fontSize: 32, color: "#22c55e" }} />
                  </Box>
                  <Box>
                     <Typography variant="h5" fontWeight={900} color="white" sx={{ mb: 1 }}>Growth Pulse</Typography>
                     <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 2 }}>RESOLUTION: HIGH</Typography>
                  </Box>
                  <PieMini value={78} size={200} />
                  <Chip 
                    label="STREAM: STABLE" 
                    size="small" 
                    sx={statusChipStyle} 
                  />
               </Stack>
            </Paper>
         </Grid>

         <Grid item xs={12} md={8}>
            <Paper sx={insightPaperStyle}>
               <Stack direction="row" spacing={2.5} alignItems="center" mb={4}>
                  <Box sx={iconWrapperStyle("#00eaff")}>
                    <BoltTwoToneIcon sx={{ color: "#00eaff", fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={900} color="white">Demographic Intelligence</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>BEHAVIORAL CLUSTER REPORT</Typography>
                  </Box>
               </Stack>
               
               <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 2, fontWeight: 500 }}>
                 Neural analysis of the current learner base indicates a <b style={{ color: "#22c55e" }}>78% retention rate</b> across core technical certifications. 
                 The highest density of active signals originates from the <b style={{ color: "#00eaff" }}>Full-Stack Engineering</b> and <b style={{ color: "#a855f7" }}>Cloud Architecture</b> modules. 
                 <br /><br />
                 User engagement patterns show a significant spike during the 18:00 - 22:00 UTC window, suggesting a demographic primarily composed of secondary-sector technical professionals.
                 <br /><br />
                 <b style={{ color: "#f59e0b" }}>STRATEGIC ACTION:</b> Deploy targeted interactive lab environments during peak activity windows to maximize knowledge retention and subscription longevity.
               </Typography>
            </Paper>
         </Grid>
      </Grid>
    </Box>
  );
}

const summaryPaperStyle = { 
    p: 6, 
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
    width: 52, 
    height: 52, 
    borderRadius: "16px", 
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
    height: 28,
    px: 1
};
