import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Paper, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import API from "../../api/axios";

/* --------- CORE COMPONENTS --------- */
import LeftSidebar from "../../components/Userdashboard/LeftSidebar";
import TopBar from "../../components/Userdashboard/TopBar";
import CourseProgressList from "../../components/Userdashboard/CourseProgressList";
import LearningChart from "../../components/Userdashboard/LearningChart";
import ActivityChart from "../../components/Userdashboard/chart/ActivityChart";

/* --------- CARDS & WIDGETS --------- */
import StatCard from "../../components/Userdashboard/chart/StatCard";
import CourseCard from "../../components/Userdashboard/CourseCard";
import CourseGridCard from "../../components/Userdashboard/CourseGridCard";
import AchievementCard from "../../components/Userdashboard/AchievementCard";
import CertificateCard from "../../components/Userdashboard/CertificateCard";
import WelcomeBanner from "../../components/Userdashboard/WelcomeBanner";
import StreakWidget from "../../components/Userdashboard/StreakWidget";
import AIRecommendation from "../../components/Userdashboard/AIRecommendation";
import ProfileQuickCard from "../../components/Userdashboard/ProfileQuickCard";
import LearningPath from "../../components/Userdashboard/LearningPath";
import UpcomingTasks from "../../components/Userdashboard/UpcomingTasks";
import Leaderboard from "../../components/Userdashboard/Leaderboard";
import MiniCalendar from "../../components/Userdashboard/MiniCalendar";
import CourseCategoryFilter from "../../components/Userdashboard/CourseCategoryFilter";
import QuickLinks from "../../components/Userdashboard/QuickLinks";

/* -------------------------------------- */
/* ----------- MAIN COMPONENT ------------ */
/* -------------------------------------- */

