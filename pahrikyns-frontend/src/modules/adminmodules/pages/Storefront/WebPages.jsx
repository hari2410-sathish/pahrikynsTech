import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
} from "@mui/material";
import { fetchWebPages, saveWebPage, deleteWebPage } from "../../Adminapi/admin";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function WebPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({ slug: "", title: "", content: "" });

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      setLoading(true);
      const data = await fetchWebPages();
      setPages(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch web pages");
    } finally {
      setLoading(false);
    }
  }

  const handleOpen = (page = null) => {
    if (page) {
      setEditingPage(page);
      setFormData({ slug: page.slug, title: page.title, content: page.content || "" });
    } else {
      setEditingPage(null);
      setFormData({ slug: "", title: "", content: "" });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      await saveWebPage(formData);
      setOpen(false);
      loadPages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        await deleteWebPage(id);
        loadPages();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading && pages.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>Storefront Pages</Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>Manage your Terms, Privacy, FAQ and other static content</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{ borderRadius: 2 }}
        >
          Create Page
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(10,20,40,0.5)" }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.02)" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary">No pages created yet. Standard pages: terms, privacy, faq</Typography>
                </TableCell>
              </TableRow>
            ) : (
              pages.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>
                    <Typography fontWeight={700}>{p.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={p.slug} size="small" sx={{ fontFamily: "monospace", fontSize: 11 }} />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={p.isActive ? "Published" : "Draft"} 
                      color={p.isActive ? "success" : "default"} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View">
                      <IconButton size="small" onClick={() => window.open(`/pages/${p.slug}`, "_blank")}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleOpen(p)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(p.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* CREATE/EDIT DIALOG */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 800 }}>{editingPage ? "Edit Page" : "New Storefront Page"}</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Page Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Terms and Conditions"
            />
            <TextField
              label="Slug (URL path)"
              fullWidth
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. terms-of-service"
              disabled={!!editingPage}
              helperText="Once set, the slug cannot be changed easily."
            />
            <Box>
              <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 13, opacity: 0.7 }}>
                Page Content (Rich Text)
              </Typography>
              <Box sx={{ bgcolor: "white", minHeight: 400, color: "black" }}>
                <ReactQuill 
                  theme="snow" 
                  value={formData.content} 
                  onChange={(val) => setFormData(prev => ({ ...prev, content: val }))}
                  style={{ height: 400, marginBottom: 50 }}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={!formData.slug || !formData.title}>
            {editingPage ? "Update Page" : "Publish Page"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
