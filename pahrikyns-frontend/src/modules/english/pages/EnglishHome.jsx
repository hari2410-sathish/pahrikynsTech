import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Chip } from "@mui/material";
import { ENGLISH_DATA } from "../data/englishData";

export default function EnglishHome() {
  const navigate = useNavigate();

  const levels = [
    { key: "beginner", ...ENGLISH_DATA.beginner },
    { key: "intermediate", ...ENGLISH_DATA.intermediate },
    { key: "advanced", ...ENGLISH_DATA.advanced },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0a1a 0%,#0d1b2a 100%)", py: 8, px: 2 }}>
      {/* Hero */}
      <Box sx={{ textAlign: "center", mb: 8 }}>
        <Typography sx={{ fontSize: { xs: 36, md: 56 }, fontWeight: 900, background: "linear-gradient(90deg,#00c9ff,#f7971e,#e94560)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1, mb: 2 }}>
          🇬🇧 Learn English in 150 Days
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: { xs: 16, md: 20 }, maxWidth: 640, mx: "auto", mb: 3 }}>
          A structured, day-by-day journey from your very first word to fluent, confident English. Choose your level and start today.
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
          {["📖 Real Lessons","✅ Track Progress","🏆 3 Levels","📅 150 Days Each"].map(f => (
            <Chip key={f} label={f} sx={{ bgcolor: "rgba(255,255,255,0.07)", color: "#fff", fontWeight: 600, fontSize: 13, border: "1px solid rgba(255,255,255,0.12)" }} />
          ))}
        </Box>
      </Box>

      {/* Level Cards */}
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 1100, mx: "auto" }}>
        {levels.map((lvl) => {
          const progress = JSON.parse(localStorage.getItem(`english_${lvl.key}`) || "{}");
          const completedDays = Object.values(progress).filter(Boolean).length;
          const pct = Math.round((completedDays / 150) * 100);

          return (
            <Grid item xs={12} md={4} key={lvl.key}>
              <Box
                onClick={() => navigate(`/english/${lvl.key}`)}
                sx={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 4,
                  p: 4,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": { transform: "translateY(-8px)", border: `1px solid ${lvl.color}`, boxShadow: `0 20px 60px ${lvl.color}33` },
                  "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, height: 4, background: lvl.gradient },
                }}
              >
                <Typography sx={{ fontSize: 52, mb: 1 }}>{lvl.icon}</Typography>
                <Typography sx={{ color: lvl.color, fontWeight: 900, fontSize: 26, mb: 0.5 }}>{lvl.title}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 13, mb: 2 }}>{lvl.subtitle}</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: 14, mb: 3, lineHeight: 1.7 }}>{lvl.description}</Typography>

                {/* Progress bar */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Progress</Typography>
                    <Typography sx={{ color: lvl.color, fontWeight: 700, fontSize: 12 }}>{completedDays}/150 days ({pct}%)</Typography>
                  </Box>
                  <Box sx={{ height: 6, bgcolor: "rgba(255,255,255,0.07)", borderRadius: 3 }}>
                    <Box sx={{ height: "100%", width: `${pct}%`, background: lvl.gradient, borderRadius: 3, transition: "width 0.5s" }} />
                  </Box>
                </Box>

                <Button fullWidth sx={{ background: lvl.gradient, color: "#000", fontWeight: 800, borderRadius: 2, py: 1.2, fontSize: 15, "&:hover": { opacity: 0.9 } }}>
                  {completedDays > 0 ? "Continue Learning →" : "Start Learning →"}
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Bottom tip */}
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: 14 }}>
          💡 Your progress is automatically saved. Pick up where you left off anytime.
        </Typography>
      </Box>
    </Box>
  );
}
