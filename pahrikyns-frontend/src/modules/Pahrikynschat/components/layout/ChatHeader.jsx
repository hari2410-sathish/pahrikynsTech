import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Tooltip,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import InfoIcon from "@mui/icons-material/Info";
import { useChat } from "../../context/ChatContext";
import { usePresence } from "../../hooks/usePresence";
import { useEffect, useState } from "react";

/**
 * =====================================================
 * SLACK-LEVEL CHAT HEADER
 * =====================================================
 */

export default function ChatHeader() {
  const { activeChat } = useChat();
  const [onlineCount, setOnlineCount] = useState(0);
  const { onlineUsers } = usePresence(activeChat?.id);

  useEffect(() => {
    if (!onlineUsers) return;
    setOnlineCount(onlineUsers.length);
  }, [onlineUsers]);

  if (!activeChat)
    return (
      <Box p={2} borderBottom="1px solid rgba(255,255,255,0.08)" color="rgba(255,255,255,0.5)">
        Select a chat
      </Box>
    );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 1.5,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        bgcolor: "#040814",
        height: 70,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* LEFT */}
      <Box display="flex" alignItems="center" gap={1.5}>
        <Typography variant="h6" fontWeight="800" sx={{ color: "white", letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box component="span" sx={{ color: "#00eaff", fontWeight: 400 }}>{activeChat.type === "channel" ? "#" : "●"}</Box>
          {activeChat.name}
        </Typography>

        {activeChat.type === "channel" && (
          <Box 
            sx={{ 
              display: "flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.4, 
              borderRadius: 2, bgcolor: "rgba(0,234,255,0.05)", border: "1px solid rgba(0,234,255,0.1)"
            }}
          >
            <Typography fontSize={11} fontWeight="700" color="#00eaff">
              {onlineCount} ACTIVE
            </Typography>
          </Box>
        )}
      </Box>

      {/* RIGHT */}
      <Box display="flex" alignItems="center" gap={2}>
        <Tooltip title="Search conversation">
          <IconButton size="small" sx={{ color: "rgba(255,255,255,0.4)", '&:hover': { color: "#00eaff", bgcolor: "rgba(0,234,255,0.05)" } }}>
            <SearchIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Details">
          <IconButton size="small" sx={{ color: "rgba(255,255,255,0.4)", '&:hover': { color: "#00eaff", bgcolor: "rgba(0,234,255,0.05)" } }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
