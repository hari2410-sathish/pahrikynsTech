import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const LEVELS = [
  {
    id: "beginner",
    title: "Beginner",
    color: "#00c9ff",
    gradient: "linear-gradient(135deg, #00c9ff, #92fe9d)",
    icon: <SchoolIcon sx={{ color: "#00c9ff" }} />,
  },
  {
    id: "intermediate",
    title: "Intermediate",
    color: "#f7971e",
    gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
    icon: <AutoStoriesIcon sx={{ color: "#f7971e" }} />,
  },
  {
    id: "advanced",
    title: "Advanced",
    color: "#e94560",
    gradient: "linear-gradient(135deg, #e94560, #0f3460)",
    icon: <EmojiEventsIcon sx={{ color: "#e94560" }} />,
  },
];

export default function EnglishProgressCard() {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const data = {};
    LEVELS.forEach((lvl) => {
      const saved = JSON.parse(localStorage.getItem(`english_${lvl.id}`) || "{}");
      data[lvl.id] = Object.values(saved).filter(Boolean).length;
    });
    setProgressData(data);
  }, []);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
        overflow: "hidden",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: "rgba(0,234,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(0,234,255,0.2)",
            }}
          >
            <Typography sx={{ fontSize: 22 }}>🇬🇧</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
              English Learning Journey
            </Typography>
            <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              150 Days to Fluency
            </Typography>
          </Box>
        </Box>
        <Button
          onClick={() => navigate("/english")}
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: "#00eaff",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": { background: "rgba(0,234,255,0.1)" },
          }}
        >
          View All
        </Button>
      </Box>

      {/* Progress Bars */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {LEVELS.map((lvl) => {
          const completed = progressData[lvl.id] || 0;
          const pct = Math.round((completed / 150) * 100);

          return (
            <Box key={lvl.id}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {lvl.icon}
                  <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
                    {lvl.title}
                  </Typography>
                </Box>
                <Typography sx={{ color: lvl.color, fontWeight: 700, fontSize: 13 }}>
                  {completed}/150 days ({pct}%)
                </Typography>
              </Box>
              <Box sx={{ height: 8, bgcolor: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
                <Box
                  sx={{
                    height: "100%",
                    width: `${pct}%`,
                    background: lvl.gradient,
                    borderRadius: 4,
                    transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>

      <Button
        fullWidth
        onClick={() => navigate("/english")}
        sx={{
          mt: 3,
          background: "rgba(0,234,255,0.1)",
          color: "#00eaff",
          fontWeight: 800,
          py: 1.2,
          borderRadius: 2,
          border: "1px solid rgba(0,234,255,0.2)",
          "&:hover": { background: "rgba(0,234,255,0.2)" },
        }}
      >
        Continue Learning 🚀
      </Button>
    </Paper>
  );
}
