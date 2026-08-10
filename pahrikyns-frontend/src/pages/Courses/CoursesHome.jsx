import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Paper, Button, CircularProgress } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloudIcon from "@mui/icons-material/Cloud";
import ComputerIcon from "@mui/icons-material/Computer";
import StorageIcon from "@mui/icons-material/Storage";
import { COURSE_DATA } from "../../data/courseData";

export default function CoursesHome() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mapped = Object.values(COURSE_DATA).map(c => {
      // Choose an icon based on title if you want, or just use a generic one.
      // COURSE_DATA doesn't have a top-level icon, but we can reuse the logic
      let icon = <ComputerIcon sx={{ fontSize: 40, color: "#1ed86c" }} />;
      const titleLower = c.title.toLowerCase();
      if (titleLower.includes("devops")) icon = <GitHubIcon sx={{ fontSize: 40, color: "#00eaff" }} />;
      else if (titleLower.includes("aws") || titleLower.includes("azure") || titleLower.includes("gcp") || titleLower.includes("cloud")) icon = <CloudIcon sx={{ fontSize: 40, color: "#ff9900" }} />;
      else if (titleLower.includes("database") || titleLower.includes("sql")) icon = <StorageIcon sx={{ fontSize: 40, color: "#3b82f6" }} />;
      else if (titleLower.includes("system")) icon = <ComputerIcon sx={{ fontSize: 40, color: "#00eaff" }} />;

      return {
        name: c.title,
        path: c.link,
        desc: c.desc,
        icon: icon
      };
    });
    setCategories(mapped);
    setLoading(false);
  }, []);

  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 4, minHeight: "80vh", background: "linear-gradient(135deg, #021018 0%, #041225 100%)" }}>
      <Typography variant="h3" sx={{ color: "#fff", fontWeight: 800, mb: 1, textAlign: "center" }}>
        Explore Our <span style={{ color: "#00eaff" }}>Courses</span>
      </Typography>
      <Typography sx={{ color: "#b0c4de", textAlign: "center", mb: 6, fontSize: "1.1rem" }}>
        Choose a domain to start your journey to mastery.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {categories.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.name}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                background: "rgba(4, 16, 38, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(0, 234, 255, 0.1)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 40px rgba(0, 234, 255, 0.15)",
                  border: "1px solid rgba(0, 234, 255, 0.3)",
                },
              }}
            >
              <Box sx={{ mb: 2, p: 2, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}>
                {c.icon}
              </Box>
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700, mb: 2 }}>
                {c.name}
              </Typography>
              <Typography sx={{ color: "#b0c4de", mb: 3, flex: 1 }}>
                {c.desc}
              </Typography>
              <Button
                component={Link}
                to={c.path}
                variant="outlined"
                sx={{
                  borderColor: "#00eaff",
                  color: "#00eaff",
                  fontWeight: 600,
                  textTransform: "none",
                  px: 4,
                  py: 1,
                  borderRadius: "8px",
                  "&:hover": {
                    background: "rgba(0, 234, 255, 0.1)",
                    borderColor: "#00eaff",
                  },
                }}
              >
                Explore {c.name}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
