import { Box, Typography, Divider, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChannelList from "../sidebar/ChannelList";
import DMList from "../sidebar/DMList";
import WorkspaceInfo from "../sidebar/WorkspaceInfo";
import UserStatus from "../sidebar/UserStatus";
import CreateChannelModal from "../modals/CreateChannelModal";
import InviteUserModal from "../modals/InviteUserModal";
import NewMessageModal from "../modals/NewMessageModal";
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * =====================================================
 * SLACK SIDEBAR LAYOUT
 * =====================================================
 * - Workspace
 * - Channels
 * - DMs
 * - Status
 */

export default function ChatSidebar() {
  const [openChannel, setOpenChannel] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);
  const [openNewMessage, setOpenNewMessage] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users for sidebar list (Simplified: Fetch all for now)
    // In PROD: Fetch only recent DMs
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.slice(0, 5)); // Limit to 5 for sidebar
      } catch (err) {
        console.error(err);
      }
    }
    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: "#02060f", // Match modern dark layout
        color: "rgba(255,255,255,0.7)",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(40px)",
      }}
    >
      {/* Workspace */}
      <WorkspaceInfo onInvite={() => setOpenInvite(true)} />

      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

      {/* Channels */}
      <Box px={2} py={1} display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontSize={11} color="rgba(255,255,255,0.4)" fontWeight="700" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          Channels
        </Typography>
        <IconButton size="small" onClick={() => setOpenChannel(true)}>
          <AddIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }} />
        </IconButton>
      </Box>

      <ChannelList />

      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", my: 1 }} />

      {/* DMs */}
      <Box px={2} py={1} display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontSize={11} color="rgba(255,255,255,0.4)" fontWeight="700" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          Direct Messages
        </Typography>
        <IconButton size="small" onClick={() => setOpenNewMessage(true)}>
          <AddIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 16 }} />
        </IconButton>
      </Box>

      <DMList users={users} />

      <Box flex={1} />

      {/* User status */}
      <UserStatus />

      {/* Modals */}
      <CreateChannelModal open={openChannel} onClose={() => setOpenChannel(false)} />
      <InviteUserModal open={openInvite} onClose={() => setOpenInvite(false)} />
      <NewMessageModal open={openNewMessage} onClose={() => setOpenNewMessage(false)} />
    </Box>
  );
}
