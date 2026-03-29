import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Select,
  CircularProgress,
  Stack,
  Pagination,
  Snackbar,
  Alert,
  Tooltip,
  Divider,
  Button,
} from "@mui/material";

import OpenInNewTwoToneIcon from "@mui/icons-material/OpenInNewTwoTone";
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import FingerprintTwoToneIcon from "@mui/icons-material/FingerprintTwoTone";

import { useNavigate } from "react-router-dom";
import {
  fetchAllCertificates,
  revokeCertificate,
} from "../../Adminapi/certificatesAdmin";
import { motion, AnimatePresence } from "framer-motion";

const ROWS_PER_PAGE = 10;

export default function AllCertificates() {
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [revokingId, setRevokingId] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ---------------- LOAD CERTIFICATES ----------------
  const loadCertificates = async () => {
    try {
      setLoading(true);
      const data = await fetchAllCertificates();
      setCertificates(Array.isArray(data) ? data : data.certificates || []);
    } catch (err) {
      console.error("Failed to load certificates", err);
      showToast("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  // ---------------- FILTER + SEARCH ----------------
  const filteredCertificates = useMemo(() => {
    let list = [...certificates];

    if (statusFilter !== "all") {
      list = list.filter(
        (c) =>
          (c.status || "").toLowerCase().trim() ===
          statusFilter.toLowerCase().trim()
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => {
        const fields = [
          c.userName,
          c.userEmail,
          c.courseTitle,
          c.certificateCode,
          c.code,
          c.publicId,
          c.certificateId,
        ]
          .filter(Boolean)
          .map(String)
          .map((v) => v.toLowerCase());

        return fields.some((f) => f.includes(q));
      });
    }

    return list;
  }, [certificates, statusFilter, search]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCertificates.length / ROWS_PER_PAGE)
  );

  const paginatedCertificates = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredCertificates.slice(start, start + ROWS_PER_PAGE);
  }, [filteredCertificates, page]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  // ---------------- HELPERS ----------------
  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return String(value);
    }
  };

  const statusChipColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "issued") return "#00eaff";
    if (s === "revoked") return "#f43f5e";
    return "rgba(255,255,255,0.4)";
  };

  // ---------------- REVOKE ----------------
  const handleRevoke = async (id) => {
    if (!window.confirm("CRITICAL: Authorize permanent revocation of academic credential?"))
      return;

    try {
      setRevokingId(id);
      await revokeCertificate(id);
      showToast("CREDENTIAL REVOKED", "success");
      loadCertificates();
    } catch (err) {
      console.error(err);
      showToast("Failed to revoke certificate");
    } finally {
      setRevokingId(null);
    }
  };

  // ---------------- RENDER ----------------
  return (
    <Box sx={{ p: 4 }}>
      {/* HEADER */}
      <Box mb={6} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
              ACADEMIC SECTOR · VERIFIED ASSETS
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Credential Archive
            </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
           <Button 
                variant="contained" 
                onClick={() => navigate("/admin/certificates/issue")}
                startIcon={<VerifiedUserTwoToneIcon />}
                sx={{ bgcolor: "#00eaff", color: "black", fontWeight: 900, borderRadius: "12px", px: 3, "&:hover": { bgcolor: "#00c4d6" } }}
           >
                AUTHORIZE NEW
           </Button>
        </Stack>
      </Box>

      {/* FILTERS TERMINAL */}
      <Paper sx={{ 
        p: 3, mb: 6, 
        borderRadius: "20px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "none"
      }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", bgcolor: "rgba(255,255,255,0.03)", borderRadius: "14px", px: 2, border: "1px solid rgba(255,255,255,0.08)" }}>
            <SearchTwoToneIcon sx={{ color: "#00eaff", mr: 1.5, opacity: 0.8 }} />
            <TextField
              variant="standard"
              placeholder="SEARCH USER / COURSE / UNIFIED CODE..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ disableUnderline: true, sx: { color: "white", fontSize: 13, fontWeight: 800, py: 1.5 } }}
              fullWidth
            />
          </Box>

          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              minWidth: 180,
              borderRadius: "14px",
              bgcolor: "rgba(255,255,255,0.03)",
              color: "white",
              fontWeight: 900,
              fontSize: 12,
              "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
            }}
          >
            <MenuItem value="all">ALL ASSETS</MenuItem>
            <MenuItem value="issued">ISSUED SIGNALS</MenuItem>
            <MenuItem value="revoked">REVOKED SIGNALS</MenuItem>
          </Select>
        </Stack>
      </Paper>

      {/* TABLE */}
      <Paper sx={{ 
        borderRadius: 6, 
        overflow: "hidden", 
        background: "rgba(255,255,255,0.02)", 
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "none"
      }}>
        {loading ? (
          <Box sx={{ p: 20, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={40} sx={{ color: "#00eaff" }} />
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
              <TableRow>
                <TableCell sx={headerStyle}>IDENTITY</TableCell>
                <TableCell sx={headerStyle}>ACADEMIC PARAMETER</TableCell>
                <TableCell sx={headerStyle}>FINGERPRINT</TableCell>
                <TableCell sx={headerStyle}>ASSET STATE</TableCell>
                <TableCell sx={headerStyle}>AUTHORIZATION TIMESTAMP</TableCell>
                <TableCell sx={headerStyle} align="right">OPTIONS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedCertificates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 20 }}>
                    <Typography variant="body2" sx={{ opacity: 0.3, fontWeight: 900, letterSpacing: 2 }}>ZERO CREDENTIALS DETECTED</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <AnimatePresence mode="popLayout">
                  {paginatedCertificates.map((c, idx) => {
                    const certId = c._id || c.id;

                    return (
                      <TableRow 
                        component={motion.tr}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        key={certId}
                        hover
                        sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" } }}
                      >
                        <TableCell sx={cellStyle}>
                          <Box>
                            <Typography sx={{ fontSize: 13, fontWeight: 900, color: "white" }}>
                              {c.userName || "—"}
                            </Typography>
                            <Typography sx={{ fontSize: 11, opacity: 0.4, color: "white" }}>
                              {c.userEmail}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell sx={cellStyle}>
                           <Stack direction="row" spacing={1} alignItems="center">
                              <SchoolTwoToneIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }} />
                              <Typography variant="body2" fontWeight={700} sx={{ color: "white", opacity: 0.8 }}>
                                {c.courseTitle || "—"}
                              </Typography>
                           </Stack>
                        </TableCell>

                        <TableCell sx={cellStyle}>
                           <Stack direction="row" spacing={1} alignItems="center">
                              <FingerprintTwoToneIcon sx={{ fontSize: 16, color: "#00eaff" }} />
                              <Typography sx={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 900, color: "#00eaff", textShadow: "0 0 10px rgba(0, 234, 255, 0.2)" }}>
                                {c.certificateCode || c.code || "—"}
                              </Typography>
                           </Stack>
                        </TableCell>

                        <TableCell sx={cellStyle}>
                          <Chip
                            label={c.status?.toUpperCase() || "—"}
                            size="small"
                            sx={{ 
                              bgcolor: `${statusChipColor(c.status)}11`, 
                              color: statusChipColor(c.status),
                              fontWeight: 900,
                              fontSize: 10,
                              border: `1px solid ${statusChipColor(c.status)}33`,
                              letterSpacing: 0.5
                            }}
                          />
                        </TableCell>

                        <TableCell sx={cellStyle}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: "rgba(255,255,255,0.3)" }}>
                                {formatDateTime(c.createdAt)}
                            </Typography>
                        </TableCell>

                        <TableCell sx={cellStyle} align="right">
                          <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            {certId && (
                              <IconButton
                                size="small"
                                onClick={() => navigate(`/admin/certificates/${certId}`)}
                                sx={{ color: "white", bgcolor: "rgba(255,255,255,0.03)" }}
                              >
                                <OpenInNewTwoToneIcon sx={{ fontSize: 18 }} />
                              </IconButton>
                            )}

                            {c.status !== "revoked" && certId && (
                              <IconButton
                                size="small"
                                onClick={() => handleRevoke(certId)}
                                disabled={revokingId === certId}
                                sx={{ color: "#f43f5e", bgcolor: "rgba(244, 63, 94, 0.05)", "&:hover": { bgcolor: "rgba(244, 63, 94, 0.2)" } }}
                              >
                                {revokingId === certId ? <CircularProgress size={16} color="inherit" /> : <BlockTwoToneIcon sx={{ fontSize: 18 }} />}
                              </IconButton>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </AnimatePresence>
              )}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ mt: 6 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{ "& .MuiPaginationItem-root": { color: "rgba(255,255,255,0.5)", fontWeight: 900 } }}
          />
        </Stack>
      )}

      {/* TOAST */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.type} variant="filled" sx={{ borderRadius: "12px", fontWeight: 800 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}

const headerStyle = {
  color: "rgba(255,255,255,0.3)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 1.5,
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  py: 3,
  px: 3
};

const cellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  py: 3,
  px: 3
};
