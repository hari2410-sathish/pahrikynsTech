import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Grid, Paper, Button, TextField, InputAdornment, Chip } from "@mui/material";
import { COURSE_DATA } from "../../data/courseData.jsx";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function CategoryPage() {
  const { category } = useParams();
  const [search, setSearch] = useState("");
  const data = COURSE_DATA[category];

  if (!data) {
    return (
      <Box sx={{ p: 4, color: "white", textAlign: "center" }}>
        <Typography variant="h4">Category not found</Typography>
        <Button component={Link} to="/courses" sx={{ mt: 2 }} variant="contained">
          Back to Courses
        </Button>
      </Box>
    );
  }

  const filteredItems = data.items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: "90vh",
        background: "linear-gradient(135deg, #021018 0%, #041225 100%)",
        color: "white",
      }}
    >
      {/* HEADER */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #00eaff, #0072ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: "4px",
            fontSize: { xs: "2.5rem", md: "3.75rem" }
          }}
        >
          {data.title}
        </Typography>
        <Typography sx={{ color: "#b0c4de", fontSize: "1.1rem", maxWidth: 600, mx: "auto", mb: 4 }}>
          {data.desc}
        </Typography>

        {/* SEARCH & FILTER BAR */}
        <Box sx={{ maxWidth: 800, mx: "auto", display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          <TextField 
            variant="outlined" 
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ 
              flex: 1, 
              minWidth: 300,
              "& .MuiOutlinedInput-root": {
                color: "white",
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 3,
                "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                "&:hover fieldset": { borderColor: "#00eaff" },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button 
            startIcon={<FilterListIcon />}
            sx={{ 
              borderRadius: 3, 
              color: "white", 
              border: "1px solid rgba(255,255,255,0.1)",
              px: 3,
              textTransform: "none",
              fontWeight: 700
            }}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {/* GRID */}
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: 1400, mx: "auto" }}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
            <Paper
              component={Link}
              to={item.link}
              elevation={4}
              sx={{
                position: "relative",
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "20px",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(0, 234, 255, 0.15)",
                  border: "1px solid rgba(0, 234, 255, 0.4)",
                  "& .icon-box": {
                    transform: "scale(1.1) rotate(5deg)",
                    background: "rgba(0, 234, 255, 0.15)",
                  },
                  "& .arrow-icon": {
                    opacity: 1,
                    transform: "translateX(0)",
                  }
                },
              }}
            >
              <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 0.5 }}>
                <Chip label="Intermediate" size="small" sx={{ bgcolor: "rgba(0,234,255,0.1)", color: "#00eaff", fontSize: 10, fontWeight: 800, height: 20 }} />
              </Box>

              <Box
                className="icon-box"
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  color: "#00eaff",
                  transition: "0.3s ease",
                  "& svg": { fontSize: 35 },
                }}
              >
                {item.icon}
              </Box>

              <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, mb: 1 }}>
                {item.name}
              </Typography>

              <Typography sx={{ color: "#8fa9bf", fontSize: "0.85rem", mb: 2, flex: 1 }}>
                Master {item.name} automation and best practices.
              </Typography>

              <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6" sx={{ color: "#00eaff", fontWeight: 900 }}>₹FREE</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", textDecoration: "line-through" }}>₹499</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#00eaff",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                Start Learning
                <ArrowForwardIcon
                  className="arrow-icon"
                  sx={{
                    ml: 1,
                    fontSize: 18,
                    opacity: 0,
                    transform: "translateX(-10px)",
                    transition: "0.3s ease"
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {filteredItems.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 10, opacity: 0.5 }}>
          <Typography variant="h5">No courses found matching "{search}"</Typography>
        </Box>
      )}
    </Box>
  );
}
