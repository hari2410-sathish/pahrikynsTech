import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import { fetchAdminCategories } from "../../Adminapi/coursesAdmin";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      setLoading(true);
      const data = await fetchAdminCategories();
      setCategories(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }

  if (loading && categories.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
        <Box>
          <Typography variant="h5" fontWeight={800}>Course Categories</Typography>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>Organize your curriculum into logical groups</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton onClick={loadCategories}><RefreshIcon /></IconButton>
          </Tooltip>
          <Button variant="contained">+ Add Category</Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {categories.length === 0 ? (
        <Paper sx={{ p: 10, textAlign: "center", borderRadius: 4, background: "rgba(255,255,255,0.02)" }}>
          <Typography color="text.secondary">No categories found. Start by adding a category to your courses.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat.name}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  background: "rgba(15,23,42,0.6)", 
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "0.2s",
                  "&:hover": { borderColor: "primary.main", transform: "translateY(-4px)" }
                }}
              >
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>{cat.name}</Typography>
                    <Typography variant="body2" color="primary.main">{cat.count} Courses</Typography>
                  </Box>
                  <IconButton onClick={() => navigate(`/admin/products?category=${cat.name}`)}>
                    <ArrowForwardIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
