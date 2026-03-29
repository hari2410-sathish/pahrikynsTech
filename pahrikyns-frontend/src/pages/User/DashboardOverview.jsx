import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress, 
  Grid, 
  Stack, 
  IconButton,
  Tooltip
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardStats } from "../../api/auth";
import { getMyCourses } from "../../api/course";
import { motion, AnimatePresence } from "framer-motion";

/* ICONS */
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TimerIcon from "@mui/icons-material/Timer";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LaunchIcon from "@mui/icons-material/Launch";

/* COMPONENTS */
import StatCard from "../../components/Userdashboard/chart/StatCard";
import CourseCard from "../../components/Userdashboard/CourseCard";
import ActivityChart from "../../components/Userdashboard/chart/ActivityChart";
import AchievementHub from "./AchievementHub";
import StreakWidget from "../../components/Userdashboard/StreakWidget";
import AIRecommendation from "../../components/Userdashboard/AIRecommendation";
import MiniCalendar from "../../components/Userdashboard/MiniCalendar";

export default function DashboardOverview() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, coursesRes] = await Promise.all([
          getDashboardStats().then((res) => res.data),
          getMyCourses(),
        ]);
        setStats(statsRes);
        setCourses(coursesRes);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) loadData();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress size={50} thickness={4} sx={{ color: "#00eaff" }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* 🚀 QUICK STATS & STREAK */}
      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <StatCard label="Enrolled" value={stats?.enrolledCourses || "0"} icon={<AutoStoriesIcon />} color="#38bdf8" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatCard label="Completed" value={stats?.completedLessons || "0"} icon={<TrendingUpIcon />} color="#22c55e" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatCard label="Level" value={stats?.level || "1"} icon={<EmojiEventsIcon />} color="#a855f7" />
            </Grid>
            <Grid item xs={6} sm={3}>
              <StatCard label="Points" value={stats?.points || "0"} icon={<TimerIcon />} color="#f59e0b" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <StreakWidget streak={stats?.streak || 0} xp={stats?.points || 0} />
        </Grid>
      </Grid>

      {/* 🔮 AI RECOMMENDATIONS */}
      <Box mb={6}>
        <AIRecommendation />
      </Box>

      <Grid container spacing={4}>
        {/* LEFT COLUMN: ACTIVE LEARNING */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={6}>
            
            {/* CONTINUE LEARNING SECTION */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight={900} sx={{ color: "white", letterSpacing: -0.5 }}>
                  Continue Your Journey
                </Typography>
                <IconButton onClick={() => navigate("/dashboard/courses")} sx={{ color: "rgba(255,255,255,0.4)" }}>
                  <LaunchIcon fontSize="small" />
                </IconButton>
              </Stack>
              
              <Box 
                sx={{ 
                  display: "flex", 
                  gap: 2.5, 
                  overflowX: "auto", 
                  pb: 2,
                  "&::-webkit-scrollbar": { height: 4 },
                  "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.1)", borderRadius: 10 }
                }}
              >
                {courses.length > 0 ? (
                  courses.slice(0, 4).map((c) => (
                    <Box key={c.course.id} sx={{ minWidth: 280 }}>
                       <CourseCard title={c.course.title} progress={c.progress} image={c.course.thumbnail} />
                    </Box>
                  ))
                ) : (
                  <Paper sx={{ p: 4, width: "100%", bgcolor: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
                    <Typography sx={{ color: "rgba(255,255,255,0.4)" }}>No active enrollments detected.</Typography>
                  </Paper>
                )}
              </Box>
            </Box>

            {/* ACTIVITY CHART */}
            <Paper sx={{ p: 4, borderRadius: 4, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Typography variant="h6" fontWeight={800} mb={4}>Learning Velocity</Typography>
              <Box sx={{ height: 280 }}>
                <ActivityChart data={stats?.weeklyActivity} />
              </Box>
            </Paper>

          </Stack>
        </Grid>

        {/* RIGHT COLUMN: REWARDS & SCHEDULE */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={4}>
            
            {/* ACHIEVEMENT HUB INTEGRATION */}
            <Paper sx={{ p: 4, borderRadius: 4, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
               <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
                  <EmojiEventsIcon sx={{ color: "#f59e0b" }} />
                  <Typography variant="h6" fontWeight={800}>Achievements</Typography>
               </Stack>
               <AchievementHub miniMode />
               <Box mt={2}>
                 <Typography variant="caption" sx={{ opacity: 0.4, cursor: "pointer", "&:hover": { opacity: 1, color: "#00eaff" } }} onClick={() => navigate("/dashboard/achievements")}>
                   VIEW ALL MILESTONES →
                 </Typography>
               </Box>
            </Paper>

            {/* UPCOMING SCHEDULE */}
            <Paper sx={{ p: 3, borderRadius: 4, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
               <Typography variant="h6" fontWeight={800} mb={3}>Your Calendar</Typography>
               <MiniCalendar />
               <Box sx={{ mt: 3, p: 2, borderRadius: 2, bgcolor: "rgba(0,234,255,0.05)", border: "1px solid rgba(0,234,255,0.1)" }}>
                  <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 800 }}>NEXT GOAL</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>Complete DevOps Phase 2</Typography>
               </Box>
            </Paper>

          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
