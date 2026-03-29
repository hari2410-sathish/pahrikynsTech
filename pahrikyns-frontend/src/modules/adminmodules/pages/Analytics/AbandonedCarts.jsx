import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableHead, TableRow, Chip, Button, CircularProgress, 
  Stack, Avatar, Tooltip, IconButton
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ICONS */
import ShoppingCartCheckoutTwoToneIcon from "@mui/icons-material/ShoppingCartCheckoutTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import RemoveShoppingCartTwoToneIcon from "@mui/icons-material/RemoveShoppingCartTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

import { getAdminTransactions } from "../../Adminapi/admin";

export default function AbandonedCarts() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCarts();
  }, []);

  async function loadCarts() {
    try {
      setLoading(true);
      const res = await getAdminTransactions({ limit: 50 });
      const pending = res.data.filter(p => p.status === "PENDING" || p.status === "ABANDONED");
      setCarts(pending);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* ================= HEADER ================= */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10} flexWrap="wrap" gap={3}>
        <Stack direction="row" alignItems="center" spacing={3}>
           <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
              <ArrowBackTwoToneIcon />
           </IconButton>
           <Box>
              <Typography sx={{ color: "#f43f5e", fontWeight: 900, textTransform: "uppercase", fontSize: 12, letterSpacing: 4, mb: 1.5 }}>
                INTELLIGENCE SECTOR · REVENUE VAULT
              </Typography>
              <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                Abandoned Flux
              </Typography>
           </Box>
        </Stack>
        
        <Box sx={recoveryPotBoxStyle}>
           <Typography variant="caption" sx={{ fontWeight: 900, color: "#f43f5e", display: "block", mb: 0.5, letterSpacing: 1.5 }}>RECOVERY POTENTIAL</Typography>
           <Typography variant="h5" fontWeight={900} color="white">₹{carts.reduce((acc, c) => acc + (c.amount || 0), 0).toLocaleString()}</Typography>
        </Box>
      </Stack>

      {/* ================= DATA TABLE ================= */}
      <Paper sx={tablePaperStyle}>
        <Table>
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.01)" }}>
            <TableRow>
              <TableCell sx={headerStyle}>POTENTIAL LEARNER</TableCell>
              <TableCell sx={headerStyle}>RECOVERY VALUE</TableCell>
              <TableCell sx={headerStyle}>SESSION AGE</TableCell>
              <TableCell sx={headerStyle}>STATUS</TableCell>
              <TableCell sx={headerStyle} align="right">RECLAMATION ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 15 }}>
                  <CircularProgress size={40} thickness={4} sx={{ color: "#f43f5e" }} />
                  <Typography variant="caption" sx={{ display: "block", mt: 2, color: "#f43f5e", fontWeight: 900, letterSpacing: 2 }}>SCANNING VAULT...</Typography>
                </TableCell>
              </TableRow>
            ) : carts.length === 0 ? (
               <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 20 }}>
                   <RemoveShoppingCartTwoToneIcon sx={{ fontSize: 60, opacity: 0.1, color: "white", mb: 3 }} />
                   <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.3, color: "white", letterSpacing: 3 }}>VAULT SECURE: NO ABANDONED SESSIONS DETECTED</Typography>
                </TableCell>
               </TableRow>
            ) : (
              <AnimatePresence>
                {carts.map((cart, idx) => (
                  <TableRow
                    key={cart.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    hover
                    sx={rowStyle}
                  >
                    <TableCell sx={cellStyle}>
                      <Stack direction="row" spacing={2.5} alignItems="center">
                        <Avatar sx={avatarStyle}>
                           <PersonTwoToneIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 900, color: "white", letterSpacing: "0.01em" }}>{cart.user?.name || "Anonymous Voyager"}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 700, letterSpacing: 0.5 }}>{cart.user?.email || "NO CONTACT SIGNAL"}</Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    <TableCell sx={cellStyle}>
                      <Typography variant="body2" sx={{ fontWeight: 900, color: "white", fontSize: 14 }}>₹{cart.amount.toLocaleString()}</Typography>
                    </TableCell>

                    <TableCell sx={cellStyle}>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 900, letterSpacing: 1 }}>{new Date(cart.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}</Typography>
                    </TableCell>

                    <TableCell sx={cellStyle}>
                      <Chip 
                        label="STALLED" 
                        size="small" 
                        sx={statusChipStyle} 
                      />
                    </TableCell>

                    <TableCell sx={cellStyle} align="right">
                       <Button 
                        variant="contained" 
                        size="small"
                        startIcon={<EmailTwoToneIcon sx={{ fontSize: "14px !important" }} />}
                        sx={recoveryButtonStyle}
                      >
                        RECOVERY SIGNAL
                      </Button>
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

const recoveryPotBoxStyle = { 
    p: 3, 
    borderRadius: "20px", 
    bgcolor: "rgba(244, 63, 94, 0.05)", 
    border: "1px solid rgba(244, 63, 94, 0.15)",
    boxShadow: "0 15px 40px rgba(244, 63, 94, 0.05)",
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

const avatarStyle = { 
    bgcolor: "rgba(244, 63, 94, 0.05)", 
    border: "1px solid rgba(244, 63, 94, 0.2)", 
    color: "#f43f5e",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
};

const statusChipStyle = { 
    bgcolor: "rgba(244, 63, 94, 0.05)", 
    color: "#f43f5e", 
    fontWeight: 900, 
    fontSize: 9,
    border: "1px solid rgba(244, 63, 94, 0.15)",
    letterSpacing: 1.5,
    borderRadius: "8px",
    height: 24
};

const recoveryButtonStyle = { 
    bgcolor: "rgba(168, 85, 247, 0.05)", 
    color: "#a855f7", 
    fontWeight: 900,
    fontSize: 10,
    borderRadius: "12px",
    border: "1px solid rgba(168, 85, 247, 0.2)",
    boxShadow: "none",
    px: 2.5,
    py: 1,
    "&:hover": { bgcolor: "rgba(168, 85, 247, 0.15)", borderColor: "#a855f7", boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)" },
    transition: "all 0.3s"
};
