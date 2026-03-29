import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function PieMini({ value = 0, size = 140 }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  const [animatedValue, setAnimatedValue] = useState(0);

  // Smooth animation when value changes
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = safeValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= safeValue) {
        start = safeValue;
        clearInterval(timer);
      }
      setAnimatedValue(Math.round(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [safeValue]);

  const degree = animatedValue * 3.6;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 1,
      }}
    >
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `conic-gradient(#00eaff ${degree}deg, rgba(255,255,255,0.03) 0deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 35px rgba(0,234,255,0.2)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          border: "1px solid rgba(0,234,255,0.1)"
        }}
      >
        <Box
          sx={{
            width: size * 0.72,
            height: size * 0.72,
            borderRadius: "50%",
            background: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)"
          }}
        >
          <Typography fontSize={9} fontWeight={900} sx={{ color: "rgba(255,255,255,0.3)", letterSpacing: 1.5, mb: 0.5 }}>
            PULSE
          </Typography>
          <Typography fontSize={24} fontWeight={900} sx={{ color: "white", letterSpacing: "-0.02em" }}>
            {animatedValue}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
