import React from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function SaasStatCard({
  title,
  value,
  subtitle,
  icon,
  color = "#38bdf8",
}) {
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -10,
            right: -10,
            width: 80,
            height: 80,
            background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ zIndex: 1, position: "relative" }}>
          <Box>
            <Typography fontSize={13} color="rgba(255,255,255,0.5)" fontWeight={600} mb={0.5}>
              {title.toUpperCase()}
            </Typography>
            <Typography fontSize={26} fontWeight={900}>
              {value}
            </Typography>
            {subtitle && (
              <Typography fontSize={12} color="#22c55e" mt={1} fontWeight={600}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${color}22, ${color}44)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: color,
              border: `1px solid ${color}44`,
              boxShadow: `0 8px 32px ${color}22`,
            }}
          >
            {icon ? React.cloneElement(icon, { sx: { fontSize: 24 } }) : "$"}
          </Box>
        </Stack>
      </Paper>
    </motion.div>
  );
}
