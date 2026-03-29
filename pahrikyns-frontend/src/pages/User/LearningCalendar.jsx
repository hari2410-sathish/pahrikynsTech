// src/pages/User/LearningCalendar.jsx
import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchoolIcon from "@mui/icons-material/School";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function LearningCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 800,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Learning Calendar
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, bgcolor: "rgba(255,255,255,0.05)", p: 0.5, borderRadius: 2 }}>
          <IconButton onClick={prevMonth} sx={{ color: "#fff" }}><ChevronLeftIcon /></IconButton>
          <Typography fontWeight={700} sx={{ minWidth: 120, textAlign: "center" }}>
            {months[month]} {year}
          </Typography>
          <IconButton onClick={nextMonth} sx={{ color: "#fff" }}><ChevronRightIcon /></IconButton>
        </Box>
      </Box>

      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        <Grid container spacing={1}>
          {days.map((d) => (
            <Grid item xs={12 / 7} key={d} sx={{ pb: 2, textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 800, fontSize: 13, textTransform: "uppercase" }}>
                {d}
              </Typography>
            </Grid>
          ))}

          {calendarDays.map((date, i) => (
            <Grid item xs={12 / 7} key={i}>
              <Box
                sx={{
                  aspectRatio: "1/1",
                  borderRadius: 3,
                  p: 1,
                  bgcolor: date ? "rgba(255,255,255,0.03)" : "transparent",
                  border: date ? "1px solid rgba(255,255,255,0.05)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "0.4s cubic-bezier(0.19, 1, 0.22, 1)",
                  cursor: date ? "pointer" : "default",
                  "&:hover": date ? {
                    bgcolor: "rgba(0, 234, 255, 0.08)",
                    borderColor: "rgba(0, 234, 255, 0.4)",
                    transform: "translateY(-4px) scale(1.05)",
                    zIndex: 10,
                  } : {},
                }}
              >
                {date && (
                  <>
                    <Typography fontWeight={700} fontSize={18} sx={{ color: date === new Date().getDate() && month === new Date().getMonth() ? "#00eaff" : "#fff" }}>
                      {date}
                    </Typography>
                    {/* Activity dot mock */}
                    {date % 3 === 0 && (
                      <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#7b3fe4", mt: 0.5, boxShadow: "0 0 8px #7b3fe4" }} />
                    )}
                  </>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#fff" }}>
          Scheduled Tasks
        </Typography>
        <Paper sx={{ p: 3, borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(123, 63, 228, 0.1)", color: "#7b3fe4" }}>
              <SchoolIcon />
            </Box>
            <Box>
              <Typography fontWeight={700}>Complete React Router Chapter</Typography>
              <Typography fontSize={12} sx={{ opacity: 0.5 }}>Tommorow at 09:00 AM</Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Button variant="outlined" size="small" sx={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff", textTransform: "none" }}>
              Reschedule
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
