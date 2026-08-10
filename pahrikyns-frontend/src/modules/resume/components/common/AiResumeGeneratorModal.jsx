import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import API from "../../../../api/axios";
import { useResume } from "../../context/ResumeContext";

export default function AiResumeGeneratorModal({ open, onClose }) {
  const { update } = useResume();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description of your experience.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/resumes/generate-full", { prompt });
      const { resumeData } = res.data;

      // Update the resume context
      update(resumeData);
      
      setPrompt("");
      onClose();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to generate resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#0f172a",
          color: "#fff",
          border: "1px solid rgba(0, 234, 255, 0.2)",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#00eaff", fontWeight: "bold" }}>
        <AutoAwesomeIcon /> AI Auto-Generate Resume
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 2 }}>
          Describe your professional background, skills, and the type of role you are targeting. Our AI will instantly build a complete, professional resume for you.
          <br /><br />
          <strong className="text-yellow-400">Warning:</strong> This will overwrite the current content in your builder.
        </Typography>

        <TextField
          multiline
          rows={5}
          fullWidth
          placeholder="E.g., I'm a frontend developer with 3 years of experience in React and Node.js. I've built scalable e-commerce platforms and I have a degree in Computer Science..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.05)",
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
              "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
              "&.Mui-focused fieldset": { borderColor: "#00eaff" },
            },
          }}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ pb: 2, px: 3 }}>
        <Button 
          onClick={onClose} 
          disabled={loading} 
          sx={{ color: "#94a3b8" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          variant="contained"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
          sx={{
            bgcolor: "#00eaff",
            color: "black",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#00c4d6" },
            "&.Mui-disabled": { bgcolor: "rgba(0, 234, 255, 0.3)", color: "rgba(0,0,0,0.5)" }
          }}
        >
          {loading ? "Generating Magic..." : "Generate Now"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
