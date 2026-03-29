import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Alert,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Pagination,
  Stack,
  Avatar,
  TableContainer
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ICONS */
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import HubTwoToneIcon from "@mui/icons-material/HubTwoTone";
import FingerprintTwoToneIcon from "@mui/icons-material/FingerprintTwoTone";

import { fetchUsers } from "../../Adminapi/users";

const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function AllCustomers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    loadCustomers();
  }, [page]);

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await fetchUsers({ page, limit: 12, search });
      setCustomers(data.users || []);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUsers || 0);
    } catch (err) {
      setError("FAILED TO SYNCHRONIZE DIRECTORY FEED.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearchKeys = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      loadCustomers();
    }
  }

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER SECTION */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6} flexWrap="wrap" gap={3}>
        <Box>
          <Typography sx={{ color: "#00eaff", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
            OPERATIVE ARCHIVE · DIRECTORY SECTOR
          </Typography>
          <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
            Neural Registry
          </Typography>
          <Typography sx={{ opacity: 0.4, mt: 1, fontWeight: 500, color: "white", fontSize: 14 }}>{totalUsers} ACTIVE ASSETS CONNECTED TO NETWORK</Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Box sx={searchContainerStyle}>
            <SearchTwoToneIcon sx={{ color: "rgba(255,255,255,0.2)", mr: 2 }} />
            <TextField
              variant="standard"
              placeholder="SEARCH IDENTIFIER..."
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeys}
              InputProps={{ disableUnderline: true, sx: { color: "white", py: 1.5, fontWeight: 700, fontSize: 13, letterSpacing: 1 } }}
            />
          </Box>
          <Button 
            variant="contained" 
            component={Link} 
            to="/admin/Customers/AddCustomer"
            startIcon={<AddTwoToneIcon />}
            sx={actionButtonStyle}
          >
            INITIALIZE ASSET
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error" variant="filled" sx={alertStyle}>{error}</Alert>}

      {/* TABLE CONTAINER */}
      <TableContainer component={Paper} sx={tablePaperStyle}>
        {loading ? (
          <Box sx={{ p: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <CircularProgress sx={{ color: "#00eaff" }} thickness={4} size={60} />
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4 }}>SYNCHRONIZING...</Typography>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.01)" }}>
              <TableRow>
                <TableCell sx={headerStyle}>OPERATIVE IDENTITY</TableCell>
                <TableCell sx={headerStyle}>ENGAGEMENT</TableCell>
                <TableCell sx={headerStyle}>LIFETIME VALUE</TableCell>
                <TableCell sx={headerStyle}>SIGNAL STATUS</TableCell>
                <TableCell sx={headerStyle}>REGISTRY DATE</TableCell>
                <TableCell align="right" sx={headerStyle}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {customers.map((cust, idx) => (
                  <TableRow 
                    key={cust.id} 
                    component={motion.tr}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.01)" }, borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                  >
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={3}>
                        <Avatar sx={avatarStyle}>
                          {cust.name?.[0]?.toUpperCase() || <PersonTwoToneIcon />}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={900} fontSize={15} color="white" sx={{ letterSpacing: "-0.01em" }}>{cust.name || "UNIDENTIFIED"}</Typography>
                          <Typography fontSize={11} sx={{ opacity: 0.3, color: "white", fontFamily: "monospace", letterSpacing: 0.5 }}>{cust.email || "NO_SIGNAL"}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Chip 
                        icon={<HubTwoToneIcon sx={{ fontSize: "14px !important", color: "inherit !important" }} />}
                        label={`${cust.coursesCount || 0} ASSETS`} 
                        sx={chipStyle} 
                      />
                    </TableCell>

                    <TableCell>
                      <Typography fontWeight={900} sx={{ color: "white", fontSize: 14 }}>{formatCurrency(cust.totalSpent)}</Typography>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: "50%", 
                            bgcolor: cust.isActive ? "#22c55e" : "#f43f5e", 
                            boxShadow: cust.isActive ? "0 0 12px #22c55e" : "0 0 12px #f43f5e" 
                        }} />
                        <Typography variant="caption" sx={{ fontWeight: 900, color: cust.isActive ? "#22c55e" : "#f43f5e", letterSpacing: 1, fontSize: 10 }}>
                          {cust.isActive ? "ONLINE" : "SILENT"}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 700, color: "white", fontFamily: "monospace" }}>
                        {new Date(cust.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="DEEP SCAN IDENTITY">
                          <IconButton size="small" onClick={() => navigate(`/admin/Customers/CustomerDetails/${cust.id}`)} sx={actionIconStyle("#00eaff")}>
                            <FingerprintTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="TRANSACTIONAL LOGS">
                          <IconButton size="small" onClick={() => navigate(`/admin/users/${cust.id}/payments`)} sx={actionIconStyle("#f59e0b")}>
                            <ReceiptTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}

        <Box p={4} display="flex" justifyContent="space-between" alignItems="center" borderTop="1px solid rgba(255,255,255,0.03)">
          <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 700, color: "white", letterSpacing: 1 }}>SECTOR {page} / {totalPages}</Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, v) => setPage(v)}
            size="large"
            sx={paginationStyle}
          />
        </Box>
      </TableContainer>
    </Box>
  );
}

const headerStyle = {
  color: "rgba(255,255,255,0.4)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 2,
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  py: 3,
  fontFamily: "monospace"
};

const tablePaperStyle = {
  background: "rgba(255,255,255,0.02)", 
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
  backgroundImage: "none"
};

const searchContainerStyle = {
  display: "flex",
  alignItems: "center",
  bgcolor: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "16px",
  px: 3,
  width: { xs: "100%", sm: 320 },
  transition: "all 0.4s",
  "&:focus-within": { borderColor: "#00eaff", boxShadow: "0 0 25px rgba(0, 234, 255, 0.15)" }
};

const actionButtonStyle = {
  borderRadius: "16px", 
  px: 4, 
  fontWeight: 900, 
  bgcolor: "#00eaff", 
  color: "#000", 
  textTransform: "uppercase",
  letterSpacing: 1,
  "&:hover": { bgcolor: "#00c4d6", transform: "translateY(-2px)" },
  transition: "all 0.3s",
  boxShadow: "0 10px 25px rgba(0, 234, 255, 0.2)"
};

const avatarStyle = { 
  width: 52, 
  height: 52, 
  bgcolor: "rgba(255,255,255,0.03)", 
  color: "white", 
  border: "1px solid rgba(255,255,255,0.1)", 
  fontWeight: 900,
  fontSize: 18,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

const chipStyle = { 
  bgcolor: "rgba(255,255,255,0.03)", 
  color: "rgba(255,255,255,0.7)", 
  fontWeight: 900, 
  borderRadius: "10px", 
  border: "1px solid rgba(255,255,255,0.06)",
  fontSize: 10,
  letterSpacing: 1
};

const actionIconStyle = (color) => ({
  color: color, 
  opacity: 0.4, 
  transition: "all 0.3s",
  "&:hover": { opacity: 1, bgcolor: `${color}10`, transform: "scale(1.1)" }
});

const paginationStyle = {
  "& .MuiPaginationItem-root": { color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", fontWeight: 800, fontSize: 13, px: 2 },
  "& .Mui-selected": { bgcolor: "#00eaff !important", color: "black", fontWeight: 900, border: "none", boxShadow: "0 10px 20px rgba(0, 234, 255, 0.2)" }
};

const alertStyle = { mb: 4, borderRadius: "16px", fontWeight: 800, letterSpacing: 1, bgcolor: "#f43f5e", color: "white" };
