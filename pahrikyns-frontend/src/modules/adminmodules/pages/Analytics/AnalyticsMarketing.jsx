import React from "react";
import {
  Box, Typography, Paper, Grid, Avatar, Stack,
  Chip, List, ListItem, ListItemText, ListItemIcon, IconButton
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import LanguageTwoToneIcon from "@mui/icons-material/LanguageTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import PublicTwoToneIcon from "@mui/icons-material/PublicTwoTone";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

export default function AnalyticsMarketing() {
  const navigate = useNavigate();
  const channels = [
    { name: "Direct Search", value: 45, color: "#00eaff", icon: <LanguageTwoToneIcon /> },
    { name: "Organic SEO", value: 30, color: "#a855f7", icon: <ArticleTwoToneIcon /> },
    { name: "Social Pulse", value: 25, color: "#f43f5e", icon: <ShareTwoToneIcon /> },
  ];

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* ================= HEADER ================= */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={8} flexWrap="wrap" gap={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
           <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
              <ArrowBackTwoToneIcon />
           </IconButton>
           <Box>
              <Typography sx={{ color: "#00eaff", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
                INTELLIGENCE SECTOR · CAMPAIGN STRATEGY
              </Typography>
              <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                Traffic Matrix
              </Typography>
           </Box>
        </Stack>
        <Chip
          label="ALGORITHM V4.2 ACTIVE"
          sx={algorithmChipStyle}
        />
      </Stack>

      {/* ================= CHANNEL GRID ================= */}
      <Grid container spacing={4} mb={8}>
        {channels.map((ch, idx) => (
          <Grid item xs={12} md={4} key={ch.name}>
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               whileHover={{ scale: 1.02, y: -5 }}
             >
               <Paper sx={getChannelCardStyle(ch.color)}>
                  <Box sx={{ position: "absolute", top: -15, right: -15, opacity: 0.05, color: ch.color }}>
                     {React.cloneElement(ch.icon, { sx: { fontSize: 110 } })}
                  </Box>
                  <Stack direction="row" spacing={2.5} alignItems="center" mb={5}>
                      <Box sx={getIconBoxStyle(ch.color)}>
                        {ch.icon}
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 900, color: "white", letterSpacing: 2, opacity: 0.6 }}>{ch.name.toUpperCase()}</Typography>
                  </Stack>
                  <Typography variant="h2" fontWeight={900} color="white" sx={{ mb: 1, letterSpacing: "-0.04em" }}>{ch.value}%</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 900, display: "block", mb: 3, letterSpacing: 1.5 }}>TRAFFIC CONTRIBUTION</Typography>
                  <Box sx={{ height: 6, width: "100%", bgcolor: "rgba(255,255,255,0.03)", borderRadius: 3, overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ch.value}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 + 0.3 }}
                        style={{ height: "100%", background: `linear-gradient(90deg, ${ch.color}44, ${ch.color})`, borderRadius: 3, boxShadow: `0 0 15px ${ch.color}66` }}
                      />
                  </Box>
               </Paper>
             </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ================= SOURCES & GEOGRAPHY ================= */}
      <Grid container spacing={4}>
         <Grid item xs={12} md={7}>
            <Paper sx={matrixPaperStyle}>
               <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6}>
                  <Stack direction="row" spacing={2.5} alignItems="center">
                     <Box sx={iconWrapperStyle("#00eaff")}>
                        <PublicTwoToneIcon sx={{ color: "#00eaff", fontSize: 20 }} />
                     </Box>
                     <Box>
                        <Typography variant="h6" fontWeight={900} color="white">Referral Domain Matrix</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>EXTERNAL SIGNAL TRACKING</Typography>
                     </Box>
                  </Stack>
                  <Box sx={{ p: 1, borderRadius: "10px", bgcolor: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.1)" }}>
                    <TrendingUpTwoToneIcon sx={{ color: "#22c55e", fontSize: 14 }} />
                  </Box>
               </Stack>
               <Stack spacing={2}>
                  {["google.com", "linkedin.com", "youtube.com", "github.com", "twitter.com"].map((site, i) => (
                      <motion.div
                        key={site}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                      >
                        <Box sx={matrixRowStyle}>
                           <Typography variant="body2" sx={{ color: "white", fontWeight: 800, letterSpacing: "0.01em" }}>{site}</Typography>
                           <Typography variant="caption" sx={{ fontWeight: 900, color: "#00eaff", border: "1px solid rgba(0,234,255,0.1)", px: 1.5, py: 0.5, borderRadius: "8px", bgcolor: "rgba(0,234,255,0.02)" }}>
                              {(Math.random() * 1000 + 400).toFixed(0)} SIGNALS
                           </Typography>
                        </Box>
                      </motion.div>
                  ))}
               </Stack>
            </Paper>
         </Grid>

         <Grid item xs={12} md={5}>
            <Paper sx={{ ...matrixPaperStyle, height: "100%", position: "relative" }}>
               <Stack direction="row" spacing={2.5} alignItems="center" mb={5}>
                  <Box sx={iconWrapperStyle("#a855f7")}>
                     <CampaignTwoToneIcon sx={{ color: "#a855f7", fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={900} color="white">Strategic Footprint</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>MARKETING INTELLIGENCE BREATHE</Typography>
                  </Box>
               </Stack>
               <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, mb: 6, fontWeight: 500 }}>
                  Organic search accounts for 30% of total entry signals. Strategic focus on LinkedIn-derived traffic has shown a <b style={{ color: "#00eaff" }}>+12% volume increase</b> in the last 24 cycles.
               </Typography>
               <Box sx={campaignBoxStyle}>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: "#a855f7", display: "block", mb: 1, letterSpacing: 2 }}>TOP PERFORMING CAMPAIGN</Typography>
                  <Typography variant="h6" sx={{ color: "white", fontWeight: 900, letterSpacing: "-0.01em" }}>Spring Neural Refresh 2024</Typography>
                  <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
                    <Chip label="CONVERSION: +14%" size="small" sx={miniChipStyle} />
                    <Chip label="ROI: 4.2X" size="small" sx={miniChipStyle} />
                  </Box>
               </Box>
               
               <Box sx={{ position: "absolute", bottom: 20, right: 20, opacity: 0.05 }}>
                  <TrendingUpTwoToneIcon sx={{ fontSize: 120, color: "white" }} />
               </Box>
            </Paper>
         </Grid>
      </Grid>
    </Box>
  );
}

