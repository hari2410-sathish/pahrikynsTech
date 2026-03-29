import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, CircularProgress, LinearProgress, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { getMyCourses } from "../../api/course";

export default function ProgressDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyCourses();
        setCourses(res.data || res || []);
      } catch (err) {
        console.error("Progress load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#00eaff" }} />
      </Box>
    );
  }

  const averageProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc, c) => acc + (c.progress || 0), 0) / courses.length) 
    : 0;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate("/dashboard")}
          sx={{ color: "rgba(255,255,255,0.6)", textTransform: "none" }}
        >
          Back to Dashboard
        </Button>
      </Box>

      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 800,
          mb: 1,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Learning Analytics
      </Typography>
      <Typography sx={{ color: "rgba(255,255,255,0.5)", mb: 5 }}>
        Track your progress and monitor your educational growth across all courses.
      </Typography>

      {/* OVERVIEW STAT */}
      <Paper sx={{ 
        p: 4, 
        mb: 6, 
        borderRadius: 4, 
        background: "rgba(255,255,255,0.04)", 
        border: "1px solid rgba(0,234,255,0.2)",
        position: "relative",
        overflow: "hidden"
      }}>
        <Box sx={{ position: "absolute", top: -20, right: -20, opacity: 0.1 }}>
          <TrendingUpIcon sx={{ fontSize: 200, color: "#00eaff" }} />
        </Box>
        
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textTransform: "uppercase", letterSpacing: 2, mb: 1 }}>
                Overall Mastered
              </Typography>
              <Typography sx={{ fontSize: 64, fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                {averageProgress}%
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography sx={{ color: "#fff", fontWeight: 600, mb: 2 }}>Average Completion Rate</Typography>
            <Box sx={{ width: "100%", height: 12, bgcolor: "rgba(255,255,255,0.1)", borderRadius: 6, overflow: "hidden" }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${averageProgress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ 
                  height: "100%", 
                  background: "linear-gradient(90deg, #00eaff, #7b3fe4)", 
                  borderRadius: 6 
                }}
              />
            </Box>
            <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              You are faster than 82% of other learners this week. Keep it up!
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* COURSE SPECIFIC DRILL-DOWN */}
      <Typography sx={{ fontSize: 20, fontWeight: 700, mb: 3, color: "#fff" }}>
        Course breakdown
      </Typography>

      <Grid container spacing={3}>
        {courses.map((c, i) => (
          <Grid item xs={12} key={i}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3, 
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.06)",
              "&:hover": { background: "rgba(255,255,255,0.05)" }
            }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>{c.course?.title}</Typography>
                <Typography sx={{ fontWeight: 800, color: "#00eaff" }}>{c.progress || 0}%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={c.progress || 0} 
                sx={{ 
                  height: 8, 
                  borderRadius: 4, 
                  bgcolor: "rgba(0,0,0,0.3)",
                  "& .MuiLinearProgress-bar": {
                    background: "linear-gradient(90deg, #00eaff, #7b3fe4)",
                    borderRadius: 4
                  }
                }} 
              />
            </Paper>
          </Grid>
        ))}
        {courses.length === 0 && (
          <Grid item xs={12}>
            <Typography sx={{ color: "rgba(255,255,255,0.4)", textAlign: "center", py: 4 }}>
              No data available to track. Enrol in a course to see analytics.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
