import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Tooltip,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import { fetchBlogPosts, saveBlogPost, deleteBlogPost, getBlogStats } from "../../Adminapi/admin";
import { motion, AnimatePresence } from "framer-motion";

/* ICONS */
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddIcon from "@mui/icons-material/Add";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DraftsTwoToneIcon from "@mui/icons-material/DraftsTwoTone";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ 
    slug: "", 
    title: "", 
    content: "", 
    author: "Admin",
    thumbnail: "",
    isActive: true 
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [postList, blogStats] = await Promise.all([
        fetchBlogPosts(),
        getBlogStats()
      ]);
      setPosts(postList || []);
      setStats(blogStats || { total: 0, published: 0, drafts: 0 });
    } catch (err) {
      console.error(err);
      setError("Failed to synchronize blog catalog.");
    } finally {
      setLoading(false);
    }
  }

  const handleOpen = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({ 
        slug: post.slug, 
        title: post.title, 
        content: post.content || "", 
        author: post.author || "Admin",
        thumbnail: post.thumbnail || "",
        isActive: post.isActive 
      });
    } else {
      setEditingPost(null);
      setFormData({ 
        slug: "", 
        title: "", 
        content: "", 
        author: "Admin",
        thumbnail: "",
        isActive: true 
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      await saveBlogPost(formData);
      setOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanent erasure of this article? This cannot be undone.")) {
      try {
        await deleteBlogPost(id);
        loadData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading && posts.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress size={40} sx={{ color: "#00eaff" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      {/* HEADER SECTION */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6, alignItems: "flex-end" }}>
        <Box>
           <Stack direction="row" spacing={1} alignItems="center" mb={1}>
             <ArticleTwoToneIcon sx={{ color: "#00eaff", fontSize: 28 }} />
             <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: "-0.02em", color: "white" }}>Editorial Center</Typography>
           </Stack>
           <Typography variant="body2" sx={{ opacity: 0.5, fontWeight: 500, color: "white" }}>
             Orchestrate your content ecosystem and SEO trajectory.
           </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ 
            borderRadius: 3, 
            px: 4, 
            py: 1.5, 
            fontWeight: 900, 
            background: "linear-gradient(90deg, #00eaff, #00c4d6)",
            boxShadow: "0 8px 25px rgba(0, 234, 255, 0.25)"
          }}
        >
          Draft New Article
        </Button>
      </Box>

      {/* KPI GRID */}
      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} sm={4}>
          <KpiCard label="Total Catalog" value={stats.total} icon={<ArticleTwoToneIcon sx={{ color: "#00eaff" }} />} color="#00eaff" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard label="Live Articles" value={stats.published} icon={<PublishedWithChangesIcon sx={{ color: "#22c55e" }} />} color="#22c55e" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <KpiCard label="Drafting" value={stats.drafts} icon={<DraftsTwoToneIcon sx={{ color: "#f59e0b" }} />} color="#f59e0b" />
        </Grid>
      </Grid>

      {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 3 }}>{error}</Alert>}

      {/* ARTICLES GRID */}
      <Grid container spacing={4}>
        <AnimatePresence mode="popLayout">
          {posts.map((post, idx) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card sx={postCardStyle}>
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={post.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800"}
                      sx={{ filter: "brightness(0.8)" }}
                    />
                    <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, p: 2, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
                       <Chip 
                        label={post.isActive ? "PUBLISHED" : "DRAFT"}
                        size="small"
                        sx={{ 
                          bgcolor: post.isActive ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.1)", 
                          color: post.isActive ? "#22c55e" : "#fff",
                          fontWeight: 900,
                          fontSize: 10,
                          border: `1px solid ${post.isActive ? "#22c55e" : "rgba(255,255,255,0.2)"}`
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={900} mb={1} noWrap sx={{ color: "white" }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.4, mb: 3, minHeight: 40, color: "white" }}>
                      {post.content ? post.content.replace(/<[^>]*>?/gm, "").substring(0, 80) + "..." : "Manifesting content..."}
                    </Typography>
                    
                    <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.05)" }} />
                    
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                       <Stack direction="row" spacing={1} alignItems="center">
                         <Avatar sx={{ width: 24, height: 24, bgcolor: "#00eaff", fontSize: 10, fontWeight: 900 }}>{post.author?.[0]}</Avatar>
                         <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.6, color: "white" }}>{post.author}</Typography>
                       </Stack>
                       <Box sx={{ display: "flex", gap: 0.5 }}>
                          <Tooltip title="View Live">
                            <IconButton size="small" onClick={() => window.open(`/blog/${post.slug}`, "_blank")} sx={{ color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.05)" }}>
                              <VisibilityTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleOpen(post)} sx={{ color: "white", bgcolor: "rgba(255, 255, 255, 0.05)" }}>
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error" onClick={() => handleDelete(post.id)} sx={{ bgcolor: "rgba(239, 68, 68, 0.05)" }}>
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                       </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* CREATE/EDIT DIALOG */}
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        fullWidth 
        maxWidth="lg"
        PaperProps={{
          sx: { bgcolor: "#0f172a", backgroundImage: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6 }
        }}
      >
        <DialogTitle sx={{ p: 4, pb: 2 }}>
           <Typography variant="h5" fontWeight={900} sx={{ color: "white" }}>{editingPost ? "Refine Article" : "Compose New Article"}</Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 4, pb: 4 }}>
          <Stack spacing={4} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  label="ARTICLE IDENTITY (TITLE)"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    const slug = val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
                    setFormData({ ...formData, title: val, slug: editingPost ? formData.slug : slug });
                  }}
                  sx={dialogInputStyle}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="URL SLUG"
                  fullWidth
                  value={formData.slug}
                  disabled={!!editingPost}
                  sx={dialogInputStyle}
                />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="AUTHOR SIGNATURE"
                  fullWidth
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  sx={dialogInputStyle}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label="THUMBNAIL RESOURCE (URL)"
                  fullWidth
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  sx={dialogInputStyle}
                />
              </Grid>
            </Grid>

            <Box>
              <Typography sx={{ fontWeight: 800, mb: 1.5, fontSize: 11, color: "#00eaff", letterSpacing: 1 }}>
                MANIFEST CONTENT
              </Typography>
              <Box sx={{ bgcolor: "#fff", borderRadius: 3, overflow: "hidden", minHeight: 450 }}>
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                  style={{ height: 400 }}
                />
              </Box>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="caption" sx={{ fontWeight: 800, opacity: 0.5, color: "white" }}>STATUS PREFERENCE:</Typography>
              <Button 
                variant={formData.isActive ? "contained" : "outlined"} 
                color="success" 
                onClick={() => setFormData({ ...formData, isActive: true })}
                sx={{ borderRadius: 2, fontWeight: 900 }}
              >
                PUBLISHED
              </Button>
              <Button 
                variant={!formData.isActive ? "contained" : "outlined"} 
                color="inherit" 
                onClick={() => setFormData({ ...formData, isActive: false })}
                sx={{ borderRadius: 2, fontWeight: 900, color: !formData.isActive ? "black" : "white" }}
              >
                DRAFT
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 0 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 800 }}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSave} 
            disabled={!formData.slug || !formData.title}
            sx={{ px: 4, py: 1.2, borderRadius: 2.5, fontWeight: 900, background: "linear-gradient(90deg, #00eaff, #7b3fe4)" }}
          >
            {editingPost ? "Update Narrative" : "Manifest Article"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function KpiCard({ label, value, icon, color }) {
  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: 5, 
      background: "rgba(255,255,255,0.02)", 
      border: `1px solid ${color}22`,
      position: "relative",
      overflow: "hidden"
    }}>
      <Box sx={{ position: "absolute", top: -10, right: -10, opacity: 0.1 }}>{React.cloneElement(icon, { sx: { fontSize: 80, color } })}</Box>
      <Stack direction="row" spacing={2} alignItems="center" mb={1}>
        <Box sx={{ bgcolor: `${color}11`, p: 1, borderRadius: 2 }}>{icon}</Box>
        <Typography variant="caption" sx={{ fontWeight: 800, opacity: 0.5, letterSpacing: 1, color: "white" }}>{label}</Typography>
      </Stack>
      <Typography variant="h4" fontWeight={900} sx={{ color: "white" }}>{value}</Typography>
    </Paper>
  );
}

const postCardStyle = {
  borderRadius: 6,
  overflow: "hidden",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.05)",
  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": { 
    transform: "translateY(-12px)", 
    borderColor: "#00eaff",
    bgcolor: "rgba(255,255,255,0.04)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
  }
};

const dialogInputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    color: "white",
    bgcolor: "rgba(255,255,255,0.03)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)", fontWeight: 800, fontSize: 12 },
  "& .MuiInputLabel-root.Mui-focused": { color: "#00eaff" }
};
