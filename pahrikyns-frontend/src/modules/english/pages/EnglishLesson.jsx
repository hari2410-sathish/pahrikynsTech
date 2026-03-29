import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  Divider, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  CircularProgress 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SchoolIcon from "@mui/icons-material/School";

import { updateProgress, getDashboardStats } from "../../../api/auth";
import { ENGLISH_DATA } from "../data/englishData";

const LEVEL_IDS = {
  beginner: "english-beginner-lvl1",
  intermediate: "english-intermediate-lvl2",
  advanced: "english-advanced-lvl3"
};

export default function EnglishLesson() {
  const { level, day } = useParams();
  const navigate = useNavigate();
  const data = ENGLISH_DATA[level];
  const dayNum = parseInt(day);
  const lesson = data?.days?.find(d => d.day === dayNum);
  
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState(null);

  useEffect(() => {
    // Sync state from backend stats if possible
    async function syncProgress() {
      try {
        const res = await getDashboardStats();
        const serverProgress = res.data.certificates || []; // Or better, dedicated progress list
        // Local logic backup
        const saved = JSON.parse(localStorage.getItem(`english_${level}`) || "{}");
        setDone(!!saved[dayNum]);
      } catch (err) {
        console.warn("Sync failed, fallback to local.");
      }
    }
    syncProgress();
  }, [level, dayNum]);

  const markComplete = async () => {
    try {
      setLoading(true);
      const courseId = LEVEL_IDS[level];
      
      // 🚀 SEND TO BACKEND FOR POINTS & ACHIEVEMENTS
      const res = await updateProgress({
        courseId,
        lessonId: `day-${dayNum}`,
        completed: true
      });

      if (res.data.stats) {
        setSessionStats(res.data.stats);
      }

      // Local storage backup
      const saved = JSON.parse(localStorage.getItem(`english_${level}`) || "{}");
      saved[dayNum] = true;
      localStorage.setItem(`english_${level}`, JSON.stringify(saved));
      
      setDone(true);
    } catch (err) {
      console.error("Critical failure during progression save.", err);
    } finally {
      setLoading(false);
    }
  };

  if (!data || !lesson) return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a1a" }}>
      <Typography sx={{ color: "#fff" }}>Lesson not found.</Typography>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0a1a,#0d1b2a)", pb: 10 }}>
      {/* Top bar */}
      <Box sx={{ background: `${data.color}18`, borderBottom: `1px solid ${data.color}33`, px: { xs: 2, md: 6 }, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(`/english/${level}`)} sx={{ color: "rgba(255,255,255,0.5)", textTransform: "none", "&:hover": { color: data.color } }}>
          {data.title} Plan
        </Button>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
           {sessionStats && (
             <Chip label={`+20 XP Recieved`} sx={{ bgcolor: "#7b3fe4", color: "white", fontWeight: 900, px: 1, transition: "0.5s" }} />
           )}
           {done && <Chip icon={<CheckCircleIcon sx={{ fontSize: 14 }} />} label="Completed" sx={{ bgcolor: "#00c06322", color: "#00c063", fontWeight: 700, fontSize: 12 }} />}
        </Box>
      </Box>

      <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, md: 4 }, pt: 5 }}>
        {/* Day header */}
        <Box sx={{ mb: 4 }}>
          <Chip label={lesson.topic} sx={{ bgcolor: `${data.color}22`, color: data.color, fontWeight: 700, mb: 1.5 }} />
          <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: { xs: 26, md: 36 }, lineHeight: 1.2, mb: 1 }}>
            Day {dayNum}: <span style={{ color: data.color }}>{lesson.focusWord?.word}</span>
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 16 }}>{lesson.objective}</Typography>
        </Box>

        {/* Focus Word Card */}
        <Card sx={{ background: `linear-gradient(135deg,${data.color}22,rgba(255,255,255,0.03))`, border: `1px solid ${data.color}44`, borderRadius: 3, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ color: data.color, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, mb: 1 }}>Today's Focus Word</Typography>
            <Typography sx={{ color: "#fff", fontWeight: 900, fontSize: 32 }}>{lesson.focusWord?.word}</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14, mt: 0.5, mb: 1.5 }}>{lesson.focusWord?.meaning}</Typography>
            <Box sx={{ bgcolor: "rgba(0,0,0,0.3)", borderRadius: 2, px: 2, py: 1, borderLeft: `3px solid ${data.color}` }}>
              <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontStyle: "italic" }}>"{lesson.focusWord?.example}"</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Vocabulary */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 20, mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <SchoolIcon sx={{ color: data.color }} /> Vocabulary List
          </Typography>
          <Box sx={{ display: "grid", gap: 1 }}>
            {lesson.vocabulary.map((v, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 2, p: 1.5, bgcolor: "rgba(255,255,255,0.03)", borderRadius: 2, border: "1px solid rgba(255,255,255,0.06)", "&:hover": { bgcolor: `${data.color}11` } }}>
                <Typography sx={{ color: data.color, fontWeight: 800, minWidth: 120, fontSize: 14 }}>{v.word}</Typography>
                <Box>
                  <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>{v.meaning}</Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontStyle: "italic" }}>"{v.example}"</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", my: 3 }} />

        {/* Grammar */}
        <Card sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 3, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 18, mb: 1.5 }}>📐 Grammar Focus</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 14, mb: 2, lineHeight: 1.7 }}>{lesson.grammar.rule}</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {lesson.grammar.examples.map((ex, i) => (
                <Box key={i} sx={{ bgcolor: "rgba(0,0,0,0.25)", borderRadius: 2, px: 2, py: 1, borderLeft: `3px solid ${data.color}88` }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontFamily: "monospace" }}>{ex}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Practice */}
        <Accordion sx={{ bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px !important", mb: 3, "&:before": { display: "none" } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: data.color }} />} sx={{ px: 3 }}>
            <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>✏️ Practice Exercises</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 3, pb: 3 }}>
            <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: 13, mb: 2 }}>{lesson.practice.instructions}</Typography>
            {lesson.practice.exercises.map((ex, i) => (
              <Box key={i} sx={{ display: "flex", gap: 2, mb: 1.5, alignItems: "flex-start" }}>
                <Box sx={{ minWidth: 26, height: 26, borderRadius: "50%", bgcolor: `${data.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Typography sx={{ color: data.color, fontWeight: 800, fontSize: 12 }}>{i + 1}</Typography>
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.6 }}>{ex}</Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>

        {/* Daily Tip */}
        <Box sx={{ display: "flex", gap: 2, p: 3, bgcolor: "#ffd20011", border: "1px solid #ffd20033", borderRadius: 3, mb: 4, alignItems: "flex-start" }}>
          <LightbulbIcon sx={{ color: "#ffd200", mt: 0.3, flexShrink: 0 }} />
          <Box>
            <Typography sx={{ color: "#ffd200", fontWeight: 700, fontSize: 13, mb: 0.5 }}>Daily Tip</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.7 }}>{lesson.tip}</Typography>
          </Box>
        </Box>

        {/* Mark Complete */}
        <Box sx={{ position: "relative" }}>
           {!done ? (
             <Button 
               fullWidth 
               onClick={markComplete} 
               disabled={loading}
               sx={{ background: data.gradient, color: "#000", fontWeight: 800, py: 1.8, borderRadius: 2, fontSize: 16, mb: 3 }}
             >
               {loading ? <CircularProgress size={24} color="inherit" /> : `✅ Mark Day ${dayNum} as Complete`}
             </Button>
           ) : (
             <Box sx={{ textAlign: "center", py: 2, mb: 3 }}>
               <CheckCircleIcon sx={{ color: "#00c063", fontSize: 40, mb: 1 }} />
               <Typography sx={{ color: "#00c063", fontWeight: 700, fontSize: 16 }}>Day {dayNum} Completed! 🎉</Typography>
               {sessionStats && (
                  <Typography variant="caption" sx={{ color: "#7b3fe4", fontWeight: 800 }}>
                    XP: {sessionStats.points} | LVL: {sessionStats.level}
                  </Typography>
               )}
             </Box>
           )}
        </Box>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button 
            startIcon={<NavigateBeforeIcon />} 
            onClick={() => navigate(`/english/${level}/day/${dayNum - 1}`)} 
            disabled={dayNum <= 1}
            sx={{ flex: 1, bgcolor: "rgba(255,255,255,0.05)", color: "#fff", py: 1.5, borderRadius: 2, fontWeight: 700, "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}
          >
            Day {dayNum - 1}
          </Button>
          <Button 
            endIcon={<NavigateNextIcon />} 
            onClick={() => navigate(`/english/${level}/day/${dayNum + 1}`)} 
            disabled={dayNum >= 150}
            sx={{ flex: 1, background: data.gradient, color: "#000", py: 1.5, borderRadius: 2, fontWeight: 700 }}
          >
            Day {dayNum + 1}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
