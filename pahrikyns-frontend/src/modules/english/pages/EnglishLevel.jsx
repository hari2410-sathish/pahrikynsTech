import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, Grid, Button, Chip, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ENGLISH_DATA } from "../data/englishData";

export default function EnglishLevel() {
  const { level } = useParams();
  const navigate = useNavigate();
  const data = ENGLISH_DATA[level];
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`english_${level}`) || "{}");
    setProgress(saved);
  }, [level]);

  if (!data) return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a1a" }}>
      <Typography sx={{ color: "#fff" }}>Level not found.</Typography>
    </Box>
  );

  const completedCount = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((completedCount / 150) * 100);

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0a1a,#0d1b2a)", pb: 10 }}>
      {/* Header */}
      <Box sx={{ background: `linear-gradient(135deg,${data.color}22,transparent)`, borderBottom: `1px solid ${data.color}33`, py: 5, px: { xs: 2, md: 6 } }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/english")} sx={{ color: "rgba(255,255,255,0.5)", mb: 2, textTransform: "none", "&:hover": { color: data.color } }}>
          All Levels
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Typography sx={{ fontSize: 44 }}>{data.icon}</Typography>
          <Box>
            <Typography sx={{ color: data.color, fontWeight: 900, fontSize: { xs: 28, md: 40 } }}>{data.title} English</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 15 }}>{data.subtitle}</Typography>
          </Box>
        </Box>
        {/* Progress */}
        <Box sx={{ mt: 3, maxWidth: 500 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Overall Progress</Typography>
            <Typography sx={{ color: data.color, fontWeight: 700, fontSize: 13 }}>{completedCount}/150 days • {pct}%</Typography>
          </Box>
          <Box sx={{ height: 8, bgcolor: "rgba(255,255,255,0.07)", borderRadius: 4 }}>
            <Box sx={{ height: "100%", width: `${pct}%`, background: data.gradient, borderRadius: 4, transition: "width 0.6s ease" }} />
          </Box>
        </Box>
      </Box>

      {/* Day Grid */}
      <Box sx={{ px: { xs: 2, md: 6 }, pt: 5 }}>
        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 13, mb: 3, textTransform: "uppercase", letterSpacing: 1 }}>
          150-Day Learning Plan
        </Typography>
        <Grid container spacing={1.5}>
          {data.days.map((lesson) => {
            const done = !!progress[lesson.day];
            return (
              <Grid item xs={6} sm={4} md={3} lg={2} key={lesson.day}>
                <Tooltip title={lesson.focusWord?.word || lesson.title} placement="top">
                  <Box
                    component={Link}
                    to={`/english/${level}/day/${lesson.day}`}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1.5,
                      borderRadius: 2,
                      border: done ? `1.5px solid ${data.color}` : "1px solid rgba(255,255,255,0.07)",
                      background: done ? `${data.color}18` : "rgba(255,255,255,0.02)",
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": { background: `${data.color}22`, border: `1.5px solid ${data.color}88`, transform: "scale(1.05)" },
                      minHeight: 72,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.3 }}>
                      {done
                        ? <CheckCircleIcon sx={{ fontSize: 14, color: data.color }} />
                        : <LockOpenIcon sx={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }} />
                      }
                      <Typography sx={{ color: done ? data.color : "rgba(255,255,255,0.35)", fontWeight: 700, fontSize: 11 }}>
                        Day {lesson.day}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: done ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 11, textAlign: "center", lineHeight: 1.3 }}>
                      {lesson.focusWord?.word || lesson.topic}
                    </Typography>
                  </Box>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
