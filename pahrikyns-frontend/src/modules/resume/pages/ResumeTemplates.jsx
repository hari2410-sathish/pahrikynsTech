import React, { useState, useMemo } from "react";
import { Box, Button, Chip, Typography, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TEMPLATE_REGISTRY } from "../templates/templateRegistry";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { motion, AnimatePresence } from "framer-motion";

/** ========================================================
 * RESUME TEMPLATES — ULTRA PREMIUM DESIGN (v2)
 * - Glassmorphism
 * - Framer Motion Animations
 * - Dark/Modern Aesthetic
 * ======================================================== */

const CATEGORIES = ["All", "Professional", "Modern", "Creative", "Executive", "Minimalist"];

export default function ResumeTemplates() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const selectTemplate = (template) => {
    // Navigate to builder with selected template
    navigate(`/resume/builder/personal?template=${template.id}`);
  };

  const filteredTemplates = useMemo(() => {
    if (activeCategory === "All") return TEMPLATE_REGISTRY;
    return TEMPLATE_REGISTRY.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#060714 !important", color: "white", position: "relative", overflowX: "hidden" }}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER SECTION */}
      <Box className="relative z-10 py-20 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: 16, color: "#00eaff" }} />}
            label="MASTER PRO LEVEL"
            sx={{
              bgcolor: "rgba(0, 234, 255, 0.08)",
              color: "#00eaff",
              border: "1px solid rgba(0, 234, 255, 0.3)",
              mb: 3,
              fontWeight: 800,
              letterSpacing: 1,
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 20px rgba(0, 234, 255, 0.2)"
            }}
          />
          <Typography
            variant="h2"
            fontWeight={900}
            className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-400 mb-6 drop-shadow-[0_0_15px_rgba(0,234,255,0.3)]"
            sx={{ fontSize: { xs: "2.5rem", md: "4.5rem" }, lineHeight: 1.1, fontFamily: "Inter, sans-serif" }}
          >
            Craft Your Digital Identity
          </Typography>
          <Typography
            variant="h6"
            className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            Choose a <span className="text-[#00eaff] font-bold">Cyberpunk</span> template, click to edit, and download.
            Professional designs tailored for the future.
          </Typography>
        </motion.div>
      </Box>

      {/* FILTER SECTION */}
      <Box className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
        <Box className="max-w-7xl mx-auto px-6 py-2">
          <Tabs
            value={activeCategory}
            onChange={(e, val) => setActiveCategory(val)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: "#00eaff", height: 3, borderRadius: 2 },
              "& .MuiTab-root": {
                color: "#94a3b8",
                fontWeight: 600,
                textTransform: "none",
                minWidth: 100,
                fontSize: "1rem",
                "&.Mui-selected": { color: "#ffffff" },
              },
            }}
          >
            {CATEGORIES.map((cat) => (
              <Tab key={cat} label={cat} value={cat} disableRipple />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* GRID SECTION */}
      <Box className="relative z-10 max-w-7xl mx-auto p-6 md:p-12">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredTemplates.map((tpl) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={tpl.id}
                className="group relative"
              >
                {/* CARD CONTAINER */}
                <Box
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#00eaff]/50 transition-all duration-300 shadow-xl cursor-pointer h-full flex flex-col"
                  onClick={() => selectTemplate(tpl)}
                >
                  {/* PREVIEW AREA */}
                  <Box className="relative h-[320px] bg-[#1e293b] overflow-hidden">
                    {/* Placeholder for actual image - using a stylized abstract preview */}
                    <div
                      className="w-full h-full flex items-center justify-center relative p-8 transition-transform duration-500 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${tpl.config.colorTheme.background} 0%, #f1f5f9 100%)`
                      }}
                    >
                      {/* Mini Resume Abstract Representation */}
                      <div
                        className="w-full h-full bg-white shadow-2xl rounded-sm p-3 flex flex-col gap-2 origin-top transform scale-90"
                        style={{ fontFamily: tpl.config.fontFamily }}
                      >
                        <div className="h-4 w-1/2 rounded-full mb-2" style={{ backgroundColor: tpl.config.colorTheme.primary }} />
                        <div className="h-2 w-1/3 bg-gray-200 rounded-full" />
                        <div className="h-2 w-full bg-gray-100 rounded-full mt-4" />
                        <div className="h-2 w-full bg-gray-100 rounded-full" />
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="col-span-1 h-20 bg-gray-50 rounded" style={{ backgroundColor: tpl.config.colorTheme.secondary + "20" }} />
                          <div className="col-span-2 flex flex-col gap-2">
                            <div className="h-2 w-full bg-gray-100 rounded-full" />
                            <div className="h-2 w-full bg-gray-100 rounded-full" />
                            <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* OVERLAY ON HOVER */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }} // This might not trigger perfectly on hover reuse
                        className="flex flex-col gap-3 items-center"
                      >
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#00eaff",
                            color: "black",
                            fontWeight: "bold",
                            textTransform: "none",
                            px: 4,
                            py: 1,
                            borderRadius: 50,
                            "&:hover": { bgcolor: "#00c4d6" }
                          }}
                        >
                          Use Template
                        </Button>
                        <Typography variant="body2" className="text-white/80 font-medium">
                          Click to Edit
                        </Typography>
                      </motion.div>
                    </div>

                    {/* BADGES */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                      {tpl.type === "pro" && (
                        <Chip
                          label="PRO"
                          size="small"
                          sx={{
                            bgcolor: "#facc15",
                            color: "black",
                            fontWeight: 800,
                            height: 20,
                            fontSize: 10
                          }}
                        />
                      )}
                      <Chip
                        label={tpl.category}
                        size="small"
                        sx={{
                          bgcolor: "rgba(0,0,0,0.6)",
                          color: "white",
                          backdropFilter: "blur(4px)",
                          fontWeight: 600,
                          height: 20,
                          fontSize: 10,
                          border: "1px solid rgba(255,255,255,0.1)"
                        }}
                      />
                    </div>
                  </Box>

                  {/* INFO AREA */}
                  <Box className="p-5 flex flex-col justify-between flex-1 bg-[#1e293b]/50 border-t border-white/5">
                    <div>
                      <Typography variant="h6" className="font-bold text-white mb-1">
                        {tpl.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-400 text-sm line-clamp-2">
                        Perfect for {tpl.category?.toLowerCase()} roles. Clean and structured.
                      </Typography>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gray-600 border border-[#1e293b]" />
                        ))}
                      </div>
                      <Typography variant="caption" className="text-gray-500">
                        Used by 1k+ people
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTemplates.length === 0 && (
          <Box className="text-center py-32 opacity-50">
            <DescriptionIcon sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5">No templates found</Typography>
            <Typography variant="body2">Try selecting a different category.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
