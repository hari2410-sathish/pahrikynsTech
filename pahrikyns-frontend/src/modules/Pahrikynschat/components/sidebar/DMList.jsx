import {
  List,
  ListItem,
  Box,
  Typography,
  Avatar,
  Badge
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext";
import { usePresence } from "../../hooks/usePresence";

/**
 * =====================================================
 * SLACK-LEVEL DM LIST
 * =====================================================
 */

export default function DMList({ users = [] }) {
  const { setActiveChat, activeChat } = useChat();
  const navigate = useNavigate();

  const openDM = (user) => {
    setActiveChat({
      type: "dm",
      id: user.id,
      name: user.name,
    });

    navigate(`/chat/dm/${user.id}`);
  };

  const AI_BOT = { id: "ai_assistant", name: "Pahrikyns AI Assistant", isAi: true };

  return (
    <List>
      {/* 🤖 AI ASSISTANT ALWAYS AT TOP */}
      <ListItem
        onClick={() => openDM(AI_BOT)}
        sx={{
          cursor: "pointer",
          borderRadius: 2,
          mx: 1,
          px: 1.5,
          py: 0.8,
          bgcolor: activeChat?.id === AI_BOT.id ? "rgba(0, 234, 255, 0.1)" : "transparent",
          "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
           <Avatar sx={{ 
             width: 28, height: 28, 
             background: "linear-gradient(135deg, #00eaff, #7b3fe4)",
             fontSize: 14, fontWeight: 'bold'
           }}>
             ✨
           </Avatar>
           <Box>
             <Typography fontSize={14} color="#00eaff" fontWeight="bold">AI Assistant</Typography>
             <Typography fontSize={10} color="rgba(0,234,255,0.5)">Automated Support</Typography>
           </Box>
        </Box>
      </ListItem>

      {users.map((user) => {
        const { isOnline } = usePresence(user.id);
        const isActive = activeChat?.id === user.id;

        return (
          <ListItem
            key={user.id}
            onClick={() => openDM(user)}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              mx: 1,
              px: 1.5,
              py: 1,
              bgcolor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
              "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Badge
                overlap="circular"
                variant="dot"
                sx={{
                  "& .MuiBadge-badge": {
                    bgcolor: isOnline ? "#22c55e" : "#64748b",
                    boxShadow: isOnline ? "0 0 6px #22c55e" : "none",
                  },
                }}
              >
                <Avatar sx={{ width: 28, height: 28, bgcolor: isActive ? "#00eaff" : "#334155" }}>
                  {user.name?.charAt(0)}
                </Avatar>
              </Badge>

              <Typography
                fontSize={14}
                color={isActive ? "white" : "rgba(255,255,255,0.7)"}
                fontWeight={isActive ? "bold" : "normal"}
              >
                {user.name}
              </Typography>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
}
