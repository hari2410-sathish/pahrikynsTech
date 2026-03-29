import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadAllLessons } from "./index";
import LessonSidebar from "../../components/Course/LessonSidebar";
import ToolPaywall from "../../components/Course/ToolPaywall";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import API from "../../api/axios";
import { Box, Button, CircularProgress, LinearProgress, Typography, Divider, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Meta from "../../components/global/Meta";

export default function LessonViewer() {
  const { category, tool, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [progress, setProgress] = useState(0);
  const [hasAccess, setHasAccess] = useState(null);
  const [basePrice, setBasePrice] = useState(5);

  const { langKey, changeLang } = useLanguage();

  const LANGS = {
    en: "English",
    ta: "தமிழ்",
    tl: "Tanglish",
  };

  const T_UI = {
    en: { lesson: "Lesson", prev: "Previous Lesson", next: "Next", start: "Beginning", completed: "Course Completed" },
    ta: { lesson: "பாடம்", prev: "முந்தைய பாடம்", next: "அடுத்தது", start: "ஆரம்பம்", completed: "படிப்பு முடிந்தது" },
    tl: { lesson: "Lesson", prev: "Previous Lesson", next: "Next", start: "Beginning", completed: "Course Completed" }
  }[langKey] || { lesson: "Lesson", prev: "Previous Lesson", next: "Next", start: "Beginning", completed: "Course Completed" };

  const checkingAccess = !user;

  // ---------------- ACCESS PROTECTION ----------------
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=" + encodeURIComponent(`/courses/${category}/${tool}/${lessonId}`));
    } else {
      API.get(`/courses/tool/${category}/${tool}/access`)
        .then((res) => {
          if (res.data.access) {
            setHasAccess(true);
          } else {
            setHasAccess(false);
            if (res.data.basePrice) setBasePrice(res.data.basePrice);
          }
        })
        .catch((err) => {
          console.error("Access check failed", err);
          setHasAccess(false);
        });
    }
  }, [tool, category, lessonId, user, navigate]);

  // ---------------- PROGRESS STORAGE ----------------
  const writeProgress = (num, val) => {
    try {
      localStorage.setItem(
        `pahrikyns:progress:${category}:${tool}:lesson${num}`,
        String(val)
      );
    } catch (error) {
      console.error("writeProgress error:", error);
    }
  };

  // ---------------- LOAD LESSON ----------------
  useEffect(() => {
    if (checkingAccess) return;

    async function init() {
      const list = await loadAllLessons(category, tool);
      setLessons(list);

      const num = parseInt(lessonId.replace("lesson", ""), 10);
      const found = list.find((l) => l.num === num);

      if (found) {
        setLesson(found);
      }
    }

    init();
  }, [category, tool, lessonId, checkingAccess]);

  if (checkingAccess || hasAccess === null) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#040814" }}>
        <CircularProgress sx={{ color: "#00eaff" }} />
      </Box>
    );
  }

  if (hasAccess === false) {
    return (
      <ToolPaywall 
        category={category} 
        tool={tool} 
        basePrice={basePrice} 
        onAccessGranted={() => setHasAccess(true)} 
      />
    );
  }

  if (!lesson) {
    return (
       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", bgcolor: "#040814" }}>
         <CircularProgress sx={{ color: "#00eaff" }} />
       </Box>
    );
  }

  const Component = lesson.Component;
  const prev = lessons.find((l) => l.num === lesson.num - 1);
  const next = lessons.find((l) => l.num === lesson.num + 1);

  const handleScroll = (e) => {
    const el = e.target;
    if (el.scrollHeight - el.clientHeight <= 0) return;
    const percent = Math.min(
      100,
      Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    );
    setProgress(percent);
    writeProgress(lesson.num, percent);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#040814", color: "#fff", overflow: "hidden", position: "relative" }}>
      <Meta title={`${tool.toUpperCase()} - Lesson ${lesson.num}`} />

      {/* AMBIENT GLOWING ORBS (Matching HomePage) */}
      <Box sx={{ position: "fixed", top: "-10%", left: "-10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(0,234,255,0.08) 0%, transparent 60%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />
      <Box sx={{ position: "fixed", bottom: "-10%", right: "-10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(123,63,228,0.08) 0%, transparent 60%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />

      <LessonSidebar
        lessons={lessons}
        current={lesson.num}
        category={category}
        tool={tool}
      />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", position: "relative", zIndex: 1 }}>
        {/* TOP HUD BAR */}
        <Box sx={{ 
          zIndex: 100, 
          display: "flex", 
          flexDirection: "column",
          bgcolor: "rgba(4, 8, 20, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}>
          <Box sx={{ p: 2, px: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, fontSize: 13, textTransform: "uppercase", letterSpacing: 2, color: "#00eaff" }}>
                  {tool} MODULE
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ bgcolor: "rgba(255,255,255,0.1)", height: 16 }} />
                <Typography variant="body2" sx={{ fontWeight: 700, opacity: 0.5 }}>
                  {T_UI.lesson} {lesson.num}
                </Typography>
             </Box>
             
             {/* Language Pills */}
             <Box sx={{ display: "flex", gap: 1, background: "rgba(255,255,255,0.03)", p: 0.5, borderRadius: 2, border: "1px solid rgba(255,255,255,0.05)" }}>
                {Object.entries(LANGS).map(([key, label]) => (
                  <Button
                    key={key}
                    size="small"
                    onClick={() => changeLang(key)}
                    sx={{
                      minWidth: 60,
                      height: 30,
                      borderRadius: 1.5,
                      fontSize: "11px",
                      fontWeight: 800,
                      color: langKey === key ? "#00eaff" : "rgba(255,255,255,0.4)",
                      bgcolor: langKey === key ? "rgba(0, 234, 255, 0.1)" : "transparent",
                      border: langKey === key ? "1px solid rgba(0,234,255,0.2)" : "1px solid transparent",
                      ":hover": { bgcolor: "rgba(255,255,255,0.05)" }
                    }}
                  >
                    {label}
                  </Button>
                ))}
             </Box>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
                height: 2, 
                bgcolor: "transparent", 
                "& .MuiLinearProgress-bar": { bgcolor: "#00eaff" } 
            }} 
          />
        </Box>

        {/* CONTENT SCROLL AREA */}
        <Box
          sx={{ 
            flex: 1, 
            overflowY: "auto", 
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" }
          }}
          onScroll={handleScroll}
        >
          <Box sx={{ pt: 2 }}>
             <Component data={lesson} />
          </Box>

          {/* FOOTER NAVIGATION */}
          <Container maxWidth="lg">
              <Box sx={{ 
                p: { xs: 4, md: 8 }, 
                mb: 10,
                display: "flex", 
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.01)",
                borderRadius: "0 0 24px 24px"
              }}>
                <Button
                    disabled={!prev}
                    onClick={() => navigate(`/courses/${category}/${tool}/lesson${prev?.num}`)}
                    startIcon={<ArrowBackIosNewIcon />}
                    sx={{ 
                        color: prev ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.1)", 
                        fontWeight: 700, 
                        fontSize: "14px",
                        textTransform: "none",
                        ":hover": { color: "#fff", bgcolor: "transparent" }
                    }}
                >
                    {prev ? T_UI.prev : T_UI.start}
                </Button>

                <Button
                    disabled={!next}
                    onClick={() => navigate(`/courses/${category}/${tool}/lesson${next?.num}`)}
                    endIcon={<ArrowForwardIosIcon />}
                    sx={{ 
                        background: next ? "linear-gradient(90deg, #00eaff, #7b3fe4)" : "rgba(255,255,255,0.05)",
                        color: next ? "#fff" : "rgba(255,255,255,0.2)",
                        fontWeight: 900, 
                        fontSize: "14px",
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: "none",
                        boxShadow: next ? "0 10px 30px rgba(0,234,255,0.2)" : "none",
                        transition: "all 0.3s",
                        "&.Mui-disabled": { color: "rgba(255,255,255,0.1) !important" },
                        ":hover": { transform: "translateY(-2px)", boxShadow: "0 15px 40px rgba(0,234,255,0.3)" }
                    }}
                >
                    {next ? `${T_UI.next}: ${T_UI.lesson} ${next.num}` : T_UI.completed}
                </Button>
              </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
