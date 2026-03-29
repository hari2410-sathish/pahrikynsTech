import { Box, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { sendMessage } from "../../api/chatApi";
import { useAuth } from "@/contexts/AuthContext";
import { uploadChatFile } from "../../utils/uploadFile";
import ChatTooltip from "../common/ChatTooltip";
import EmojiPickerButton from "../common/EmojiPickerButton";

export default function ChatFooter() {
  const [text, setText] = useState("");
  const { activeChat, sendMessage } = useChat(); // Use Context
  const { user } = useAuth();

  const handleSend = async () => {
    if (!text || !activeChat) return;

    // Direct Socket Send
    sendMessage(text, "text");

    setText("");
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeChat) return;

    try {
      // Upload to Firebase Storage
      const { url, type, name } = await uploadChatFile(file, activeChat.id);

      // Determine Msg Type
      const msgType = type.startsWith("image/") ? "image" : "file";

      // Send via Socket
      sendMessage(name, msgType, url);

    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload file");
    }
  };

  return (
    <Box px={3} pb={4} pt={1}>
      <Box
        sx={{
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          bgcolor: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          overflow: "hidden",
          transition: "0.3s",
          "&:focus-within": {
            borderColor: "#00eaff",
            boxShadow: "0 0 20px rgba(0, 234, 255, 0.15)",
            bgcolor: "rgba(255,255,255,0.05)",
          },
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={2}
          maxRows={10}
          placeholder={`Message ${activeChat?.name || "chat"}...`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              p: 2,
              fontSize: 16,
              color: "white",
              "& fieldset": { border: "none" },
              "&::placeholder": { color: "rgba(255,255,255,0.4)" }
            },
          }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1.5} borderTop="1px solid rgba(255,255,255,0.05)">
          <Box display="flex" gap={1.5}>
            <ChatTooltip title="Attach file">
              <IconButton size="small" component="label" sx={{ color: "rgba(255,255,255,0.5)", '&:hover': { color: "#00eaff" } }}>
                <AttachFileIcon fontSize="small" />
                <input hidden type="file" onChange={handleFile} />
              </IconButton>
            </ChatTooltip>

            <ChatTooltip title="Mention someone">
              <IconButton size="small" sx={{ color: "rgba(255,255,255,0.5)", '&:hover': { color: "#00eaff" } }}><Typography fontSize={16}>@</Typography></IconButton>
            </ChatTooltip>

            <EmojiPickerButton onEmojiClick={(emoji) => setText(prev => prev + emoji)} />
          </Box>

          <Box
            onClick={handleSend}
            sx={{
              background: text.trim() ? "linear-gradient(135deg, #00eaff, #7b3fe4)" : "rgba(255,255,255,0.1)", 
              color: text.trim() ? "white" : "rgba(255,255,255,0.3)",
              borderRadius: "12px",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: text.trim() ? "pointer" : "default",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": text.trim() ? { transform: "scale(1.1)", boxShadow: "0 0 20px rgba(0, 234, 255, 0.4)" } : {}
            }}
          >
            <SendIcon fontSize="small" />
          </Box>
        </Box>
      </Box>
      <Typography variant="caption" sx={{ display: 'block', mt: 1.5, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
        Use <b>@ai</b> to trigger the Pahrikyns Assistant
      </Typography>
    </Box>
  );
}
