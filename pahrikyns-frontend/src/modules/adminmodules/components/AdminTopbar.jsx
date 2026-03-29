import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Divider,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  Stack,
  Tooltip
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// ICONS
import MenuIcon from "@mui/icons-material/Menu";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";
import LocalLibraryTwoToneIcon from "@mui/icons-material/LocalLibraryTwoTone";

import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import axios from "../../../api/axios";

export function AdminTopbar({ notifyCount = 0, onToggleSidebar }) {
  const navigate = useNavigate();
  const { logout, admin } = useAdminAuth();

  const [anchorQuick, setAnchorQuick] = useState(null);
  const [anchorProfile, setAnchorProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // NOTIFICATION STATE
  const [openNotify, setOpenNotify] = useState(false);
  const [notifyTitle, setNotifyTitle] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [sendToAll, setSendToAll] = useState(true);
  const [targetUserId, setTargetUserId] = useState("");
  const [sending, setSending] = useState(false);

  // LIVE SEARCH
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        setLoadingSearch(true);
        const res = await fetch(`http://localhost:5000/api/admin/search?q=${search}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("ADMIN_TOKEN") },
        });
        const data = await res.json();
        setResults(data?.users || []);
      } catch (err) {
        console.error("Search error", err);
        setResults([]);
      } finally {
        setLoadingSearch(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const handleSendNotification = async () => {
    if (!notifyTitle.trim() || !notifyMessage.trim()) return;
    try {
      setSending(true);
      await axios.post(
        "/api/notifications",
        {
          userId: sendToAll ? null : targetUserId || null,
          title: notifyTitle,
          message: notifyMessage,
          type: "admin",
          meta: redirectUrl ? { redirectUrl } : null,
        },
        { headers: { Authorization: "Bearer " + localStorage.getItem("ADMIN_TOKEN") } }
      );
      setNotifyTitle("");
      setNotifyMessage("");
      setRedirectUrl("");
      setTargetUserId("");
      setSendToAll(true);
      setOpenNotify(false);
    } catch (err) {
      console.error("Notification send error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar sx={{ minHeight: 80, px: { xs: 2, md: 4 } }}>
          <IconButton sx={{ color: "#00eaff", mr: 2, display: { md: "none" } }} onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>

          {/* OMNI-SEARCH TERMINAL */}
          <Box sx={{ position: "relative", width: { xs: 200, md: 450 } }}>
            <TextField
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="OMNI-SEARCH: DISCOVER RECORDS..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.03)",
                  borderRadius: "14px",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  transition: "all 0.3s",
                  border: "1px solid rgba(255,255,255,0.05)",
                  "& fieldset": { border: "none" },
                  "&:hover": { bgcolor: "rgba(255,255,255,0.06)", borderColor: "rgba(0, 234, 255, 0.2)" },
                  "&.Mui-focused": { bgcolor: "rgba(0, 234, 255, 0.05)", borderColor: "#00eaff", boxShadow: "0 0 15px rgba(0, 234, 255, 0.1)" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon sx={{ color: "#00eaff", fontSize: 20, opacity: 0.7 }} />
                  </InputAdornment>
                ),
              }}
            />

            <AnimatePresence>
              {search && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                >
                  <Paper sx={{
                    position: "absolute", top: 52, width: "100%", bgcolor: "rgba(2, 6, 23, 0.95)",
                    backdropFilter: "blur(20px)", border: "1px solid rgba(0, 234, 255, 0.2)",
                    zIndex: 2000, maxHeight: 350, overflowY: "auto", borderRadius: "16px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.8)", backgroundImage: "none"
                  }}>
                    {loadingSearch ? (
                      <Box sx={{ p: 4, textAlign: "center" }}><CircularProgress size={24} sx={{ color: "#00eaff" }} /></Box>
                    ) : results.length === 0 ? (
                      <Box sx={{ p: 4, textAlign: "center" }}>
                         <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>NO SIGNALS DETECTED</Typography>
                      </Box>
                    ) : (
                      <List sx={{ p: 1 }}>
                        <Typography variant="caption" sx={{ px: 2, py: 1, display: "block", color: "#00eaff", fontWeight: 900, opacity: 0.5, fontSize: 9 }}>SEARCH RESULTS</Typography>
                        {results.map((u) => (
                          <ListItemButton 
                            key={u._id} 
                            onClick={() => { navigate(`/admin/users/${u._id}`); setSearch(""); }}
                            sx={{ borderRadius: "10px", mb: 0.5, "&:hover": { bgcolor: "rgba(255,255,255,0.03)" } }}
                          >
                            <ListItemText 
                              primary={<Typography variant="body2" sx={{ fontWeight: 800, color: "white" }}>{u.name}</Typography>} 
                              secondary={<Typography variant="caption" sx={{ opacity: 0.4, color: "white" }}>{u.email}</Typography>}
                            />
                            <BoltTwoToneIcon sx={{ fontSize: 14, color: "#22c55e", opacity: 0.5 }} />
                          </ListItemButton>
                        ))}
                      </List>
                    )}
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>

          <Box sx={{ flex: 1 }} />

          {/* ACTIONS HUB */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Tooltip title="Quick Commands">
              <IconButton 
                onClick={(e) => setAnchorQuick(e.currentTarget)} 
                sx={{ 
                  color: "rgba(255,255,255,0.5)", 
                  bgcolor: "rgba(255,255,255,0.03)",
                  "&:hover": { color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.05)" } 
                }}
              >
                <AddCircleTwoToneIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Neural Alerts">
              <IconButton sx={{ 
                  color: "rgba(255,255,255,0.5)", 
                  bgcolor: "rgba(255,255,255,0.03)",
                  "&:hover": { color: "#f43f5e", bgcolor: "rgba(244, 63, 94, 0.05)" } 
                }}>
                <Badge 
                  badgeContent={notifyCount} 
                  sx={{ 
                    "& .MuiBadge-badge": { 
                        bgcolor: "#f43f5e", 
                        color: "white", 
                        fontWeight: 900, 
                        fontSize: 10,
                        boxShadow: "0 0 10px rgba(244, 63, 94, 0.5)"
                    } 
                  }}
                >
                  <NotificationsTwoToneIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* PROFILE CONSOLE */}
            <Box 
              onClick={(e) => setAnchorProfile(e.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                bgcolor: "rgba(0, 234, 255, 0.05)",
                p: "4px 12px 4px 6px",
                borderRadius: "30px",
                border: "1px solid rgba(0, 234, 255, 0.2)",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": { borderColor: "#00eaff", boxShadow: "0 0 15px rgba(0, 234, 255, 0.1)" }
              }}
            >
              <Avatar
                sx={{
                  width: 32, height: 32,
                  bgcolor: "#00eaff",
                  color: "black",
                  fontWeight: 900,
                  fontSize: 14
                }}
              >
                {admin?.email?.[0]?.toUpperCase() || "A"}
              </Avatar>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                 <Typography variant="caption" sx={{ fontWeight: 900, color: "white", display: "block", lineHeight: 1 }}>{admin?.email?.split("@")[0] || "ADMIN"}</Typography>
                 <Typography variant="caption" sx={{ fontSize: 8, color: "#00eaff", fontWeight: 800, letterSpacing: 1, opacity: 0.7 }}>LEVEL 1 AUTHORIZED</Typography>
              </Box>
            </Box>
          </Stack>

          {/* MENUS */}
          <Menu
            anchorEl={anchorQuick}
            open={Boolean(anchorQuick)}
            onClose={() => setAnchorQuick(null)}
            PaperProps={{ sx: { 
                mt: 1.5,
                bgcolor: "rgba(2, 6, 23, 0.9)",
                backdropFilter: "blur(20px)",
                color: "white", 
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                minWidth: 200,
                backgroundImage: "none"
            } }}
          >
            <MenuItem onClick={() => { navigate("/admin/users/add"); setAnchorQuick(null); }} sx={{ py: 1.5, "&:hover": { bgcolor: "rgba(0, 234, 255, 0.05)" } }}>
              <PersonTwoToneIcon fontSize="small" sx={{ mr: 2, color: "#00eaff" }} /> 
              <Typography variant="body2" fontWeight={800}>Register Operator</Typography>
            </MenuItem>
            <MenuItem onClick={() => { navigate("/admin/courses/add"); setAnchorQuick(null); }} sx={{ py: 1.5, "&:hover": { bgcolor: "rgba(0, 234, 255, 0.05)" } }}>
              <LocalLibraryTwoToneIcon fontSize="small" sx={{ mr: 2, color: "#00eaff" }} /> 
              <Typography variant="body2" fontWeight={800}>Inject Curriculum</Typography>
            </MenuItem>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
            <MenuItem onClick={() => { setOpenNotify(true); setAnchorQuick(null); }} sx={{ py: 1.5, "&:hover": { bgcolor: "rgba(168, 85, 247, 0.05)" } }}>
              <SendTwoToneIcon fontSize="small" sx={{ mr: 2, color: "#a855f7" }} /> 
              <Typography variant="body2" fontWeight={800}>System Broadcast</Typography>
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={anchorProfile}
            open={Boolean(anchorProfile)}
            onClose={() => setAnchorProfile(null)}
            PaperProps={{ sx: { 
                mt: 1.5,
                bgcolor: "rgba(2, 6, 23, 0.9)",
                backdropFilter: "blur(20px)",
                color: "white", 
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                minWidth: 180,
                backgroundImage: "none"
            } }}
          >
            <MenuItem onClick={() => navigate("/admin/settings")} sx={{ py: 1.5 }}>
              <SettingsTwoToneIcon fontSize="small" sx={{ mr: 2, opacity: 0.5 }} /> 
              <Typography variant="body2" fontWeight={800}>Settings Console</Typography>
            </MenuItem>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
            <MenuItem onClick={logout} sx={{ py: 1.5, color: "#f43f5e" }}>
              <LogoutTwoToneIcon fontSize="small" sx={{ mr: 2 }} /> 
              <Typography variant="body2" fontWeight={900}>Terminate Session</Typography>
            </MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>

      {/* NOTIFICATION BROADCAST DIALOG */}
      <Dialog 
        open={openNotify} 
        onClose={() => setOpenNotify(false)} 
        fullWidth 
        PaperProps={{ sx: { bgcolor: "#020617", color: "white", border: "1px solid rgba(0, 234, 255, 0.2)", borderRadius: "20px", p: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: 24, letterSpacing: "-0.02em" }}>Broadcast Protocol</DialogTitle>
        <DialogContent>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 800, display: "block", mb: 2, textTransform: "uppercase", letterSpacing: 1 }}>COMPOSE SIGNAL</Typography>
          <TextField fullWidth label="Signal Title" margin="dense" value={notifyTitle} onChange={(e) => setNotifyTitle(e.target.value)}
            sx={{ mb: 2, "& .MuiInputBase-root": { color: "white", fontWeight: 700 }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }} />
          <TextField fullWidth multiline rows={4} label="Message Payload" margin="dense" value={notifyMessage} onChange={(e) => setNotifyMessage(e.target.value)}
            sx={{ mb: 2, "& .MuiInputBase-root": { color: "white" }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }} />
          
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, p: 2, borderRadius: "14px", bgcolor: "rgba(255,255,255,0.02)" }}>
             <Box>
                <Typography variant="body2" fontWeight={800}>Global Broadcast</Typography>
                <Typography variant="caption" sx={{ opacity: 0.5 }}>Transmit signal to all active users</Typography>
             </Box>
             <Switch checked={sendToAll} onChange={(e) => setSendToAll(e.target.checked)} sx={{ "& .MuiSwitch-thumb": { color: "#00eaff" } }} />
          </Stack>

          {!sendToAll && (
            <TextField fullWidth label="Target Identifier (User ID)" margin="dense" value={targetUserId} onChange={(e) => setTargetUserId(e.target.value)}
              sx={{ mt: 2, "& .MuiInputBase-root": { color: "white" }, "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)" }, "& fieldset": { borderColor: "rgba(255,255,255,0.1)" } }} />
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenNotify(false)} sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 800 }}>Abort</Button>
          <Button 
            variant="contained" 
            onClick={handleSendNotification} 
            disabled={sending} 
            startIcon={<SendTwoToneIcon />}
            sx={{ bgcolor: "#00eaff", color: "black", fontWeight: 900, borderRadius: "12px", px: 4, "&:hover": { bgcolor: "#00c4d6" } }}
          >
            {sending ? "TRANSMITTING..." : "INITIATE BROADCAST"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
