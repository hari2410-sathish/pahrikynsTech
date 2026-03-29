import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const DIFF_COLORS = {
  Beginner: "#00eaff",
  Intermediate: "#7b3fe4",
  Advanced: "#ff00ea",
};

const TRANSLATIONS = {
  en: { lesson: "Lesson", total: "Total Lessons", beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
  ta: { lesson: "பாடம்", total: "மொத்த பாடங்கள்", beginner: "ஆரம்பம்", intermediate: "இடைநிலை", advanced: "மேம்பட்டது" },
  tl: { lesson: "Lesson", total: "Total Lessons", beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" }
};

export default function LessonSidebar({ lessons, current, category, tool }) {
  const { langKey } = useLanguage();
  const T = TRANSLATIONS[langKey] || TRANSLATIONS.en;
  const activeRef = useRef(null);

  const getL = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[langKey] || field["en"] || "";
  };

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [current]);

  return (
    <Box
      sx={{
        width: 320,
        height: "100vh",
        bgcolor: "rgba(4, 8, 20, 0.4)",
        backdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        overflowY: "auto",
        padding: "40px 0",
        position: "sticky",
        top: 0,
        color: "#fff",
        zIndex: 10,
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(0,234,255,0.2)", borderRadius: "10px" }
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ padding: "0 30px", marginBottom: 6 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 900, 
          letterSpacing: -1,
          mb: 1,
          color: "#fff"
        }}>
          {tool.charAt(0).toUpperCase() + tool.slice(1)}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "rgba(255, 255, 255, 0.4)", fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>
          {T.total}: {lessons.length}
        </Typography>
      </Box>

      {/* LESSON GROUPS BY DIFFICULTY */}
      {["Beginner", "Intermediate", "Advanced"].map((diff) => {
        const group = lessons.filter((l) => l.meta.difficulty === diff);
        if (group.length === 0) return null;

        const groupLabel = T[diff.toLowerCase()] || diff;

        return (
          <Box key={diff} sx={{ marginBottom: 5 }}>
            {/* Group Header */}
            <Typography
              sx={{
                padding: "0 30px",
                marginBottom: 2,
                fontWeight: 900,
                color: DIFF_COLORS[diff],
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 2.5,
                opacity: 0.8
              }}
            >
              {groupLabel}
            </Typography>

            {/* Lesson list */}
            {group.map((l) => {
              const isActive = l.num === current;
              return (
                <motion.div key={l.num} whileHover={{ x: 5 }}>
                  <Link
                    to={`/courses/${category}/${tool}/lesson${l.num}`}
                    ref={isActive ? activeRef : null}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                      background: isActive
                        ? "linear-gradient(90deg, rgba(0,234,255,0.15), transparent)"
                        : "transparent",
                      padding: "16px 30px",
                      marginBottom: 2,
                      transition: "all 0.3s",
                      borderLeft: isActive
                        ? `4px solid ${DIFF_COLORS[diff]}`
                        : "4px solid transparent",
                      position: "relative"
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                       <Box>
                          <Typography sx={{ fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, mb: 0.5 }}>
                            {T.lesson} {l.num}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              lineHeight: 1.4,
                              opacity: isActive ? 1 : 0.7
                            }}
                          >
                            {getL(l.meta.title)}
                          </Typography>
                       </Box>
                       {isActive && (
                         <Box sx={{ 
                           width: 6, 
                           height: 6, 
                           bgcolor: DIFF_COLORS[diff], 
                           borderRadius: "50%",
                           boxShadow: `0 0 10px ${DIFF_COLORS[diff]}` 
                         }} />
                       )}
                    </Box>
                  </Link>
                </motion.div>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
