import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  IconButton,
  Avatar,
  Chip
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import ComputerTwoToneIcon from "@mui/icons-material/ComputerTwoTone";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import SensorsTwoToneIcon from "@mui/icons-material/SensorsTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";

function Sessions() {
  const navigate = useNavigate();
  // Dummy data for now (backend later)
  const sessions = [
    {
      id: 1,
      device: "Chrome / Windows 11",
      ip: "157.34.192.10",
      lastActive: "ACTIVE NOW",
      current: true,
      type: "desktop"
    },
    {
      id: 2,
      device: "Safari / iPhone 15 Pro",
      ip: "103.221.1.25",
      lastActive: "2025-02-13 08:12 PM",
      current: false,
      type: "mobile"
    },
  ];

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                SESSION ARCHIVE · AUTHORIZED CHANNELS
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Transmission Hub
            </Typography>
        </Box>
      </Stack>

      <Paper sx={{ 
        borderRadius: 6, 
        overflow: "hidden", 
        background: "rgba(255,255,255,0.02)", 
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "none",
        boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
      }}>
        <Table>
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
            <TableRow>
              <TableCell sx={headerStyle}>CHANNEL IDENTITY</TableCell>
              <TableCell sx={headerStyle}>IP SIGNATURE</TableCell>
              <TableCell sx={headerStyle}>LAST UPLINK</TableCell>
              <TableCell sx={headerStyle} align="right">DIAGNOSTICS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sessions.map((s, idx) => (
              <TableRow 
                key={s.id}
                component={motion.tr}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" } }}
              >
                <TableCell sx={cellStyle}>
                   <Stack direction="row" spacing={3} alignItems="center">
                      <Box sx={{ 
                          width: 44, 
                          height: 44, 
                          borderRadius: 3, 
                          bgcolor: "rgba(255,255,255,0.03)", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          color: "#00eaff",
                          border: "1px solid rgba(255,255,255,0.06)"
                      }}>
                         {s.type === "desktop" ? <ComputerTwoToneIcon /> : <PhoneIphoneTwoToneIcon />}
                      </Box>
                      <Box>
                         <Typography variant="body2" sx={{ fontWeight: 800, color: "white" }}>{s.device}</Typography>
                         {s.current && (
                             <Chip 
                                label="CURRENT SESSION" 
                                size="small" 
                                sx={{ 
                                    height: 16, 
                                    fontSize: 8, 
                                    fontWeight: 900, 
                                    bgcolor: "rgba(34, 197, 94, 0.1)", 
                                    color: "#22c55e",
                                    border: "1px solid rgba(34, 197, 94, 0.2)",
                                    mt: 0.5
                                }} 
                             />
                         )}
                      </Box>
                   </Stack>
                </TableCell>
                <TableCell sx={cellStyle}>
                   <Typography variant="body2" sx={{ color: "white", opacity: 0.4, fontWeight: 700, letterSpacing: 1 }}>{s.ip}</Typography>
                </TableCell>
                <TableCell sx={cellStyle}>
                   <Stack direction="row" spacing={1} alignItems="center">
                      {s.current && <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />}
                      <Typography variant="caption" sx={{ color: s.current ? "#22c55e" : "white", opacity: s.current ? 1 : 0.3, fontWeight: 800 }}>
                        {s.lastActive}
                      </Typography>
                   </Stack>
                </TableCell>
                <TableCell sx={cellStyle} align="right">
                   {!s.current && (
                      <Button 
                        color="error" 
                        variant="outlined" 
                        size="small"
                        startIcon={<LogoutTwoToneIcon sx={{ fontSize: 14 }} />}
                        sx={{ 
                            borderRadius: 2, 
                            fontWeight: 900, 
                            fontSize: 10, 
                            borderColor: "rgba(244, 63, 94, 0.2)",
                            bgcolor: "rgba(244, 63, 94, 0.05)",
                            "&:hover": { bgcolor: "rgba(244, 63, 94, 0.1)", borderColor: "#f43f5e" }
                        }}
                      >
                        TERMINATE
                      </Button>
                   )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

const headerStyle = {
  color: "rgba(255,255,255,0.3)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 2,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  py: 3,
  px: 4
};

const cellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  py: 3,
  px: 4
};

export default Sessions;
