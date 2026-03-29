import React from "react";
import { Box } from "@mui/material";
import { useResume } from "../context/ResumeContext";
import EditableField from "../components/common/EditableField";

/** ========================================================
 * FREE TEMPLATE — PRO VERSION (v1)
 * Clean • ATS Friendly • Simple Black & White
 * Perfect for basic resumes
 * ======================================================== */

export default function FreeTemplate({ config, readOnly = false }) {
  const { state, update } = useResume();
  const { personal, experience, projects, skills } = state;

  const { colorTheme, fontFamily } = config || {};
  const { primary = "#000", secondary = "#333", text = "#000", background = "#fff" } = colorTheme || {};
  const font = fontFamily || "Inter, sans-serif";

  // Helper for inline updates
  const updatePersonal = (field, val) => {
    if (readOnly) return;
    update({ personal: { ...personal, [field]: val } });
  };

  return (
    <Box
      id="resume-preview"
      className="w-full mx-auto p-8"
      sx={{
        fontFamily: font,
        maxWidth: "800px",
        backgroundColor: background,
        color: text,
      }}
    >
      {/* ================= HEADER ================= */}
      <Box className="border-b pb-4 mb-4" sx={{ borderColor: secondary }}>
        <h1 className="text-3xl font-bold mb-1" style={{ color: primary }}>
          <EditableField
            value={personal?.name}
            onChange={(v) => updatePersonal("name", v)}
            placeholder="Your Name"
            readOnly={readOnly}
            style={{ fontWeight: "bold" }}
          />
        </h1>
        <p style={{ color: secondary }}>
          <EditableField
            value={personal?.title}
            onChange={(v) => updatePersonal("title", v)}
            placeholder="Job Title"
            readOnly={readOnly}
          />
        </p>
        <p className="text-sm mt-2 flex flex-wrap gap-2" style={{ color: secondary }}>
          <EditableField value={personal?.email} onChange={(v) => updatePersonal("email", v)} placeholder="Email" readOnly={readOnly} />
          •
          <EditableField value={personal?.phone} onChange={(v) => updatePersonal("phone", v)} placeholder="Phone" readOnly={readOnly} />
          •
          <EditableField value={personal?.location} onChange={(v) => updatePersonal("location", v)} placeholder="Location" readOnly={readOnly} />
        </p>
      </Box>

      {/* ================= SUMMARY ================= */}
      {(personal?.summary || !readOnly) && (
        <Box className="mb-6">
          <h2 className="font-semibold text-xl mb-2" style={{ color: primary }}>Summary</h2>
          <p className="leading-relaxed" style={{ color: text }}>
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

      {/* ================= EXPERIENCE ================= */}
      {experience?.length > 0 && (
        <Box className="mb-6">
          <h2 className="font-semibold text-xl mb-2" style={{ color: primary }}>Experience</h2>
          {experience.map((exp, i) => (
            <Box key={i} className="mb-4">
              <h3 className="font-semibold" style={{ color: text }}>{exp.role}</h3>
              <p className="text-sm" style={{ color: secondary }}>
                {exp.company} • {exp.start} - {exp.end}
              </p>
              <p className="mt-1 leading-relaxed" style={{ color: text }}>
                {exp.description}
              </p>
            </Box>
          ))}
        </Box>
      )}

      {/* ================= PROJECTS ================= */}
      {projects?.length > 0 && (
        <Box className="mb-6">
          <h2 className="font-semibold text-xl mb-2" style={{ color: primary }}>Projects</h2>
          {projects.map((p, i) => (
            <Box key={i} className="mb-4">
              <h3 className="font-semibold" style={{ color: text }}>{p.title}</h3>
              <p style={{ color: secondary }}>{p.tech}</p>
              <p className="mt-1 leading-relaxed" style={{ color: text }}>{p.description}</p>
              {p.github && (
                <p className="text-sm" style={{ color: primary }}>GitHub: {p.github}</p>
              )}
              {p.link && (
                <p className="text-sm" style={{ color: primary }}>Live: {p.link}</p>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* ================= SKILLS ================= */}
      {skills?.length > 0 && (
        <Box className="mb-6">
          <h2 className="font-semibold text-xl mb-2" style={{ color: primary }}>Skills</h2>
          <Box className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-md text-sm"
                style={{ backgroundColor: secondary + "20", color: text }}
              >
                {skill}
              </span>
            ))}
          </Box>
        </Box>
      )}

      {/* ================= EDUCATION ================= */}
      {state.education?.length > 0 && (
        <Box className="mb-6">
          <h2 className="font-semibold text-xl mb-2" style={{ color: primary }}>Education</h2>
          {state.education.map((edu, i) => (
            <Box key={i} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold" style={{ color: text }}>{edu.school}</h3>
                <span className="text-sm" style={{ color: secondary }}>{edu.year}</span>
              </div>
              <p style={{ color: text }}>{edu.degree}</p>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