const algorithmChipStyle = { 
    fontWeight: 900, 
    color: "#a855f7", 
    borderColor: "rgba(168, 85, 247, 0.2)", 
    bgcolor: "rgba(168, 85, 247, 0.05)",
    fontSize: 10,
    letterSpacing: 2,
    px: 1,
    borderRadius: "10px",
    height: 32
};

const getChannelCardStyle = (color) => ({ 
    p: 4, 
    background: "rgba(255,255,255,0.02)", 
    borderRadius: "24px", 
    border: `1px solid rgba(255,255,255,0.06)`,
    position: "relative",
    overflow: "hidden",
    backgroundImage: "none",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    transition: "all 0.4s",
    "&:hover": { borderColor: `${color}40`, bgcolor: "rgba(255,255,255,0.03)" }
});

const getIconBoxStyle = (color) => ({ 
    width: 48, 
    height: 48, 
    borderRadius: "14px", 
    bgcolor: `${color}08`, 
    color: color, 
    border: `1px solid ${color}15`, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    boxShadow: `0 10px 20px ${color}05`
});

const matrixPaperStyle = { 
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

const matrixRowStyle = { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    p: 2.5, 
    borderRadius: "16px", 
    bgcolor: "rgba(255,255,255,0.01)", 
    border: "1px solid rgba(255,255,255,0.03)",
    transition: "all 0.3s",
    "&:hover": { bgcolor: "rgba(255,255,255,0.03)", transform: "translateX(8px)", borderColor: "rgba(255,255,255,0.1)" }
};

const campaignBoxStyle = { 
    p: 4, 
    borderRadius: "20px", 
    bgcolor: "rgba(168, 85, 247, 0.03)", 
    border: "1px solid rgba(168, 85, 247, 0.08)",
    boxShadow: "inset 0 0 30px rgba(168, 85, 247, 0.02)"
};

const miniChipStyle = { 
    height: 22, 
    fontSize: 9, 
    fontWeight: 900, 
    bgcolor: "rgba(255,255,255,0.03)", 
    color: "rgba(255,255,255,0.5)", 
    border: "1px solid rgba(255,255,255,0.06)",
    letterSpacing: 0.5
};
