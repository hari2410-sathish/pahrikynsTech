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
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Stack,
  TextField,
  InputAdornment,
  Avatar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchAdminCourses, toggleAdminCourseStatus } from "../../Adminapi/coursesAdmin";
import { motion, AnimatePresence } from "framer-motion";

/* ICONS */
import RefreshIcon from "@mui/icons-material/Refresh";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import BookTwoToneIcon from "@mui/icons-material/BookTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";
import SensorsTwoToneIcon from "@mui/icons-material/SensorsTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";

const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function AllProducts() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      const data = await fetchAdminCourses();
      setCourses(data.courses || data || []);
    } catch (err) {
      console.error(err);
      setError("STRATEGIC DATA UNREACHABLE: CHECK UPLINK STATUS");
    } finally {
      setLoading(false);
    }
  }

  const handleToggleStatus = async (id) => {
    try {
      await toggleAdminCourseStatus(id);
      loadCourses();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredCourses = courses.filter(c => 
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER SECTION */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 8, alignItems: "center" }}>
        <Box>
           <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
             CURRICULUM SECTOR · GLOBAL CATALOG
           </Typography>
           <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
             Knowledge Assets
           </Typography>
        </Box>
        <Stack direction="row" spacing={3} alignItems="center">
           <TextField
            placeholder="FILTER BY MODULE OR SECTOR..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00eaff", fontSize: 20, opacity: 0.6 }} />
                </InputAdornment>
              ),
            }}
            sx={searchStyle}
          />
          <Button 
            variant="contained" 
            onClick={() => navigate("/admin/products/add")}
            startIcon={<BoltTwoToneIcon />}
            sx={{ 
                borderRadius: "12px", 
                py: 1.5, 
                px: 3, 
                fontWeight: 900, 
                bgcolor: "#00eaff", 
                color: "black",
                "&:hover": { bgcolor: "#00c4d6" },
                boxShadow: "0 10px 20px rgba(0, 234, 255, 0.2)",
                letterSpacing: 1
            }}
          >
            INITIALIZE MODULE
          </Button>
          <IconButton onClick={loadCourses} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 3 }}>
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Box>

      {error && <Alert severity="error" variant="filled" sx={{ mb: 4, borderRadius: 3, fontWeight: 900 }}>{error}</Alert>}

      <Paper sx={{ 
        borderRadius: 6, 
        overflow: "hidden", 
        background: "rgba(255,255,255,0.02)", 
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "none",
        boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
      }}>
        <Table>
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
            <TableRow>
              <TableCell sx={headerStyle}>MODULE IDENTITY</TableCell>
              <TableCell sx={headerStyle}>SECTOR</TableCell>
              <TableCell sx={headerStyle}>FISCAL VALUE</TableCell>
              <TableCell sx={headerStyle}>LEARNER DENSITY</TableCell>
              <TableCell sx={headerStyle}>INTENSITY</TableCell>
              <TableCell sx={headerStyle}>MANIFEST</TableCell>
              <TableCell sx={headerStyle} align="right">DIAGNOSTICS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 15 }}>
                  <CircularProgress size={40} sx={{ color: "#00eaff" }} />
                </TableCell>
              </TableRow>
            ) : filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 15, opacity: 0.5, color: "white" }}>
                   <BookTwoToneIcon sx={{ fontSize: 48, opacity: 0.1, mb: 2 }} />
                   <Typography variant="body2" sx={{ fontWeight: 900, letterSpacing: 2 }}>VAULT EMPTY: NO ASSETS DETECTED</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((p, idx) => (
                  <TableRow 
                    key={p.id} 
                    hover 
                    component={motion.tr}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" }, cursor: "pointer" }}
                  >
                    <TableCell sx={cellStyle}>
                       <Stack direction="row" spacing={2.5} alignItems="center">
                          <Avatar sx={{ width: 40, height: 40, bgcolor: "rgba(0, 234, 255, 0.05)", border: "1px solid rgba(0, 234, 255, 0.2)", color: "#00eaff" }}>
                             <SchoolTwoToneIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 900, color: "white" }}>{p.title}</Typography>
                            <Typography variant="caption" sx={{ color: "#00eaff", opacity: 0.6, fontWeight: 800, letterSpacing: 1 }}>{p.id.slice(0, 8).toUpperCase()}</Typography>
                          </Box>
                       </Stack>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                       <Chip label={p.category?.toUpperCase()} size="small" variant="outlined" sx={{ fontWeight: 900, fontSize: 9, borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", letterSpacing: 1 }} />
                    </TableCell>
                    <TableCell sx={cellStyle}>
                       <Typography variant="body2" sx={{ fontWeight: 900, color: "white" }}>{formatCurrency(p.price)}</Typography>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                       <Stack direction="row" spacing={1} alignItems="center">
                          <PeopleAltTwoToneIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.2)" }} />
                          <Typography variant="body2" sx={{ color: "white", fontWeight: 700 }}>{p.students || 0}</Typography>
                       </Stack>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                           <StarTwoToneIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
                           <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 800 }}>{p.level || "BEGINNER"}</Typography>
                        </Stack>
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      <Chip
                        label={p.status?.toUpperCase()}
                        size="small"
                        onClick={() => handleToggleStatus(p.id)}
                        sx={{ 
                            cursor: "pointer", 
                            height: 22, 
                            fontSize: 9, 
                            fontWeight: 900,
                            bgcolor: (p.status === "Published" || p.status === "Visible") ? "rgba(34, 197, 94, 0.05)" : "rgba(255,255,255,0.03)",
                            color: (p.status === "Published" || p.status === "Visible") ? "#22c55e" : "rgba(255,255,255,0.3)",
                            border: `1px solid ${(p.status === "Published" || p.status === "Visible") ? "rgba(34, 197, 94, 0.2)" : "rgba(255,255,255,0.06)"}`,
                            letterSpacing: 1
                        }}
                      />
                    </TableCell>
                    <TableCell sx={cellStyle} align="right">
                      <IconButton size="small" onClick={() => navigate(`/admin/products/edit/${p.id}`)} sx={{ color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.05)", border: "1px solid rgba(0, 234, 255, 0.1)" }}>
                        <EditTwoToneIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

const headerStyle = {
  color: "rgba(255,255,255,0.3)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 2,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  py: 3,
  px: 4
};

const cellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  py: 3,
  px: 4
};

const searchStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    color: "white",
    width: 350,
    bgcolor: "rgba(255,255,255,0.03)",
    fontSize: 12,
    fontWeight: 800,
    transition: "all 0.3s",
    "& fieldset": { borderColor: "rgba(255,255,255,0.08)" },
    "&.Mui-focused": { bgcolor: "rgba(0, 234, 255, 0.05)", boxShadow: "0 0 20px rgba(0, 234, 255, 0.1)" },
    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" }
  },
  "& .MuiInputBase-input::placeholder": { color: "rgba(255,255,255,0.2)", opacity: 1, fontWeight: 800, letterSpacing: 1 }
};
