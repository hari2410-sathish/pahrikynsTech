import React from "react";
import { Box } from "@mui/material";
import { useResume } from "../context/ResumeContext";
import EditableField from "../components/common/EditableField";

/** ========================================================
 * PRO TEMPLATE — CYBERPUNK EDITION (MASTER PRO LEVEL)
 * High-tech, digital identity design.
 * - Deep Space Dark (#060714)
 * - Neon Accents (#00eaff, #7b3fe4)
 * - Glassmorphism Cards
 * ======================================================== */

export default function ProTemplate({ config, readOnly = false }) {
  const { state, update } = useResume();
  const { personal, experience, projects, skills } = state;

  const { colorTheme, fontFamily } = config || {};
  // Force Cyberpunk theme overrides if not provided
  const primary = "#00eaff"; // Cyan
  const secondary = "#7b3fe4"; // Purple
  const text = "#ffffff";
  const background = "#060714";
  const font = fontFamily || "Inter, sans-serif";

  // Helper for inline updates
  const updatePersonal = (field, val) => {
    if (readOnly) return;
    update({ personal: { ...personal, [field]: val } });
  };

  return (
    <Box
      id="resume-preview"
      className="w-full mx-auto p-0 min-h-[1100px] relative overflow-hidden"
      sx={{
        fontFamily: font,
        maxWidth: "900px",
        backgroundColor: background,
        color: text,
      }}
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ================= HEADER ================= */}
      <Box className="relative z-10 p-8 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <h1 className="text-5xl font-black tracking-tight mb-2 uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 drop-shadow-[0_0_10px_rgba(0,234,255,0.5)]">
            <EditableField
              value={personal?.name}
              onChange={(val) => updatePersonal("name", val)}
              placeholder="YOUR NAME"
              readOnly={readOnly}
              style={{ fontWeight: 900 }}
            />
          </span>
        </h1>
        <p className="text-xl tracking-widest uppercase font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <span className="w-8 h-[2px] bg-cyan-400 inline-block shadow-[0_0_10px_#00eaff]"></span>
          <EditableField
            value={personal?.title}
            onChange={(val) => updatePersonal("title", val)}
            placeholder="JOB TITLE"
            readOnly={readOnly}
          />
        </p>

        <div className="flex flex-wrap gap-4 text-sm font-mono text-gray-300">
          <span className="px-3 py-1 border border-white/10 rounded bg-black/20 hover:border-cyan-500/50 transition-colors">
            <EditableField value={personal?.email} onChange={(v) => updatePersonal("email", v)} placeholder="EMAIL" readOnly={readOnly} />
          </span>
          <span className="px-3 py-1 border border-white/10 rounded bg-black/20 hover:border-purple-500/50 transition-colors">
            <EditableField value={personal?.phone} onChange={(v) => updatePersonal("phone", v)} placeholder="PHONE" readOnly={readOnly} />
          </span>
          <span className="px-3 py-1 border border-white/10 rounded bg-black/20 hover:border-white/30 transition-colors">
            <EditableField value={personal?.location} onChange={(v) => updatePersonal("location", v)} placeholder="LOCATION" readOnly={readOnly} />
          </span>
        </div>
      </Box>

      {/* ================= LAYOUT ================= */}
      <Box className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-12 gap-8">

        {/* LEFT COLUMN (4 cols) */}
        <Box className="md:col-span-4 flex flex-col gap-8">

          {/* SKILLS */}
          <Box className="p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(123,63,228,0.15)] transition-shadow">
            <h3 className="text-lg font-bold text-purple-400 mb-4 uppercase tracking-wider border-b border-purple-500/20 pb-2">Technical Arsenal</h3>
            <div className="flex flex-wrap gap-2">
              {(skills?.length > 0 ? skills : ["React", "Node.js", "AWS", "Figma"]).map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs font-bold text-white bg-purple-500/20 border border-purple-500/30 rounded shadow-[0_0_5px_rgba(123,63,228,0.2)]">
                  <EditableField
                    value={s}
                    onChange={(v) => {
                      const newSkills = [...skills];
                      newSkills[i] = v;
                      update({ skills: newSkills });
                    }}
                    placeholder="Skill"
                    readOnly={readOnly}
                  />
                </span>
              ))}
            </div>
          </Box>

          {/* EDUCATION */}
          {state.education?.length > 0 && (
            <Box className="p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider border-b border-white/10 pb-2">Education</h3>
              {state.education.map((edu, i) => (
                <div key={i} className="mb-4 last:mb-0">
                  <div className="text-cyan-300 font-bold">{edu.school}</div>
                  <div className="text-sm text-gray-400">{edu.degree}</div>
                  <div className="text-xs text-gray-500 mt-1 font-mono">{edu.year}</div>
                </div>
              ))}
            </Box>
          )}
        </Box>

        {/* RIGHT COLUMN (8 cols) */}
        <Box className="md:col-span-8 flex flex-col gap-8">

          {/* SUMMARY */}
          {(personal?.summary || !readOnly) && (
            <Box className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">01.</span> PROFILE SUMMARY
              </h2>
              <p className="leading-relaxed text-gray-300 text-lg font-light">
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
          <Box>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">02.</span> EXPERIENCE
            </h2>
            {experience?.length > 0 ? experience.map((exp, i) => (
              <div key={i} className="mb-6 p-6 rounded-2xl bg-[#0a0c16] border border-white/10 hover:border-cyan-500/30 transition-colors shadow-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-cyan-300">
                    <EditableField value={exp.role} onChange={(v) => {
                      const newExp = [...experience];
                      newExp[i].role = v;
                      update({ experience: newExp });
                    }} placeholder="Role" readOnly={readOnly} />
                  </h3>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                    <EditableField value={exp.start} onChange={(v) => {
                      const newExp = [...experience];
                      newExp[i].start = v;
                      update({ experience: newExp });
                    }} placeholder="Start" readOnly={readOnly} />
                    —
                    <EditableField value={exp.end} onChange={(v) => {
                      const newExp = [...experience];
                      newExp[i].end = v;
                      update({ experience: newExp });
                    }} placeholder="End" readOnly={readOnly} />
                  </span>
                </div>
                <div className="text-purple-300 text-sm font-semibold mb-3">
                  <EditableField value={exp.company} onChange={(v) => {
                    const newExp = [...experience];
                    newExp[i].company = v;
                    update({ experience: newExp });
                  }} placeholder="Company" readOnly={readOnly} />
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
                  <EditableField value={exp.description} onChange={(v) => {
                    const newExp = [...experience];
                    newExp[i].description = v;
                    update({ experience: newExp });
                  }} placeholder="Description..." multiline readOnly={readOnly} />
                </p>
              </div>
            )) : (
              <div className="p-4 border border-dashed border-gray-700 rounded text-gray-500 text-center">No experience added yet.</div>
            )}
          </Box>

          {/* PROJECTS */}
          <Box>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">03.</span> KEY PROJECTS
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {projects?.length > 0 ? projects.map((p, i) => <div key={i} className="p-5 rounded-2xl bg-[#0a0c16] border border-white/10 hover:shadow-[0_0_15px_rgba(0,234,255,0.1)] transition-shadow">
                <h3 className="text-lg font-bold text-white mb-1">
                  <EditableField value={p.title} onChange={(v) => {
                    const newProj = [...projects];
                    newProj[i].title = v;
                    update({ projects: newProj });
                  }} placeholder="Project Title" readOnly={readOnly} />
                </h3>
                <div className="text-xs text-cyan-500/80 mb-2 font-mono">
                  <EditableField value={p.tech} onChange={(v) => {
                    const newProj = [...projects];
                    newProj[i].tech = v;
                    update({ projects: newProj });
                  }} placeholder="Technologies" readOnly={readOnly} />
                </div>
                <p className="text-gray-400 text-sm">
                  <EditableField value={p.description} onChange={(v) => {
                    const newProj = [...projects];
                    newProj[i].description = v;
                    update({ projects: newProj });
                  }} placeholder="Project Description..." multiline readOnly={readOnly} />
                </p>
              </div>
              ) : (
                <div className="p-4 border border-dashed border-gray-700 rounded text-gray-500 text-center">No projects added yet.</div>
              )}
            </div>
          </Box>

        </Box>
      </Box>

      {/* DECORATIVE FOOTER LINE */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-white to-cyan-500 opacity-50"></div>
    </Box>
  );
}
