import { Box, Typography } from "@mui/material";
import { useChat } from "../../context/ChatContext";
import { useTypingUsers } from "../../hooks/useTyping";

/**
 * =====================================================
 * SOCKET.IO TYPING INDICATOR
 * =====================================================
 */

export default function TypingIndicator() {
  const { activeChat, user, isAiTyping, aiStatus } = useChat();

  // Directly use the hook which now returns the object of typing users
  const typingUsers = useTypingUsers(activeChat?.id, activeChat?.type);

  // Filter out self and get names (if we had names, for now just keys/IDs)
  const typingIds = Object.keys(typingUsers || {}).filter(id => id !== user?.uid);

  if (typingIds.length === 0 && !isAiTyping) return null;

  return (
    <Box sx={{ px: 2, py: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography fontSize={12} color="#00eaff" sx={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 1 }}>
        {isAiTyping ? (
          <>
            <Box sx={{ display: 'flex', gap: 0.4 }}>
               {[1,2,3].map(i => (
                 <Box key={i} sx={{ 
                   width: 4, height: 4, borderRadius: '50%', bgcolor: '#00eaff',
                   animation: `typingPulse 1s infinite ${i * 0.2}s`
                 }} />
               ))}
            </Box>
            {aiStatus}
          </>
        ) : (
          typingIds.length === 1 ? "Someone is typing..." : "Several people are typing..."
        )}
      </Typography>

      <style>{`
        @keyframes typingPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>
    </Box>
  );
}
