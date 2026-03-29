import React from "react";
import { Box, Button, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion } from "framer-motion";

/** ========================================================
 * RESUME HOME — ULTRA PREMIUM DESIGN (v2)
 * - Glassmorphism
 * - Framer Motion Animations
 * - Dark/Modern Aesthetic
 * ======================================================== */

export default function ResumeHome() {
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-100px] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Container maxWidth="lg" className="relative z-10 py-20 px-6">
        {/* HERO SECTION */}
        <Box className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <AutoAwesomeIcon sx={{ color: "#00eaff", fontSize: 18 }} />
              <Typography variant="caption" className="font-bold tracking-wider text-[#00eaff]">
                AI-POWERED RESUME BUILDER
              </Typography>
            </Box>

            <Typography
              variant="h1"
              fontWeight={900}
              className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 mb-6 drop-shadow-2xl"
              sx={{ fontSize: { xs: "3rem", md: "5rem" }, lineHeight: 1.1 }}
            >
              Build a Professional <br /> Resume in Minutes
            </Typography>

            <Typography
              variant="h6"
              className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
              sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
            >
              Choose a premium template, fill your details, and download your
              polished resume instantly. Join thousands of professionals landing their dream jobs.
            </Typography>

            <Box className="flex gap-4 justify-center">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/resume/templates")}
                sx={{
                  bgcolor: "#00eaff",
                  color: "black",
                  fontWeight: "bold",
                  px: 5,
                  py: 1.5,
                  borderRadius: 50,
                  fontSize: "1.1rem",
                  boxShadow: "0 0 20px rgba(0, 234, 255, 0.3)",
                  "&:hover": { bgcolor: "#00c4d6", transform: "scale(1.05)" },
                  transition: "all 0.3s ease"
                }}
              >
                Create Resume
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/resume/templates")} // Or a demo link
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.2)",
                  fontWeight: "bold",
                  px: 5,
                  py: 1.5,
                  borderRadius: 50,
                  fontSize: "1.1rem",
                  "&:hover": { borderColor: "white", bgcolor: "white/5" }
                }}
              >
                View Templates
              </Button>
            </Box>
          </motion.div>
        </Box>

        {/* FEATURES SECTION */}
        <Grid container spacing={4}>
          {[
            { title: "Professional Templates", desc: "Modern, elegant, and fully customizable designs curated by HR experts." },
            { title: "ATS Friendly", desc: "Optimized layouts that ensure your resume gets past automated screening systems." },
            { title: "Instant PDF Export", desc: "Download your resume instantly in high-quality PDF format ready for applications." }
          ].map((feature, i) => (
            <Grid item xs={12} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
              >
                <Box className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 h-full group">
                  <Box className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <AutoAwesomeIcon className="text-white" />
                  </Box>
                  <Typography variant="h5" className="font-bold mb-3 text-white">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" className="text-gray-400 leading-relaxed">
                    {feature.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
