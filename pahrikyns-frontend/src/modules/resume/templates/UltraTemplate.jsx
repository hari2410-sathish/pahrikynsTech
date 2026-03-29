import React from "react";
import { Box } from "@mui/material";
import { useResume } from "../context/ResumeContext";
import EditableField from "../components/common/EditableField";

/** ========================================================
 * ULTRA TEMPLATE — ULTRA PREMIUM VERSION (v1)
 * Resume.io / Enhancv Level
 * - Bold Header
 * - Left Sidebar Accent
 * - Clean Modern Spacing
 * - Premium Typography
 * ======================================================== */

export default function UltraTemplate({ config, readOnly = false }) {
  const { state, update } = useResume();
  const { personal, experience, projects, skills } = state;

  const { colorTheme, fontFamily } = config || {};
  const { primary = "#1d4ed8", secondary = "#ffffff", text = "#111827", background = "#ffffff" } = colorTheme || {};
  const font = fontFamily || "Inter, sans-serif";

  // Helper for inline updates
  const updatePersonal = (field, val) => {
    if (readOnly) return;
    update({ personal: { ...personal, [field]: val } });
  };

  return (
    <Box
      id="resume-preview"
      className="w-full mx-auto shadow-lg rounded-xl overflow-hidden"
      sx={{
        fontFamily: font,
        maxWidth: "900px",
        backgroundColor: background,
        color: text,
      }}
    >
      {/* ================= LAYOUT ================= */}
      <Box className="grid grid-cols-1 md:grid-cols-3 min-h-full">
        {/* ================ SIDEBAR ================ */}
        <Box
          className="md:col-span-1 p-8 flex flex-col gap-8 min-h-full"
          sx={{ backgroundColor: primary, color: "#ffffff" }}
        >
          {/* PHOTO (Optional) */}
          <Box className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4" />

          {/* CONTACT */}
          <Box>
            <h2 className="font-semibold text-xl mb-3" style={{ color: secondary }}>Contact</h2>
            <div className="text-sm opacity-90 flex flex-col gap-1">
              <EditableField value={personal?.email} onChange={(v) => updatePersonal("email", v)} placeholder="Email" readOnly={readOnly} />
              <EditableField value={personal?.phone} onChange={(v) => updatePersonal("phone", v)} placeholder="Phone" readOnly={readOnly} />
              <EditableField value={personal?.location} onChange={(v) => updatePersonal("location", v)} placeholder="Location" readOnly={readOnly} />
            </div>
          </Box>

          {/* SKILLS */}
          {skills?.length > 0 && (
            <Box>
              <h2 className="font-semibold text-xl mb-3" style={{ color: secondary }}>Skills</h2>
              <Box className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white/20 rounded-md text-sm"
                  >
                    {s}
                  </span>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* ================ MAIN CONTENT ================ */}
        <Box className="md:col-span-2 p-10 flex flex-col gap-10">
          {/* HEADER */}
          <Box>
            <h1 className="text-5xl font-bold leading-tight mb-2" style={{ color: text }}>
              <EditableField
                value={personal?.name}
                onChange={(v) => updatePersonal("name", v)}
                placeholder="Your Name"
                readOnly={readOnly}
                style={{ fontWeight: "bold" }}
              />
            </h1>
            <p className="text-xl font-medium mt-1" style={{ color: primary }}>
              <EditableField
                value={personal?.title}
                onChange={(v) => updatePersonal("title", v)}
                placeholder="Job Title"
                readOnly={readOnly}
              />
            </p>
          </Box>

          {/* SUMMARY */}
          {(personal?.summary || !readOnly) && (
            <Box>
              <h2 className="font-bold text-2xl mb-2" style={{ color: text }}>Summary</h2>
              <p className="leading-relaxed text-lg" style={{ color: text, opacity: 0.8 }}>
                <EditableField
                  value={personal?.summary}
                  onChange={(val) => updatePersonal("summary", val)}
                  placeholder="Professional summary..."
                  multiline
                  readOnly={readOnly}
                />
              </p>
            </Box>
          )}

          {/* EXPERIENCE */}
          {experience?.length > 0 && (
            <Box>
              <h2 className="font-bold text-2xl mb-4" style={{ color: text }}>Experience</h2>
              <Box className="flex flex-col gap-6">
                {experience.map((exp, i) => (
                  <Box key={i}>
                    <h3 className="text-xl font-semibold" style={{ color: text }}>{exp.role}</h3>
                    <p className="text-sm mb-1" style={{ color: text, opacity: 0.7 }}>
                      {exp.company} • {exp.start} – {exp.end}
                    </p>
                    <p className="leading-relaxed text-md" style={{ color: text, opacity: 0.9 }}>
                      {exp.description}
                    </p>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* PROJECTS */}
          {projects?.length > 0 && (
            <Box>
              <h2 className="font-bold text-2xl mb-4" style={{ color: text }}>Projects</h2>
              <Box className="flex flex-col gap-6">
                {projects.map((p, i) => (
                  <Box key={i}>
                    <h3 className="text-xl font-semibold" style={{ color: text }}>{p.title}</h3>
                    <p style={{ color: text, opacity: 0.8 }}>{p.tech}</p>
                    <p className="leading-relaxed text-md mt-1" style={{ color: text, opacity: 0.9 }}>
                      {p.description}
                    </p>
                    {p.github && (
                      <p className="text-sm" style={{ color: primary }}>GitHub: {p.github}</p>
                    )}
                    {p.link && (
                      <p className="text-sm" style={{ color: primary }}>Live: {p.link}</p>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
