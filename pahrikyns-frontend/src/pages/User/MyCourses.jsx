import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getMyCourses } from "../../api/course";
import RazorpayButton from "../../components/common/RazorpayButton";
import { useAuth } from "../../contexts/AuthContext";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getMyCourses();
      // Adjust based on the actual API structure
      setCourses(res.data || res || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, md: 0 } }}>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 800,
          mb: 4,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        My Courses
      </Typography>

      {courses.length > 0 ? (
        <Grid container spacing={4}>
          {courses.map((c, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                <Paper
                  sx={{
                    p: 2.5,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    overflow: "hidden",
                    position: "relative",
                    "&:before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "4px",
                      background: "linear-gradient(90deg, #00eaff, #7b3fe4)",
                      opacity: 0.8
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={c.course?.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80"}
                    alt={c.course?.title}
                    sx={{
                      width: "100%",
                      height: 180,
                      borderRadius: 3,
                      objectFit: "cover",
                      mb: 2
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 19,
                      fontWeight: 700,
                      color: "#fff",
                      mb: 1,
                      lineHeight: 1.3
                    }}
                  >
                    {c.course?.title}
                  </Typography>

                  <Typography 
                    sx={{ 
                      color: "rgba(255,255,255,0.6)", 
                      fontSize: 14,
                      flexGrow: 1,
                      mb: 3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}
                  >
                    {c.course?.description}
                  </Typography>

                  {/* PAYMENT / PROGRESS UI */}
                  {c.isPaid ? (
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: 13, color: "#00eaff", textTransform: "uppercase", letterSpacing: 1 }}>
                          Progress
                        </Typography>
                        <Typography sx={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>
                          {c.progress || 0}%
                        </Typography>
                      </Box>
                      <Box sx={{ width: "100%", height: 6, bgcolor: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden", mb: 3 }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${c.progress || 0}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          style={{ 
                            height: "100%", 
                            background: "linear-gradient(90deg, #00eaff, #7b3fe4)", 
                            borderRadius: 3 
                          }}
                        />
                      </Box>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        onClick={() => navigate(`/courses/${c.course?.category || "general"}/${c.course?.id}`)}
                        sx={{ 
                          py: 1.2,
                          borderRadius: 2, 
                          fontWeight: 700, 
                          background: "rgba(0,234,255,0.1)",
                          border: "1px solid rgba(0,234,255,0.3)",
                          color: "#00eaff",
                          textTransform: "none",
                          fontSize: 15,
                          "&:hover": { 
                            background: "rgba(0,234,255,0.2)", 
                            borderColor: "#00eaff",
                            boxShadow: "0 0 15px rgba(0,234,255,0.3)"
                          }
                        }}
                      >
                        {c.progress > 0 ? "Resume Learning" : "Start Course"}
                      </Button>
                    </Box>
                  ) : (
                    <Box>
                      <Typography
                        sx={{
                          mb: 2,
                          fontWeight: 800,
                          fontSize: 20,
                          color: "#fff",
                        }}
                      >
                        ₹{c.course?.price || 0}
                      </Typography>

                      <RazorpayButton
                        courseId={c.course?.id}
                        courseTitle={c.course?.title}
                        user={user}
                        onSuccess={load}
                      />
                    </Box>
                  )}
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ 
          p: 6, 
          textAlign: "center", 
          borderRadius: 4, 
          background: "rgba(255,255,255,0.03)", 
          border: "1px dashed rgba(255,255,255,0.15)" 
        }}>
          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>
            No courses found. Start your learning journey today!
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 3, borderColor: "#00eaff", color: "#00eaff" }}
            onClick={() => navigate("/courses")}
          >
            Browse Courses
          </Button>
        </Paper>
      )}
    </Box>
  );
}