export default function ProgressDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/users/dashboard-stats"),
      API.get("/users/my-courses")
    ])
      .then(([statsRes, coursesRes]) => {
        setStats(statsRes.data);
        setCourses(coursesRes.data);
      })
      .catch((err) => console.error("Failed to load dashboard data", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "radial-gradient(circle at top, #0a0f24, #000)",
      }}
    >
      {/* ---------- SIDEBAR ---------- */}
      <LeftSidebar />

      {/* ---------- MAIN CONTENT ---------- */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TopBar />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <CircularProgress sx={{ color: "#00eaff" }} />
          </Box>
        ) : (
          <>
            {/* ---------- WELCOME BANNER ---------- */}
            <WelcomeBanner
              name={user?.name || "User"}
              level={stats?.level || 1}
              streak={stats?.streak || 0}
            />

            {/* ---------- QUICK STATS ---------- */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                gap: 3,
                mt: 4,
                mb: 4,
              }}
            >
              <StatCard label="Courses Enrolled" value={stats?.enrolledCourses || 0} color="#00eaff" />
              <StatCard label="Completed Lessons" value={stats?.completedLessons || 0} color="#7b3fe4" />
              <StatCard label="Learning Hours" value={`${stats?.learningHours || 0} hrs`} color="#06f9a5" />
              <StatCard label="Progress" value={`${stats?.overallProgress || 0}%`} color="#ff7de9" />
            </Box>

            {/* ---------- STREAK PANEL ---------- */}
            <StreakWidget streak={stats?.streak || 0} xp={stats?.points || 0} />

        {/* ---------- AI RECOMMENDATION ---------- */}
        <Box sx={{ mt: 4 }}>
          <AIRecommendation />
        </Box>

        {/* ---------- CONTINUE LEARNING (D style) ---------- */}
        <SectionTitle title="Continue Learning" />

        <HorizontalScroll>
          {courses.slice(0, 4).map((c, i) => (
            <CourseCard
              key={i}
              title={c.course?.title}
              progress={c.progress}
              image={`https://picsum.photos/400/200?random=${i}`}
            />
          ))}
          {courses.length === 0 && (
             <Typography sx={{ color: "rgba(255,255,255,0.5)", py: 2, px: 2 }}>No courses yet. Start learning!</Typography>
          )}
        </HorizontalScroll>

        {/* ---------- CATEGORY FILTER ---------- */}
        <Box sx={{ mt: 5 }}>
          <CourseCategoryFilter onChange={(cat) => setSelectedCategory(cat)} />
        </Box>

        {/* ---------- MY COURSES GRID ---------- */}
        <SectionTitle title="My Courses" />

        <GridLayout>
          {courses.length > 0 ? (
            courses.map((c, i) => (
              <CourseGridCard
                key={i}
                title={c.course?.title}
                category={c.course?.category}
                progress={c.progress}
                image={`https://picsum.photos/600/400?random=${i + 10}`}
              />
            ))
          ) : (
             <Typography sx={{ color: "rgba(255,255,255,0.5)", py: 2 }}>You haven't enrolled in any courses yet.</Typography>
          )}
        </GridLayout>

        {/* ---------- ACTIVITY ---------- */}
        <SectionTitle title="Weekly Activity" />
        <GlassPanel>
          <ActivityChart activityData={stats?.weeklyActivity} />
        </GlassPanel>

        {/* ---------- LEARNING CHART ---------- */}
        <SectionTitle title="Learning Progress" />
        <GlassPanel>
          <LearningChart activityData={stats?.weeklyActivity} />
        </GlassPanel>

        {/* ---------- PROGRESS LIST ---------- */}
        <SectionTitle title="Your Course Progress" />
        <GlassPanel>
          <CourseProgressList courses={courses} />
        </GlassPanel>

        {/* ---------- ACHIEVEMENTS ---------- */}
        <SectionTitle title="Achievements" />
        <FlexWrap>
          {stats?.achievements?.length > 0 ? (
            stats.achievements.map((ach) => (
               <AchievementCard key={ach.id} title={ach.title} level={1} />
            ))
          ) : (
            <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Keep learning to earn achievements!</Typography>
          )}
        </FlexWrap>

        {/* ---------- CERTIFICATES ---------- */}
        <SectionTitleGradient title="Certificates" />
        <FlexWrap>
          {stats?.certificates?.length > 0 ? (
            stats.certificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                title={cert.course?.title || "Course Completed"}
                issuedBy="Pahrikyns Academy"
                date={new Date(cert.issuedAt).toLocaleDateString()}
              />
            ))
          ) : (
            <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Complete courses to earn certificates!</Typography>
          )}
        </FlexWrap>

        {/* ---------- LEARNING PATH ---------- */}
        <SectionTitle title="Learning Path" />
        <LearningPath />

        {/* ---------- UPCOMING TASKS ---------- */}
        <SectionTitle title="Upcoming Tasks" />
        <UpcomingTasks />

        {/* ---------- LEADERBOARD ---------- */}
        <SectionTitle title="Leaderboard" />
        <Leaderboard />

        {/* ---------- CALENDAR ---------- */}
        <SectionTitle title="Mini Calendar" />
        <MiniCalendar />

        {/* ---------- QUICK LINKS ---------- */}
        <Box sx={{ mt: 5 }}>
          <QuickLinks navigate={navigate} />
        </Box>
        </>
        )}
      </Box>
    </Box>
  );
}

/* -------------------------------------------------------- */
/* ------------------ SHARED COMPONENTS ------------------- */
/* -------------------------------------------------------- */

function SectionTitle({ title }) {
  return (
    <Typography
      sx={{
        mb: 2,
        fontSize: 20,
        fontWeight: 700,
        background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        mt: 5,
      }}
    >
      {title}
    </Typography>
  );
}

function SectionTitleGradient({ title }) {
  return (
    <Typography
      sx={{
        mb: 2,
        fontSize: 20,
        fontWeight: 700,
        background: "linear-gradient(90deg,#ffd700,#ff8800)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        mt: 5,
      }}
    >
      {title}
    </Typography>
  );
}

function GlassPanel({ children }) {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 3,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,255,255,0.2)",
      }}
    >
      {children}
    </Paper>
  );
}

function HorizontalScroll({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        overflowX: "auto",
        pb: 2,
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(0,255,255,0.3)",
          borderRadius: 10,
        },
      }}
    >
      {children}
    </Box>
  );
}

function FlexWrap({ children }) {
  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
      {children}
    </Box>
  );
}

function GridLayout({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 3,
      }}
    >
      {children}
    </Box>
  );
}
