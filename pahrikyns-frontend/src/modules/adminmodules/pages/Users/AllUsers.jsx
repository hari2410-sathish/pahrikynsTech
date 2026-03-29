import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  Pagination,
  Stack,
  Tooltip,
  InputAdornment,
  Avatar
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

/* ICONS */
import SearchIcon from "@mui/icons-material/Search";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";
import TimelineTwoToneIcon from "@mui/icons-material/TimelineTwoTone";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

import { useNavigate } from "react-router-dom";
import { fetchUsers, toggleUserStatus } from "../../Adminapi/users";

export default function AllUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  async function loadUsers(params = {}) {
    try {
      setLoading(true);
      const data = await fetchUsers({
        search: params.search ?? q,
        status: params.status ?? status,
        page: params.page ?? page,
      });

      setUsers(data.users || []);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      console.error(e);
      showToast("Identity sync failed. Check neural link.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [page, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadUsers({ search: q, page: 1 });
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* ================= HEADER ================= */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6, alignItems: "center" }}>
        <Box>
           <Stack direction="row" spacing={1} alignItems="center" mb={1}>
             <PeopleAltTwoToneIcon sx={{ color: "#00eaff", fontSize: 28 }} />
             <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: "-0.02em", color: "white" }}>Identity Registry</Typography>
           </Stack>
           <Typography variant="body2" sx={{ opacity: 0.5, fontWeight: 500, color: "white" }}>
             Manage global student entities and participation metrics.
           </Typography>
        </Box>
        
        <Stack direction="row" spacing={2} alignItems="center">
           <Select
            size="small"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            sx={selectStyle}
          >
            <MenuItem value="all">ALL ENTITIES</MenuItem>
            <MenuItem value="active">AUTHORIZED</MenuItem>
            <MenuItem value="blocked">REVOKED</MenuItem>
          </Select>

           <TextField
            placeholder="SCAN BY NAME / EMAIL / ID..."
            size="small"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255,255,255,0.3)" }} />
                </InputAdornment>
              ),
            }}
            sx={searchStyle}
          />
        </Stack>
      </Box>

      {/* ================= DATA TABLE ================= */}
      <Paper sx={{ 
        borderRadius: 6, 
        overflow: "hidden", 
        background: "rgba(255,255,255,0.02)", 
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "none"
      }}>
        <Table>
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
            <TableRow>
              <TableCell sx={headerStyle}>STUDENT ARCHIVE</TableCell>
              <TableCell sx={headerStyle}>CONTACT CHANNEL</TableCell>
              <TableCell sx={headerStyle}>CURRICULUM</TableCell>
              <TableCell sx={headerStyle}>ACCESS STATUS</TableCell>
              <TableCell sx={headerStyle} align="right">OVERRIDE ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 12 }}>
                  <CircularProgress size={30} sx={{ color: "#00eaff" }} />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
               <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 12, opacity: 0.5, color: "white" }}>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>ZERO RECORDS MATCH YOUR SCAN</Typography>
                </TableCell>
               </TableRow>
            ) : (
              <AnimatePresence mode="popLayout">
                {users.map((u, idx) => {
                  const id = u.id || u._id;
                  const isBlocked = u.isActive === false;

                  return (
                    <TableRow
                      component={motion.tr}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.02 }}
                      key={id}
                      hover
                      sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" } }}
                    >
                      <TableCell sx={cellStyle}>
                         <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ bgcolor: "rgba(0, 234, 255, 0.1)", color: "#00eaff", fontWeight: 900, border: "1px solid #00eaff44" }}>
                              {u.name?.[0].toUpperCase() || "U"}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 800, color: "white" }}>{u.name || u.fullName}</Typography>
                              <Typography variant="caption" sx={{ opacity: 0.4, color: "white", display: "flex", alignItems: "center", gap: 0.5 }}>
                                <FingerprintIcon sx={{ fontSize: 10 }} /> {id.slice(-8).toUpperCase()}
                              </Typography>
                            </Box>
                         </Stack>
                      </TableCell>
                      
                      <TableCell sx={cellStyle}>
                         <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>{u.email}</Typography>
                         <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)" }}>{u.phone || "No Comms Linked"}</Typography>
                      </TableCell>

                      <TableCell sx={cellStyle}>
                        <Chip
                          label={`${u.coursesCount || 0} ENROLLED`}
                          size="small"
                          sx={{ 
                            bgcolor: "rgba(123, 63, 228, 0.1)", 
                            color: "#a855f7",
                            fontWeight: 900,
                            fontSize: 10,
                            border: "1px solid rgba(123, 63, 228, 0.3)"
                          }}
                        />
                      </TableCell>

                      <TableCell sx={cellStyle}>
                        <Chip
                          label={isBlocked ? "REVOKED" : "AUTHORIZED"}
                          size="small"
                          sx={{ 
                            bgcolor: isBlocked ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)", 
                            color: isBlocked ? "#ef4444" : "#22c55e",
                            fontWeight: 900,
                            fontSize: 10,
                            border: `1px solid ${isBlocked ? "#ef444444" : "#22c55e44"}`
                          }}
                        />
                      </TableCell>

                      <TableCell sx={cellStyle} align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                           <Tooltip title={isBlocked ? "Restore Access" : "Revoke Access"}>
                              <IconButton
                                size="small"
                                onClick={async () => {
                                  if (window.confirm(`Initiate protocols to ${isBlocked ? 'RESTORE' : 'REVOKE'} access for ${u.name}?`)) {
                                    try {
                                      await toggleUserStatus(id);
                                      showToast("Entity status recalibrated", "success");
                                      loadUsers();
                                    } catch (e) {
                                      showToast("Recalibration failed");
                                    }
                                  }
                                }}
                                sx={{ color: isBlocked ? "#22c55e" : "#ef4444", bgcolor: isBlocked ? "rgba(34, 197, 94, 0.05)" : "rgba(239, 68, 68, 0.05)" }}
                              >
                                {isBlocked ? <CheckCircleTwoToneIcon fontSize="small" /> : <BlockIcon fontSize="small" />}
                              </IconButton>
                           </Tooltip>

                           <Tooltip title="Neural Profile">
                              <IconButton
                                size="small"
                                onClick={() => navigate(`/admin/users/${id}`)}
                                sx={{ color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.05)" }}
                              >
                                <VisibilityTwoToneIcon fontSize="small" />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title="Ledger History">
                              <IconButton
                                size="small"
                                onClick={() => navigate(`/admin/users/${id}/payments`)}
                                sx={{ color: "#f59e0b", bgcolor: "rgba(245, 158, 11, 0.05)" }}
                              >
                                <ReceiptLongTwoToneIcon fontSize="small" />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title="Activity Flux">
                              <IconButton
                                size="small"
                                onClick={() => navigate(`/admin/users/${id}/activity`)}
                                sx={{ color: "#a855f7", bgcolor: "rgba(168, 85, 247, 0.05)" }}
                              >
                                <TimelineTwoToneIcon fontSize="small" />
                              </IconButton>
                           </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 6 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
            sx={paginationStyle}
          />
        </Stack>
      )}

      {/* ================= TOAST ================= */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type} sx={{ borderRadius: 3, fontWeight: 800 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}

const headerStyle = {
  color: "rgba(255,255,255,0.4)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 1.5,
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  py: 3
};

const cellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  py: 2.5
};

const selectStyle = {
  minWidth: 160,
  color: "white",
  fontWeight: 900,
  fontSize: 12,
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiSvgIcon-root": { color: "#00eaff" }
};

const searchStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    color: "white",
    width: 300,
    bgcolor: "rgba(255,255,255,0.03)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" }
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.3)", opacity: 1, fontWeight: 700, fontSize: 10 }
};

const paginationStyle = {
  "& .MuiPaginationItem-root": { color: "white", fontSize: 12, fontWeight: 800 },
  "& .Mui-selected": { bgcolor: "rgba(0, 234, 255, 0.1) !important", color: "#00eaff", border: "1px solid #00eaff44" }
};
