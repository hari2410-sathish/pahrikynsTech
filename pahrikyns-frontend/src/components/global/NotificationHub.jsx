import React, { useState, useEffect } from "react";
import { 
  Box, IconButton, Badge, Menu, MenuItem, Typography, 
  Divider, List, ListItem, ListItemText, ListItemAvatar, 
  Avatar, CircularProgress, Button, Tooltip 
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InfoIcon from "@mui/icons-material/Info";
import { fetchNotifications, markNotificationReadAPI, markAllReadAPI } from "../../api/notifications";
import { useSocket } from "../../contexts/SocketContext";
import { useAuth } from "../../contexts/AuthContext";

export default function NotificationHub() {
  const { user } = useAuth();
  const socket = useSocket();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("new_notification", (notif) => {
        setNotifications(prev => [notif, ...prev].slice(0, 10));
        setUnreadCount(prev => prev + 1);
      });

      return () => socket.off("new_notification");
    }
  }, [socket]);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetchNotifications(1, 10);
      setNotifications(res.notifications || []);
      setUnreadCount(res.unread || 0);
    } catch (err) {
      console.error("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationReadAPI(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllReadAPI();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={handleClick} sx={{ color: "white" }}>
          <Badge 
            badgeContent={unreadCount} 
            color="error" 
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "#00eaff",
                color: "#1e293b",
                fontWeight: 900
              }
            }}
          >
            {unreadCount > 0 ? <NotificationsIcon sx={{ color: "#00eaff" }} /> : <NotificationsNoneIcon />}
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 500,
            mt: 1.5,
            borderRadius: 3,
            bgcolor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight={800} fontSize={16} sx={{ color: "#00eaff" }}>Notifications</Typography>
          {unreadCount > 0 && (
            <Button 
              size="small" 
              onClick={handleMarkAllRead}
              startIcon={<DoneAllIcon fontSize="small" />} 
              sx={{ textTransform: "none", fontSize: 12, color: "#00eaff", "&:hover": { bgcolor: "rgba(0,234,255,0.1)" } }}
            >
              Mark all read
            </Button>
          )}
        </Box>
        
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        {loading ? (
          <Box sx={{ py: 4, textAlign: "center" }}><CircularProgress size={24} /></Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center", opacity: 0.5 }}>
            <Typography variant="body2">No notifications yet.</Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((n) => (
              <ListItem 
                key={n.id} 
                sx={{ 
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  bgcolor: n.isRead ? "transparent" : "rgba(0,234,255,0.05)",
                  transition: "0.2s",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  cursor: "pointer"
                }}
                onClick={() => !n.isRead && handleMarkRead(n.id)}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: n.isRead ? "rgba(255,255,255,0.1)" : "primary.main" }}>
                    <InfoIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="body2" fontWeight={700}>{n.title}</Typography>}
                  secondary={
                    <Box component="span">
                      <Typography variant="caption" display="block" sx={{ color: "rgba(255,255,255,0.6)", mb: 0.5 }}>
                        {n.message}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
                        {new Date(n.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}

        {notifications.length > 0 && (
          <Box sx={{ p: 1, textAlign: "center" }}>
            <Button fullWidth size="small" sx={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
              View all notifications
            </Button>
          </Box>
        )}
      </Menu>
    </>
  );
}
