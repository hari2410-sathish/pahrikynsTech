import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadAllLessons } from "./index";
import LessonSidebar from "../../components/Course/LessonSidebar";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

export default function LessonViewer() {
  const { category, tool, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);

  const { langKey, changeLang } = useLanguage();

  const LANGS = {
    en: "English",
    ta: "தமிழ்",
    tl: "Tanglish",
  };

  const checkingAccess = !user;

  // ---------------- ACCESS PROTECTION ----------------
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=" + encodeURIComponent(`/courses/${category}/${tool}/${lessonId}`));
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

  if (checkingAccess || !lesson) {
    return (
      <div style={{ padding: 20, color: "white" }}>
        Checking access...
      </div>
    );
  }

  const Component = lesson.Component;
  const prev = lessons.find((l) => l.num === lesson.num - 1);
  const next = lessons.find((l) => l.num === lesson.num + 1);

  const handleScroll = (e) => {
    const el = e.target;
    const percent = Math.min(
      100,
      Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    );
    writeProgress(lesson.num, percent);
  };

  // ---------------- UI ----------------
  return (
    <div style={{ display: "flex", height: "100vh", color: "white" }}>
      <LessonSidebar
        lessons={lessons}
        current={lesson.num}
        category={category}
        tool={tool}
      />

      <div
        style={{ flex: 1, padding: 30, overflowY: "auto" }}
        onScroll={handleScroll}
      >
        {/* Language Switch */}
        <div style={langBar}>
          {Object.entries(LANGS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => changeLang(key)}
              style={langBtn(langKey === key)}
            >
              {label}
            </button>
          ))}
        </div>

        <h1 style={{ color: "#00eaff" }}>{lesson.meta.title}</h1>
        <p style={{ opacity: 0.7 }}>{lesson.meta.description}</p>

        <div className="lesson-content">
          <Component />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {prev && (
            <button onClick={() => navigate(
              `/courses/${category}/${tool}/lesson${prev.num}`
            )}>
              ◀ Previous
            </button>
          )}
          {next && (
            <button onClick={() => navigate(
              `/courses/${category}/${tool}/lesson${next.num}`
            )}>
              Next ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const langBar = {
  position: "fixed",
  top: 80,
  right: 20,
  display: "flex",
  gap: 10,
  background: "#001f29",
  padding: "8px 12px",
  borderRadius: 30,
};

const langBtn = (active) => ({
  padding: "6px 14px",
  borderRadius: 20,
  border: "1px solid #00eaff",
  background: active ? "#00eaff" : "#001f29",
  color: active ? "#001" : "#00eaff",
  fontWeight: 700,
});
