import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function BarChart({ data = [], height = 180 }) {
  const safe = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState(null);

  const max = Math.max(...safe.map((d) => Number(d.value || 0)), 1);

  // Animate bars
  useEffect(() => {
    setProgress(0);
    if (!safe.length) return;

    let current = 0;
    const timer = setInterval(() => {
      current += 4;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
      }
      setProgress(current);
    }, 16);

    return () => clearInterval(timer);
  }, [safe.length]);

  if (!safe.length) {
    return (
      <Box sx={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontWeight: 800, letterSpacing: 1 }}>NO DATA TRANSMISSION</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 1, position: "relative" }}>
      {/* Tooltip */}
      {hover && (
        <Box
          sx={{
            position: "absolute",
            top: hover.y - 45,
            left: hover.x - 40,
            bgcolor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,234,255,0.3)",
            px: 2,
            py: 1,
            borderRadius: "12px",
            fontSize: 11,
            color: "white",
            pointerEvents: "none",
            zIndex: 100,
            whiteSpace: "nowrap",
            boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.5, fontWeight: 800, fontSize: 9 }}>{hover.label.toUpperCase()}</Typography>
          <Typography variant="caption" sx={{ fontWeight: 900, color: "#00eaff" }}>{hover.value}</Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 1.5,
          height,
          px: 1
        }}
      >
        {safe.map((item, i) => {
          const rawHeight = (Number(item.value || 0) / max) * 100;
          const animatedHeight = (rawHeight * progress) / 100;

          return (
            <Box key={i} sx={{ flex: 1, textAlign: "center" }}>
              <Box
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const parentRect = e.currentTarget.parentElement.parentElement.getBoundingClientRect();
                  setHover({
                    x: rect.left - parentRect.left + rect.width / 2,
                    y: rect.top - parentRect.top,
                    label: item.name || item.month || item.label || `#${i + 1}`,
                    value: item.value,
                  });
                }}
                onMouseLeave={() => setHover(null)}
                sx={{
                  height: `${animatedHeight}%`,
                  borderRadius: "12px 12px 4px 4px",
                  background: "linear-gradient(180deg, #00eaff, #00eaff33 60%, transparent)",
                  border: "1px solid rgba(0,234,255,0.4)",
                  boxShadow: hover?.label === (item.name || item.month || item.label) ? "0 0 25px rgba(0,234,255,0.4)" : "0 0 15px rgba(0,234,255,0.1)",
                  transition: "height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s",
                  cursor: "crosshair",
                  position: "relative",
                  "&:hover": {
                    border: "1px solid #00eaff",
                    boxShadow: "0 0 30px rgba(0,234,255,0.6)"
                  }
                }}
              />
              <Typography sx={{ mt: 1.5, fontSize: 9, color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 0.5 }}>
                {(item.name || item.month || item.label)?.toUpperCase()}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
