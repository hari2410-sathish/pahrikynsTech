import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useResume } from "../../context/ResumeContext";

/* ============================
   RESUME FORM (V2 - Complete)
   - Personal
   - Skills
   - Experience (Dynamic)
   - Projects (Dynamic)
============================ */

export default function ResumeForm() {
  const { state, update } = useResume();
  const { personal, experience, projects, skills } = state;

  // --- STYLES ---
  const inputSx = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
      "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
      "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.6)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#00eaff" },
    "& .MuiInputBase-input": { color: "white" }
  };

  const accordionSx = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    "& .MuiAccordionSummary-root": {
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
    },
    "& .MuiSvgIcon-root": { color: "white" }
  };

  // --- HELPERS ---
  const updatePersonal = (field, value) => {
    update({ personal: { ...personal, [field]: value } });
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      update({ skills: [...skills, e.target.value.trim()] });
      e.target.value = "";
    }
  };

  const removeSkill = (index) => {
    update({ skills: skills.filter((_, i) => i !== index) });
  };

  // --- EXPERIENCE HANDLERS ---
  const addExperience = () => {
    const newExp = { id: Date.now(), role: "", company: "", start: "", end: "", description: "" };
    update({ experience: [...experience, newExp] });
  };

  const updateExp = (index, field, value) => {
    const newExpList = [...experience];
    newExpList[index] = { ...newExpList[index], [field]: value };
    update({ experience: newExpList });
  };

  const removeExp = (index) => {
    update({ experience: experience.filter((_, i) => i !== index) });
  };

  // --- PROJECT HANDLERS ---
  const addProject = () => {
    const newProj = { id: Date.now(), title: "", tech: "", description: "", link: "" };
    update({ projects: [...projects, newProj] });
  };

  const updateProj = (index, field, value) => {
    const newProjList = [...projects];
    newProjList[index] = { ...newProjList[index], [field]: value };
    update({ projects: newProjList });
  };

  const removeProj = (index) => {
    update({ projects: projects.filter((_, i) => i !== index) });
  };

  return (
    <Box>
      {/* ================= PERSONAL ================= */}
      <Typography fontWeight={700} mb={3} variant="h6" className="text-white">
        Personal Details
      </Typography>

      <Stack spacing={3} mb={5}>
        <TextField
          label="Full Name"
          size="small"
          value={personal?.name || ""}
          onChange={(e) => updatePersonal("name", e.target.value)}
          sx={inputSx}
        />
        <TextField
          label="Job Title"
          size="small"
          value={personal?.title || ""}
          onChange={(e) => updatePersonal("title", e.target.value)}
          sx={inputSx}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            label="Email"
            size="small"
            fullWidth
            value={personal?.email || ""}
            onChange={(e) => updatePersonal("email", e.target.value)}
            sx={inputSx}
          />
          <TextField
            label="Phone"
            size="small"
            fullWidth
            value={personal?.phone || ""}
            onChange={(e) => updatePersonal("phone", e.target.value)}
            sx={inputSx}
          />
        </Stack>
        <TextField
          label="Location"
          size="small"
          value={personal?.location || ""}
          onChange={(e) => updatePersonal("location", e.target.value)}
          sx={inputSx}
        />
        <TextField
          label="Professional Summary"
          size="small"
          multiline
          rows={3}
          value={personal?.summary || ""}
          onChange={(e) => updatePersonal("summary", e.target.value)}
          sx={inputSx}
        />
      </Stack>

      {/* ================= SKILLS ================= */}
      <Typography fontWeight={700} mb={2} variant="h6" className="text-white">Skills</Typography>
      <TextField
        size="small"
        fullWidth
        label="Add a skill"
        placeholder="Type skill & press Enter"
        onKeyDown={addSkill}
        sx={inputSx}
      />
      <Stack direction="row" spacing={1} flexWrap="wrap" mt={2} mb={5}>
        {skills?.map((skill, i) => (
          <Chip
            key={i}
            label={skill}
            onDelete={() => removeSkill(i)}
            sx={{
              mb: 1,
              bgcolor: "rgba(0, 234, 255, 0.1)",
              color: "#00eaff",
              border: "1px solid rgba(0, 234, 255, 0.3)",
              "& .MuiChip-deleteIcon": { color: "#00eaff", "&:hover": { color: "#fff" } }
            }}
          />
        ))}
      </Stack>

      {/* ================= EXPERIENCE ================= */}
      <Box mb={5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography fontWeight={700} variant="h6" className="text-white">Experience</Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={addExperience}
            sx={{ color: "#00eaff", borderColor: "#00eaff" }}
          >
            Add
          </Button>
        </Stack>

        {experience?.map((exp, i) => (
          <Accordion key={exp.id || i} disableGutters elevation={0} sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600} className="text-gray-200">{exp.role || "New Experience"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField label="Role" size="small" value={exp.role} onChange={(e) => updateExp(i, "role", e.target.value)} sx={inputSx} />
                <TextField label="Company" size="small" value={exp.company} onChange={(e) => updateExp(i, "company", e.target.value)} sx={inputSx} />
                <Stack direction="row" spacing={2}>
                  <TextField label="Start Date" size="small" fullWidth value={exp.start} onChange={(e) => updateExp(i, "start", e.target.value)} sx={inputSx} />
                  <TextField label="End Date" size="small" fullWidth value={exp.end} onChange={(e) => updateExp(i, "end", e.target.value)} sx={inputSx} />
                </Stack>
                <TextField label="Description" size="small" multiline rows={3} value={exp.description} onChange={(e) => updateExp(i, "description", e.target.value)} sx={inputSx} />
                <Button color="error" size="small" startIcon={<DeleteIcon />} onClick={() => removeExp(i)}>Remove</Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* ================= PROJECTS ================= */}
      <Box mb={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography fontWeight={700} variant="h6" className="text-white">Projects</Typography>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={addProject}
            sx={{ color: "#00eaff", borderColor: "#00eaff" }}
          >
            Add
          </Button>
        </Stack>

        {projects?.map((proj, i) => (
          <Accordion key={proj.id || i} disableGutters elevation={0} sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600} className="text-gray-200">{proj.title || "New Project"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField label="Project Title" size="small" value={proj.title} onChange={(e) => updateProj(i, "title", e.target.value)} sx={inputSx} />
                <TextField label="Technologies Used" size="small" value={proj.tech} onChange={(e) => updateProj(i, "tech", e.target.value)} sx={inputSx} />
                <TextField label="Link / GitHub" size="small" value={proj.link} onChange={(e) => updateProj(i, "link", e.target.value)} sx={inputSx} />
                <TextField label="Description" size="small" multiline rows={2} value={proj.description} onChange={(e) => updateProj(i, "description", e.target.value)} sx={inputSx} />
                <Button color="error" size="small" startIcon={<DeleteIcon />} onClick={() => removeProj(i)}>Remove</Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

    </Box>
  );
}
