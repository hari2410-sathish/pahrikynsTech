// src/pages/User/Certificates.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Grid, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import DownloadIcon from "@mui/icons-material/Download";
import { getDashboardStats } from "../../api/auth";

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await getDashboardStats();
        setCerts(res.data?.certificates || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#00eaff" }} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 800,
          mb: 4,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        My Certifications
      </Typography>

      {certs.length > 0 ? (
        <Grid container spacing={4}>
          {certs.map((c, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div whileHover={{ scale: 1.03 }}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,215,0,0.3)",
                    boxShadow: "0 0 20px rgba(255,215,0,0.1)",
                    position: "relative",
                  }}
                >
                  <WorkspacePremiumIcon sx={{ fontSize: 64, color: "#ffd700", mb: 2 }} />
                  <Typography variant="h6" fontWeight={700} sx={{ color: "#fff", mb: 1 }}>
                    {c.course?.title || "Course Certificate"}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 13, mb: 3 }}>
                    Issued on {new Date(c.issueDate).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    sx={{
                      bgcolor: "rgba(255,215,0,0.15)",
                      color: "#ffd700",
                      border: "1px solid rgba(255,215,0,0.3)",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "rgba(255,215,0,0.25)" },
                    }}
                  >
                    Download PDF
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            p: 8,
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}>
            No certificates earned yet. Finish a course to get certified!
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
