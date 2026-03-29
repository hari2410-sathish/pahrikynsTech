import React, { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Button,
  Chip,
  Stack,
  Snackbar,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createAdminCourse } from "../../Adminapi/coursesAdmin";

/* ICONS */
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import LocalLibraryTwoToneIcon from "@mui/icons-material/LocalLibraryTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const DEFAULT_CATEGORY = "devops";

export default function AddCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: DEFAULT_CATEGORY,
    level: "Beginner",
    price: "",
    discountPrice: "",
    durationHours: "",
    thumbnailUrl: "",
    shortDescription: "",
    description: "",
    tagsInput: "",
    tags: [],
    isActive: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ open: false, msg: "", type: "error" });

  const showToast = (msg, type = "error") => setToast({ open: true, msg, type });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "title" && !prev.slug ? { slug: slugify(value) } : {}),
    }));
  };

  const slugify = (value) =>
    value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const handleToggleActive = (e) => {
    setForm((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const raw = form.tagsInput.trim();
    if (!raw) return;
    const parts = raw.split(",").map((t) => t.trim());
    const unique = Array.from(new Set([...form.tags, ...parts])).filter(Boolean);
    setForm((prev) => ({ ...prev, tags: unique, tagsInput: "" }));
  };

  const handleRemoveTag = (tag) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const estimatedLessons = useMemo(() => {
    const hrs = Number(form.durationHours || 0);
    if (!hrs) return "STANDBY...";
    const min = Math.max(hrs * 4, 1);
    const max = hrs * 6;
    return `${min}-${max} MODULES DETECTED`;
  }, [form.durationHours]);

  const validate = () => {
    if (!form.title.trim()) return "MANDATORY: TITLE REQUIRED";
    if (!form.slug.trim()) return "MANDATORY: SLUG REQUIRED";
    if (!form.shortDescription.trim()) return "MANDATORY: DESCRIPTION REQUIRED";
    if (!form.price) return "MANDATORY: PRICE REQUIRED";
    if (form.discountPrice && Number(form.discountPrice) > Number(form.price)) {
      return "DATA ALIGNMENT ERROR: DISCOUNT EXCEEDS BASE PRICE";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return showToast(error, "error");

    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
      durationHours: form.durationHours ? Number(form.durationHours) : undefined,
      thumbnailUrl: form.thumbnailUrl || undefined,
    };

    try {
      setSubmitting(true);
      await createAdminCourse(payload);
      showToast("MODULE INITIALIZED SUCCESSFULLY", "success");
      setTimeout(() => navigate("/admin/courses"), 800);
    } catch (err) {
      showToast("INITIALIZATION FAILED: CHECK CORE LOGS");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER SECTION */}
      <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                CURRICULUM INITIALIZATION · NEW MODULE
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Manifest Entry
            </Typography>
        </Box>
        <FormControlLabel
          control={<Switch checked={form.isActive} onChange={handleToggleActive} sx={switchStyle} />}
          label={<Typography sx={{ fontWeight: 900, color: form.isActive ? "#22c55e" : "rgba(255,255,255,0.3)", fontSize: 12, letterSpacing: 1 }}>{form.isActive ? "ONLINE" : "OFFLINE"}</Typography>}
        />
      </Stack>

      {/* FORM CONTAINER */}
      <Paper sx={{ p: 5, borderRadius: 8, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backgroundImage: "none", boxShadow: "0 40px 100px rgba(0,0,0,0.4)" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            {/* LEFT COLUMN: CORE INFO */}
            <Grid item xs={12} md={8}>
              <Stack spacing={4}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "flex", alignItems: "center", gap: 1, letterSpacing: 1 }}>
                    <SchoolTwoToneIcon sx={{ fontSize: 14 }} /> CORE MODULE IDENTITY
                  </Typography>
                  <TextField fullWidth placeholder="ENTER MODULE TITLE..." value={form.title} onChange={handleChange("title")} sx={fieldStyle} required />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>TRANSMISSION SLUG</Typography>
                  <TextField fullWidth placeholder="AUTO-GENERATED..." value={form.slug} onChange={(e) => setForm(p => ({ ...p, slug: slugify(e.target.value) }))} sx={fieldStyle} required />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>EXECUTIVE SUMMARY</Typography>
                  <TextField fullWidth multiline rows={3} placeholder="BRIEF ARCHITECTURAL OVERVIEW..." value={form.shortDescription} onChange={handleChange("shortDescription")} sx={fieldStyle} required />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>DEEP PROTOCOL DOCUMENTATION</Typography>
                  <Box sx={{ "& .ql-container": { border: "1px solid rgba(255,255,255,0.06) !important", borderRadius: "0 0 14px 14px", bgcolor: "rgba(255,255,255,0.01)", height: 300, color: "white" }, "& .ql-toolbar": { border: "1px solid rgba(255,255,255,0.06) !important", borderRadius: "14px 14px 0 0", bgcolor: "rgba(255,255,255,0.03)" } }}>
                    <ReactQuill theme="snow" value={form.description} onChange={(val) => setForm(p => ({ ...p, description: val }))} />
                  </Box>
                </Box>
              </Stack>
            </Grid>

            {/* RIGHT COLUMN: METADATA & FISCAL */}
            <Grid item xs={12} md={4}>
              <Stack spacing={5}>
                <Box>
                   <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>SECTOR ASSIGNMENT</Typography>
                   <FormControl fullWidth sx={selectStyle}>
                      <Select value={form.category} onChange={handleChange("category")}>
                        <MenuItem value="devops">DEVOPS</MenuItem>
                        <MenuItem value="aws">AWS CLOUD</MenuItem>
                        <MenuItem value="cloud">CLOUD NATIVE</MenuItem>
                        <MenuItem value="linux">LINUX TERMINAL</MenuItem>
                        <MenuItem value="programming">PROGRAMMING</MenuItem>
                      </Select>
                   </FormControl>
                </Box>

                <Box>
                   <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>INTENSITY LAYER</Typography>
                   <FormControl fullWidth sx={selectStyle}>
                      <Select value={form.level} onChange={handleChange("level")}>
                        {LEVELS.map(l => <MenuItem key={l} value={l}>{l.toUpperCase()}</MenuItem>)}
                      </Select>
                   </FormControl>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>BASE VALUE (₹)</Typography>
                    <TextField type="number" fullWidth value={form.price} onChange={handleChange("price")} sx={fieldStyle} required />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>PROMO VALUE (₹)</Typography>
                    <TextField type="number" fullWidth value={form.discountPrice} onChange={handleChange("discountPrice")} sx={fieldStyle} />
                  </Grid>
                </Grid>

                <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>UPTIME DURATION (HRS)</Typography>
                    <TextField type="number" fullWidth value={form.durationHours} onChange={handleChange("durationHours")} sx={fieldStyle} helperText={estimatedLessons} FormHelperTextProps={{ sx: { color: "#00eaff", fontWeight: 900, fontSize: 10, letterSpacing: 1, mt: 1 } }} />
                </Box>

                <Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>MAPPING THUMBNAIL URL</Typography>
                    <TextField fullWidth placeholder="HTTPS://..." value={form.thumbnailUrl} onChange={handleChange("thumbnailUrl")} sx={fieldStyle} />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", mb: 2, display: "block", letterSpacing: 1 }}>NEURAL TAGS</Typography>
                  <Stack direction="row" spacing={1} mb={2}>
                    <TextField size="small" placeholder="DEV, CLOUD, K8S..." value={form.tagsInput} onChange={handleChange("tagsInput")} sx={fieldStyle} onKeyPress={e => e.key === 'Enter' && handleAddTag(e)} />
                    <IconButton onClick={handleAddTag} sx={{ bgcolor: "rgba(0, 234, 255, 0.1)", color: "#00eaff" }}>
                      <AddCircleTwoToneIcon />
                    </IconButton>
                  </Stack>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {form.tags.map(t => <Chip key={t} label={t.toUpperCase()} onDelete={() => handleRemoveTag(t)} size="small" sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white", fontWeight: 900, fontSize: 10, borderColor: "rgba(255,255,255,0.1)", borderRadius: 1.5 }} variant="outlined" />)}
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.06)" }} />

          <Stack direction="row" spacing={3} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate("/admin/courses")} startIcon={<CancelTwoToneIcon />} sx={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontWeight: 900, px: 4 }}>ABORT</Button>
            <Button type="submit" variant="contained" disabled={submitting} startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveTwoToneIcon />} sx={{ borderRadius: "12px", bgcolor: "#00eaff", color: "black", fontWeight: 900, px: 6, "&:hover": { bgcolor: "#00c4d6" }, boxShadow: "0 20px 40px rgba(0, 234, 255, 0.2)" }}>{submitting ? "INITIALIZING..." : "INITIALIZE MODULE"}</Button>
          </Stack>
        </form>
      </Paper>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert severity={toast.type} variant="filled" sx={{ borderRadius: 3, fontWeight: 900, bgcolor: toast.type === "success" ? "#22c55e" : "#f43f5e" }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}

const fieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    color: "white",
    bgcolor: "rgba(255,255,255,0.02)",
    fontWeight: 700,
    fontSize: 14,
    "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.15)" }
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.15)", opacity: 1, letterSpacing: 1 }
};

const selectStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    color: "white",
    bgcolor: "rgba(255,255,255,0.02)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.06)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" }
  },
  "& .MuiSvgIcon-root": { color: "#00eaff" }
};

const switchStyle = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: "#22c55e" },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#22c55e" }
};
