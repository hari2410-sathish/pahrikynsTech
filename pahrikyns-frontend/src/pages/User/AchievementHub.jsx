import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper, Tooltip, Zoom, CircularProgress, Stack, Avatar } from "@mui/material";
import axios from "../../api/axios";
import { motion, AnimatePresence } from "framer-motion";

/* ICONS */
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarsIcon from "@mui/icons-material/Stars";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import LockIcon from "@mui/icons-material/Lock";

const BADGE_ICONS = {
  "Quick Learner": <LocalFireDepartmentIcon sx={{ fontSize: 32, color: "#ff4d4d" }} />,
  "First Milestone": <StarsIcon sx={{ fontSize: 32, color: "#ffcc00" }} />,
  "Course Master": <EmojiEventsIcon sx={{ fontSize: 32, color: "#ffd700" }} />,
  "Certified Pro": <WorkspacePremiumIcon sx={{ fontSize: 32, color: "#00eaff" }} />,
  default: <EmojiEventsIcon sx={{ fontSize: 32, color: "#94a3b8" }} />
};

export default function AchievementHub({ miniMode = false }) {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await axios.get("/achievements");
      setAchievements(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
      <CircularProgress size={30} sx={{ color: "rgba(255,255,255,0.2)" }} />
    </Box>
  );

  if (miniMode) {
    return (
      <Stack spacing={2}>
        {achievements.length === 0 ? (
          <Typography variant="caption" sx={{ opacity: 0.4 }}>No milestones unlocked.</Typography>
        ) : (
          achievements.slice(0, 3).map((a) => (
            <Stack key={a.id} direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 40, height: 40, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {BADGE_ICONS[a.title] || BADGE_ICONS.default}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={800} sx={{ color: "white", fontSize: 13 }}>{a.title}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.5, display: "block" }}>{a.description}</Typography>
              </Box>
            </Stack>
          ))
        )}
      </Stack>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={900} mb={1} sx={{ color: "white" }}>Hall of Fame</Typography>
      <Typography variant="body1" sx={{ opacity: 0.5, mb: 6 }}>Your collection of digital excellence and milestones.</Typography>
      
      {achievements.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", bgcolor: "rgba(255,255,255,0.01)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 6 }}>
           <LockIcon sx={{ fontSize: 60, color: "rgba(255,255,255,0.1)", mb: 2 }} />
           <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.3)" }}>Begin your first lesson to manifest your first achievement.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <AnimatePresence>
            {achievements.map((a, idx) => (
              <Grid item xs={12} sm={6} md={4} key={a.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Paper sx={{
                    p: 4,
                    bgcolor: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 5,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.04)",
                      transform: "translateY(-8px)",
                      borderColor: "#00eaff"
                    },
                    transition: "0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  }}>
                    <Box sx={{ 
                      width: 70, 
                      height: 70, 
                      borderRadius: "50%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      mb: 3,
                      bgcolor: "rgba(0,234,255,0.05)",
                      border: "1px solid rgba(0,234,255,0.1)"
                    }}>
                      {BADGE_ICONS[a.title] || BADGE_ICONS.default}
                    </Box>
                    <Typography fontWeight={900} variant="h6" color="white" gutterBottom>{a.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.5, mb: 2 }}>{a.description}</Typography>
                    <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.05)" }} />
                    <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>
                      Manifested {new Date(a.unlockedAt).toLocaleDateString()}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      )}
    </Box>
  );
}

function Divider({ sx, ...props }) {
  return <Box sx={{ height: "1px", width: "100%", bgcolor: "rgba(255,255,255,0.1)", ...sx }} {...props} />;
}
