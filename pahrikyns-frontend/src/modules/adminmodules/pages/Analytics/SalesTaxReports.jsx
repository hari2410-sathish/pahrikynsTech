import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableHead, TableRow, Button, CircularProgress, 
  Stack, IconButton, Chip, Grid
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";

import { getAdminTransactions } from "../../Adminapi/admin";

export default function SalesTaxReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);
      const res = await getAdminTransactions({ limit: 50 });
      // Filter for successful transactions to simulate tax reports
      const completed = res.data.filter(t => t.status === "COMPLETED");
      setReports(completed);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = reports.reduce((acc, r) => acc + (r.amount || 0), 0);
  const estimatedTax = totalRevenue * 0.18; // 18% GST Simulation

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
       {/* ================= HEADER ================= */}
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10} flexWrap="wrap" gap={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
           <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
              <ArrowBackTwoToneIcon />
           </IconButton>
           <Box>
              <Typography sx={{ color: "#00eaff", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
                INTELLIGENCE SECTOR · FISCAL LEDGER
              </Typography>
              <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                Tax Compliance
              </Typography>
           </Box>
        </Stack>
        
        <Box sx={liabilitiesBoxStyle}>
           <Typography variant="caption" sx={{ fontWeight: 900, color: "#f59e0b", display: "block", mb: 0.5, letterSpacing: 1.5 }}>TOTAL LIABILITIES (EST.)</Typography>
           <Typography variant="h5" fontWeight={900} color="white">₹{estimatedTax.toLocaleString()}</Typography>
        </Box>
      </Stack>

      {/* ================= DATA TABLE ================= */}
      <Paper sx={tablePaperStyle}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" p={4} borderBottom="1px solid rgba(255,255,255,0.06)">
           <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={iconWrapperStyle("#00eaff")}>
                 <AccountBalanceWalletTwoToneIcon sx={{ color: "#00eaff", fontSize: 20 }} />
              </Box>
              <Typography variant="h6" fontWeight={900} color="white">Revenue Journal</Typography>
           </Stack>
           <Button 
            variant="contained" 
            startIcon={<FileDownloadTwoToneIcon />}
            sx={exportButtonStyle}
           >
            EXPORT LEDGER
           </Button>
        </Stack>

        <Table>
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.01)" }}>
            <TableRow>
              <TableCell sx={headerStyle}>TRANSACTION ID</TableCell>
              <TableCell sx={headerStyle}>FISCAL DATE</TableCell>
              <TableCell sx={headerStyle}>GROSS YIELD</TableCell>
              <TableCell sx={headerStyle}>TAX COMPONENT (18%)</TableCell>
              <TableCell sx={headerStyle} align="right">COMPLIANCE STATUS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 15 }}>
                  <CircularProgress size={40} thickness={4} sx={{ color: "#00eaff" }} />
                  <Typography variant="caption" sx={{ display: "block", mt: 2, color: "#00eaff", fontWeight: 900, letterSpacing: 2 }}>VALUATING LEDGER...</Typography>
                </TableCell>
              </TableRow>
            ) : reports.length === 0 ? (
               <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 20 }}>
                   <ReceiptLongTwoToneIcon sx={{ fontSize: 60, opacity: 0.1, color: "white", mb: 3 }} />
                   <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.3, color: "white", letterSpacing: 3 }}>ZERO FISCAL FOOTPRINT DETECTED</Typography>
                </TableCell>
               </TableRow>
            ) : (
              <AnimatePresence>
                {reports.map((report, idx) => (
                  <TableRow
                    key={report.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    hover
                    sx={rowStyle}
                  >
                    <TableCell sx={cellStyle}>
                      <Typography variant="body2" sx={{ fontWeight: 900, color: "white", letterSpacing: "0.05em", fontSize: 13 }}>#{report.id.slice(-8).toUpperCase()}</Typography>
                    </TableCell>

                    <TableCell sx={cellStyle}>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 800, letterSpacing: 1 }}>{new Date(report.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}</Typography>
                    </TableCell>

                    <TableCell sx={cellStyle}>
                      <Typography variant="body2" sx={{ fontWeight: 900, color: "white" }}>₹{report.amount.toLocaleString()}</Typography>
                    </TableCell>

                    <TableCell sx={cellStyle}>
                      <Typography variant="body2" sx={{ fontWeight: 900, color: "#f59e0b" }}>₹{(report.amount * 0.18).toLocaleString()}</Typography>
                    </TableCell>

                    <TableCell sx={cellStyle} align="right">
                      <Chip 
                        label="VERIFIED" 
                        size="small" 
                        sx={statusChipStyle}
                      />
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

const liabilitiesBoxStyle = { 
    p: 3, 
    borderRadius: "20px", 
    bgcolor: "rgba(245, 158, 11, 0.05)", 
    border: "1px solid rgba(245, 158, 11, 0.15)",
    boxShadow: "0 15px 40px rgba(245, 158, 11, 0.05)",
    textAlign: "right"
};

const tablePaperStyle = { 
    borderRadius: "28px", 
    overflow: "hidden", 
    background: "rgba(255,255,255,0.02)", 
    border: "1px solid rgba(255,255,255,0.06)",
    backgroundImage: "none",
    boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
};

const headerStyle = {
  color: "rgba(255,255,255,0.3)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 2,
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  py: 3.5,
  textTransform: "uppercase"
};

const cellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  py: 3,
  color: "white"
};

const rowStyle = { 
    "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" },
    transition: "background 0.3s"
};

const iconWrapperStyle = (color) => ({ 
    width: 44, 
    height: 44, 
    borderRadius: "14px", 
    bgcolor: `${color}08`, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    border: `1px solid ${color}15`
});

const statusChipStyle = { 
    bgcolor: "rgba(34, 197, 94, 0.05)", 
    color: "#22c55e", 
    fontWeight: 900, 
    fontSize: 9,
    border: "1px solid rgba(34, 197, 94, 0.15)",
    letterSpacing: 1.5,
    borderRadius: "8px",
    height: 24
};

const exportButtonStyle = { 
    bgcolor: "#00eaff", 
    color: "#0f172a", 
    fontWeight: 900,
    fontSize: 11,
    borderRadius: "14px",
    px: 3,
    py: 1.2,
    "&:hover": { bgcolor: "#00eaff", transform: "translateY(-2px)", boxShadow: "0 10px 30px rgba(0,234,255,0.3)" },
    transition: "all 0.3s"
};
