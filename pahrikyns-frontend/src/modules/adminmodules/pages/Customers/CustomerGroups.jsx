import React from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Stack, 
  IconButton 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HubTwoToneIcon from "@mui/icons-material/HubTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import { motion } from "framer-motion";

export default function CustomerGroups() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER SECTION */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6} flexWrap="wrap" gap={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
            <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
                <ArrowBackTwoToneIcon />
            </IconButton>
            <Box>
                <Typography sx={{ color: "#00eaff", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
                   SEGMENTATION SECTOR · OPERATIVE GROUPS
                </Typography>
                <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                    Operative Segments
                </Typography>
            </Box>
        </Stack>

        <Button 
            variant="contained" 
            startIcon={<AddTwoToneIcon />}
            sx={{ 
                borderRadius: "14px", 
                px: 4, 
                fontWeight: 900, 
                bgcolor: "#00eaff", 
                color: "#000", 
                "&:hover": { bgcolor: "#00c4d6" },
                boxShadow: "0 0 20px rgba(0, 234, 255, 0.2)"
            }}
          >
            Create Segment
          </Button>
      </Stack>

      <Paper 
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        sx={{ 
          p: 10, 
          textAlign: "center", 
          background: "rgba(255,255,255,0.02)", 
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 8,
          backgroundImage: "none",
          boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
        }}
      >
        <HubTwoToneIcon sx={{ fontSize: 64, color: "rgba(0, 234, 255, 0.1)", mb: 3 }} />
        <Typography variant="h6" sx={{ color: "white", fontWeight: 900, mb: 1 }}>NO SEGMENTS DEFINED</Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.3)", maxWidth: 400, mx: "auto", fontWeight: 500 }}>
            Establish operative groups to categorize your network assets for targeted communications and automated protocols.
        </Typography>
      </Paper>
    </Box>
  );
}
