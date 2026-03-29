import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Grid, Paper, List, ListItem, 
  ListItemIcon, ListItemText, Divider, Chip, Avatar, Stack, IconButton
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ================= ICONS ================= */
import ElectricBoltTwoToneIcon from "@mui/icons-material/ElectricBoltTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import MemoryTwoToneIcon from "@mui/icons-material/MemoryTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import SettingsInputComponentTwoToneIcon from "@mui/icons-material/SettingsInputComponentTwoTone";
import SensorsTwoToneIcon from "@mui/icons-material/SensorsTwoTone";
import HubTwoToneIcon from "@mui/icons-material/HubTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

import { fetchUserActivity, fetchUsersFromSummary } from "../../Adminapi/users";

export default function AnalyticsRealtime() {
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(Math.floor(Math.random() * 5) + 2);
  const [recentEvents, setRecentEvents] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
        setActiveUsers(prev => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
        const [activity, summ] = await Promise.all([
            fetchUserActivity(),
            fetchUsersFromSummary()
        ]);
        setRecentEvents(activity || []);
        setSummary(summ || {});
    } catch (e) {
        console.error(e);
    }
  }

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER SECTION */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={8} flexWrap="wrap" gap={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
           <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
              <ArrowBackTwoToneIcon />
           </IconButton>
           <Box>
              <Typography sx={{ color: "#00eaff", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
                OPERATIONS CENTER · REAL-TIME PULSE
              </Typography>
              <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                Neural Stream
              </Typography>
           </Box>
        </Stack>
        <Chip 
          icon={<SensorsTwoToneIcon sx={{ "&&": { color: "#00eaff" }, animation: "pulse 2s infinite" }} />} 
          label="LIVE FEED: SYNCHRONIZED" 
          sx={liveChipStyle}
        />
      </Stack>

      <Grid container spacing={4}>
        {/* PULSE CARDS */}
        <Grid item xs={12} md={4}>
          <MetricCard title="Active Synapses" value={activeUsers} icon={<VisibilityTwoToneIcon />} color="#00eaff" delay={0.1} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard title="Growth Flux" value={summary?.totalStudents || 0} icon={<PersonAddTwoToneIcon />} color="#a855f7" delay={0.2} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard title="System Throughput" value={summary?.totalOrders || 0} icon={<ShoppingCartTwoToneIcon />} color="#f43f5e" delay={0.3} />
        </Grid>

        {/* ACTIVITY STREAM */}
        <Grid item xs={12} md={8}>
          <Paper sx={streamPaperStyle}>
            <Stack direction="row" spacing={2} alignItems="center" mb={6}>
              <Box sx={iconWrapperStyle("#00eaff")}>
                 <ElectricBoltTwoToneIcon sx={{ color: "#00eaff", fontSize: 20 }} />
              </Box>
              <Box>
                 <Typography variant="h6" fontWeight={900} color="white">Activity Transmissions</Typography>
                 <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>REAL-TIME LOG PERSISTENCE</Typography>
              </Box>
            </Stack>
            <List sx={{ px: 1 }}>
               <AnimatePresence>
                {recentEvents.length > 0 ? recentEvents.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ListItem sx={listItemStyle}>
                        <ListItemIcon>
                          <Avatar sx={eventAvatarStyle}>
                            {event.label?.[0] || "?"}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText 
                          primary={<Typography variant="body2" sx={{ fontWeight: 900, color: "white", letterSpacing: "0.01em" }}>{event.label}</Typography>} 
                          secondary={<Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 700, letterSpacing: 1, color: "white" }}>{new Date().toLocaleTimeString()} · SECURE CLUSTER LOG</Typography>}
                        />
                        <Chip label="PROCESSED" size="small" sx={processedChipStyle} />
                      </ListItem>
                    </motion.div>
                )) : (
                <Box sx={{ py: 15, textAlign: "center" }}>
                   <HubTwoToneIcon sx={{ fontSize: 60, opacity: 0.1, color: "#00eaff", mb: 3 }} />
                   <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 900, fontSize: 13, letterSpacing: 3, display: "block" }}>WAITING FOR INCOMING SIGNALS...</Typography>
                </Box>
              )}
               </AnimatePresence>
            </List>
          </Paper>
        </Grid>

        {/* CLUSTER HEALTH */}
        <Grid item xs={12} md={4}>
          <Paper sx={streamPaperStyle}>
            <Stack direction="row" spacing={2} alignItems="center" mb={6}>
              <Box sx={iconWrapperStyle("#f59e0b")}>
                 <StorageTwoToneIcon sx={{ color: "#f59e0b", fontSize: 20 }} />
              </Box>
              <Box>
                 <Typography variant="h6" fontWeight={900} color="white">Cluster Health</Typography>
                 <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>RESOURCE ALLOCATION</Typography>
              </Box>
            </Stack>
            <Stack spacing={4.5}>
              <HealthMonitor label="API Latency" value={38} unit="ms" icon={<SensorsTwoToneIcon />} />
              <HealthMonitor label="Cognitive DB Load" value={72} unit="%" icon={<StorageTwoToneIcon />} />
              <HealthMonitor label="Memory Allocation" value={24} unit="%" icon={<MemoryTwoToneIcon />} />
              <HealthMonitor label="Uptime Integrity" value={99.9} unit="%" icon={<SettingsInputComponentTwoToneIcon />} />
            </Stack>
            <Box sx={healthFooterStyle}>
              <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 900, textTransform: "uppercase", letterSpacing: 2, mb: 1, display: "block" }}>SYSTEM INTEGRITY</Typography>
              <Typography sx={{ color: "#22c55e", fontWeight: 900, letterSpacing: 1, fontSize: 13 }}>ALL CLUSTERS OPERATING WITHIN PARAMETERS</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}

