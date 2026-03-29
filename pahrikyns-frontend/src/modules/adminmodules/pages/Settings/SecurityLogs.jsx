import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  IconButton,
  Chip,
  CircularProgress
} from "@mui/material";
import { fetchSecurityLogs } from "../../Adminapi/settingsAdmin";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import HistoryTwoToneIcon from "@mui/icons-material/HistoryTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import GppGoodTwoToneIcon from "@mui/icons-material/GppGoodTwoTone";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";

export default function SecurityLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      setLoading(true);
      const d = await fetchSecurityLogs();
      setLogs(d.logs || []);
    } finally {
      setLoading(false);
    }
  }

  const getEventStyle = (event = "") => {
    const e = event.toLowerCase();
    if (e.includes("fail") || e.includes("wrong")) return { color: "#f43f5e", icon: <WarningTwoToneIcon sx={{ fontSize: 16 }} /> };
    if (e.includes("login") || e.includes("success")) return { color: "#22c55e", icon: <GppGoodTwoToneIcon sx={{ fontSize: 16 }} /> };
    return { color: "#00eaff", icon: <SecurityTwoToneIcon sx={{ fontSize: 16 }} /> };
  };

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                SYSTEM LOGS · ACCESS INTELLIGENCE
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Security Audit
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
              <TableCell sx={headerStyle}>EVENT TYPE</TableCell>
              <TableCell sx={headerStyle}>IP SIGNATURE</TableCell>
              <TableCell sx={headerStyle}>TIMESTAMP</TableCell>
              <TableCell sx={headerStyle} align="right">AUDIT STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
                <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                        <CircularProgress size={30} sx={{ color: "#00eaff" }} />
                    </TableCell>
                </TableRow>
            ) : logs.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 10 }}>
                        <Typography sx={{ color: "white", opacity: 0.2, fontWeight: 900, letterSpacing: 2 }}>NO LOGS RECORDED</Typography>
                    </TableCell>
                </TableRow>
            ) : logs.map((l, i) => {
              const style = getEventStyle(l.event);
              return (
                <TableRow 
                  key={i}
                  component={motion.tr}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" } }}
                >
                  <TableCell sx={cellStyle}>
                     <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ color: style.color }}>{style.icon}</Box>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "white" }}>{l.event.toUpperCase()}</Typography>
                     </Stack>
                  </TableCell>
                  <TableCell sx={cellStyle}>
                     <Typography variant="body2" sx={{ color: "white", opacity: 0.4, fontWeight: 700, letterSpacing: 1 }}>{l.ip}</Typography>
                  </TableCell>
                  <TableCell sx={cellStyle}>
                     <Typography variant="caption" sx={{ color: "white", opacity: 0.3, fontWeight: 800 }}>
                        {new Date(l.createdAt).toLocaleString()}
                     </Typography>
                  </TableCell>
                  <TableCell sx={cellStyle} align="right">
                     <Chip 
                        label="VERIFIED" 
                        size="small" 
                        sx={{ 
                            fontSize: 9, 
                            fontWeight: 900, 
                            bgcolor: "rgba(0, 234, 255, 0.05)", 
                            color: "#00eaff",
                            border: "1px solid rgba(0, 234, 255, 0.1)",
                            letterSpacing: 1
                        }} 
                     />
                  </TableCell>
                </TableRow>
              );
            })}
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
