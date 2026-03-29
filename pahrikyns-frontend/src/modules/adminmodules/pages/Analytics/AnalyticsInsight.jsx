import React from "react";
import { Box, Typography, Paper, Stack, Chip, Avatar, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import LightbulbTwoToneIcon from "@mui/icons-material/LightbulbTwoTone";

export default function AnalyticsInsight() {
  const navigate = useNavigate();
  const insights = [
    {
        type: "positive",
        title: "Growth Opportunity",
        desc: "Courses in 'DevOps' are seeing a 25% week-over-week increase in views. Consider running a weekend promotion.",
        icon: <TrendingUpTwoToneIcon />,
        color: "#22c55e"
    },
    {
        type: "neutral",
        title: "Content Strategy",
        desc: "Your blog post 'Docker for Beginners' is the #1 traffic source this month. Producing more 'Beginner' content could boost SEO.",
        icon: <AutoAwesomeTwoToneIcon />,
        color: "#a855f7"
    },
    {
        type: "warning",
        title: "Retention Alert",
        desc: "User activity tends to drop after the 3rd lesson. Adding a quiz or milestone reward could improve completion rates.",
        icon: <WarningTwoToneIcon />,
        color: "#f59e0b"
    }
  ];

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
            <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1.5, display: "block" }}>
                INTELLIGENCE SECTOR · NEURAL INSIGHTS
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
              Smart Intelligence
            </Typography>
        </Box>
      </Stack>

      <Stack spacing={4}>
        {insights.map((ins, i) => (
            <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.1 }}
            >
                <Paper sx={getInsightCardStyle(ins.color)}>
                    <Box sx={{ display: "flex", gap: 3.5 }}>
                        <Box sx={{ 
                            width: 56, 
                            height: 56, 
                            borderRadius: "16px", 
                            bgcolor: `${ins.color}11`, 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            color: ins.color,
                            border: `1px solid ${ins.color}20`,
                            boxShadow: `0 0 20px ${ins.color}10`
                        }}>
                            {ins.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                                <Typography variant="h6" fontWeight={900} color="white">{ins.title}</Typography>
                                <Chip 
                                    label="ACTIONABLE" 
                                    size="small" 
                                    icon={<LightbulbTwoToneIcon sx={{ fontSize: "14px !important", color: "inherit !important" }} />}
                                    sx={chipStyle} 
                                />
                            </Stack>
                            <Typography sx={{ color: "rgba(255,255,255,0.5)", mb: 2, lineHeight: 1.6, fontWeight: 500 }}>{ins.desc}</Typography>
                        </Box>
                    </Box>
                </Paper>
            </motion.div>
        ))}
      </Stack>
    </Box>
  );
}

const getInsightCardStyle = (color) => ({
    p: 4, 
    background: "rgba(255,255,255,0.02)", 
    borderRadius: "24px", 
    border: `1px solid rgba(255,255,255,0.06)`,
    position: "relative",
    overflow: "hidden",
    backgroundImage: "none",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    transition: "all 0.4s",
    "&:hover": { borderColor: `${color}40`, transform: "translateX(8px)", bgcolor: "rgba(255,255,255,0.03)" }
});

const chipStyle = { 
    bgcolor: "rgba(255,255,255,0.03)", 
    color: "rgba(255,255,255,0.4)", 
    fontSize: 10, 
    fontWeight: 900, 
    letterSpacing: 1,
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.06)"
};
