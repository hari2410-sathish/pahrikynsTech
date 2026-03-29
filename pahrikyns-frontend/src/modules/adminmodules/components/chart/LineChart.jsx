import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function LineChart({ data = [], height = 160, color = "#00eaff" }) {
  const safe = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState(null);

  const max = Math.max(...safe.map((d) => Number(d.value || 0)), 1);

  useEffect(() => {
    setProgress(0);
    if (!safe.length) return;

    let frame;
    let start;

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / 800) * 100, 100);
      setProgress(pct);

      if (pct < 100) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [safe.length]);

  if (!safe.length) {
    return (
      <Box sx={{ height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="caption" sx={{ opacity: 0.2, fontWeight: 900, color: "white", letterSpacing: 2 }}>
          SIGNAL FEED EMPTY
        </Typography>
      </Box>
    );
  }

  const points = safe
    .map((p, i) => {
      const x = (i / (safe.length - 1 || 1)) * 100;
      const y = 100 - (Number(p.value || 0) / max) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Box sx={{ height, position: "relative" }}>
      {/* ✅ Premium Tooltip */}
      {hover && (
        <Box
          sx={{
            position: "absolute",
            top: hover.y - 45,
            left: hover.x - 50,
            bgcolor: "rgba(2, 6, 23, 0.9)",
            backdropFilter: "blur(4px)",
            border: `1px solid ${color}40`,
            px: 1.5,
            py: 0.8,
            borderRadius: "10px",
            fontSize: 11,
            color: "white",
            pointerEvents: "none",
            zIndex: 10,
            whiteSpace: "nowrap",
            boxShadow: `0 10px 20px rgba(0,0,0,0.4), 0 0 15px ${color}10`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.5, letterSpacing: 1, fontSize: 8 }}>{hover.label.toUpperCase()}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 900, color: color }}>{Number(hover.value).toLocaleString()}</Typography>
        </Box>
      )}

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))" }}
      >
        <defs>
          <linearGradient id={`glow-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* ✅ Grid base */}
        <line
          x1="0"
          y1="90"
          x2="100"
          y2="90"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
        />

        {/* ✅ Area glow */}
        <polygon
          fill={`url(#glow-${color})`}
          points={`0,90 ${points} 100,90`}
          opacity={progress / 100}
        />

        {/* ✅ Animated main line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="300"
          strokeDashoffset={300 - progress * 3}
          points={points}
          style={{ transition: "stroke-dashoffset 0.1s linear", filter: `drop-shadow(0 0 8px ${color}40)` }}
        />

        {/* ✅ Interactive points */}
        {safe.map((p, i) => {
          const x = (i / (safe.length - 1 || 1)) * 100;
          const y = 100 - (Number(p.value || 0) / max) * 80 - 10;

          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.8"
              fill={color}
              stroke="rgba(2, 6, 23, 1)"
              strokeWidth="0.8"
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => {
                const rect = e.target.ownerSVGElement.getBoundingClientRect();
                setHover({
                  x: (x / 100) * rect.width,
                  y: (y / 100) * rect.height,
                  label: p.name || `PT-${i + 1}`,
                  value: p.value,
                });
              }}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </svg>

      {/* ✅ Labels */}
      <Box
        sx={{
          mt: 1.5,
          display: "flex",
          justifyContent: "space-between",
          px: 0.5
        }}
      >
        {safe.map((p, i) => (
          (i % Math.ceil(safe.length / 6) === 0 || i === safe.length - 1) && (
            <Typography
                key={i}
                variant="caption"
                sx={{
                    fontSize: 8,
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: 1,
                    textTransform: "uppercase"
                }}
            >
                {p.name}
            </Typography>
          )
        ))}
      </Box>
    </Box>
  );
}