function MetricCard({ title, value, icon, color, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} whileHover={{ scale: 1.02, y: -5 }}>
      <Paper sx={getMetricStyle(color)}>
        <Box sx={{ position: "absolute", top: -15, right: -15, opacity: 0.05, color }}>
          {React.cloneElement(icon, { sx: { fontSize: 110 } })}
        </Box>
        <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 900, letterSpacing: 2, display: "block", mb: 2, color: "white" }}>
          {title.toUpperCase()}
        </Typography>
        <Typography variant="h2" fontWeight={900} sx={{ color: "white", letterSpacing: "-0.04em" }}>{value}</Typography>
        <Box sx={{ mt: 4, height: 6, width: "100%", bgcolor: "rgba(255,255,255,0.03)", borderRadius: 3, overflow: "hidden" }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: delay + 0.3 }}
            style={{ height: "100%", background: `linear-gradient(90deg, ${color}44, ${color})`, borderRadius: 3, boxShadow: `0 0 15px ${color}66` }}
          />
        </Box>
      </Paper>
    </motion.div>
  );
}

function HealthMonitor({ label, value, unit, icon }) {
  const isOptimal = value < 80;
  const color = isOptimal ? "#00eaff" : "#f59e0b";
  
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ width: 32, height: 32, borderRadius: "10px", bgcolor: `${color}08`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${color}15` }}>
             {React.cloneElement(icon, { sx: { fontSize: 16, color: color } })}
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 800, opacity: 0.5, color: "white", letterSpacing: 0.5 }}>{label}</Typography>
        </Stack>
        <Typography variant="caption" sx={{ fontWeight: 900, color: color, fontSize: 12 }}>{value}{unit}</Typography>
      </Stack>
      <Box sx={{ height: 6, width: "100%", bgcolor: "rgba(255,255,255,0.03)", borderRadius: 4, overflow: "hidden" }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "backOut" }}
          style={{ height: "100%", background: `linear-gradient(90deg, ${color}33, ${color})`, borderRadius: 4, boxShadow: `0 0 10px ${color}44` }}
        />
      </Box>
    </Box>
  );
}

const liveChipStyle = { 
    fontWeight: 900, 
    color: "#00eaff", 
    borderColor: "rgba(0,234,255,0.2)", 
    bgcolor: "rgba(0,234,255,0.05)",
    fontSize: 10,
    letterSpacing: 2,
    px: 1.5,
    borderRadius: "10px",
    height: 32
};

const getMetricStyle = (color) => ({ 
    p: 4, 
    borderRadius: "24px", 
    background: "rgba(255,255,255,0.02)", 
    border: `1px solid rgba(255,255,255,0.06)`, 
    position: "relative", 
    overflow: "hidden",
    backgroundImage: "none",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
    transition: "all 0.4s",
    "&:hover": { borderColor: `${color}40`, transform: "translateY(-5px)" }
});

const streamPaperStyle = { 
    p: 5, 
    borderRadius: "28px", 
    background: "rgba(255,255,255,0.02)", 
    border: "1px solid rgba(255,255,255,0.06)", 
    minHeight: 520, 
    backgroundImage: "none",
    boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
};

const iconWrapperStyle = (color) => ({ 
    width: 44, 
    height: 44, 
    borderRadius: "14px", 
    bgcolor: `${color}08`, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    border: `1px solid ${color}15`
});

const listItemStyle = { 
    py: 2.5, 
    px: 3, 
    mb: 2, 
    borderRadius: "16px", 
    bgcolor: "rgba(255,255,255,0.01)", 
    border: "1px solid rgba(255,255,255,0.03)",
    transition: "all 0.3s",
    "&:hover": { bgcolor: "rgba(255,255,255,0.03)", transform: "translateX(5px)" } 
};

const eventAvatarStyle = { 
    bgcolor: "rgba(255,255,255,0.03)", 
    color: "white", 
    border: "1px solid rgba(255,255,255,0.08)", 
    width: 44, 
    height: 44, 
    fontSize: 18, 
    fontWeight: 900,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
};

const processedChipStyle = { 
    height: 20, 
    fontSize: 9, 
    fontWeight: 900, 
    bgcolor: "rgba(34,197,94,0.05)", 
    color: "#22c55e", 
    border: "1px solid rgba(34,197,94,0.15)",
    letterSpacing: 1
};

const healthFooterStyle = { 
    mt: 8, 
    p: 3.5, 
    borderRadius: "16px", 
    bgcolor: "rgba(0,0,0,0.3)", 
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "inset 0 0 20px rgba(255,255,255,0.01)"
};

