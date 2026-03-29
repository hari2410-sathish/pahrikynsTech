import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  Stack,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  Button
} from "@mui/material";

import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import PaymentTwoToneIcon from "@mui/icons-material/PaymentTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import HistoryTwoToneIcon from "@mui/icons-material/HistoryTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import BuildTwoToneIcon from "@mui/icons-material/BuildTwoTone";
import ReceiptTwoToneIcon from "@mui/icons-material/ReceiptTwoTone";
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone";
import LocalActivityTwoToneIcon from "@mui/icons-material/LocalActivityTwoTone";

import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../Adminapi/users";
import { motion, AnimatePresence } from "framer-motion";

function TabPanel({ children, value, index }) {
  return (
    <AnimatePresence mode="wait">
      {value === index && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          sx={{ py: 4 }}
        >
          {children}
        </Box>
      )}
    </AnimatePresence>
  );
}

const formatCurrency = (amount = 0) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (id) {
      loadCustomerDetails();
    }
  }, [id]);

  async function loadCustomerDetails() {
    try {
      setLoading(true);
      const data = await getUserById(id);
      setCustomer(data.user);
    } catch (err) {
      console.error("Failed to load customer:", err);
      setError("Failed to load operative details");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress size={60} sx={{ color: "#00eaff" }} />
      </Box>
    );
  }

  if (error || !customer) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: "12px", mb: 3 }}>{error || "OPERATIVE NOT LOCATED"}</Alert>
        <Button startIcon={<ArrowBackTwoToneIcon />} onClick={() => navigate(-1)} sx={{ color: "#00eaff", fontWeight: 900 }}>
          RETURN TO DIRECTORY
        </Button>
      </Box>
    );
  }

  const initials = customer.name
    ? customer.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  return (
    <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* HEADER */}
      <Stack direction="row" alignItems="center" spacing={3} mb={6}>
        <IconButton onClick={() => navigate(-1)} sx={{ bgcolor: "rgba(255,255,255,0.03)", color: "white" }}>
          <ArrowBackTwoToneIcon />
        </IconButton>
        <Box>
            <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1, display: "block" }}>
                DIAGNOSTICS · OPERATIVE [{id.slice(0, 8).toUpperCase()}]
            </Typography>
            <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.03em", color: "white" }}>
              Operative Intelligence
            </Typography>
        </Box>
      </Stack>

      <Grid container spacing={4}>
        {/* LEFT: IDENTITY CORE */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 5, 
            borderRadius: 8, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none",
            boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
          }}>
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Avatar
                src={customer.avatar}
                sx={{ 
                    width: 100, 
                    height: 100, 
                    mx: "auto", 
                    mb: 3, 
                    bgcolor: "rgba(0, 234, 255, 0.05)", 
                    border: "2px solid rgba(0, 234, 255, 0.2)",
                    boxShadow: "0 0 30px rgba(0, 234, 255, 0.2)",
                    fontSize: 32, 
                    fontWeight: 900,
                    color: "#00eaff"
                }}
              >
                {initials}
              </Avatar>
              <Typography variant="h5" fontWeight={900} sx={{ color: "white", mb: 1 }}>{customer.name || "GUEST OPERATIVE"}</Typography>
              <Chip
                icon={<VerifiedUserTwoToneIcon sx={{ fontSize: "16px !important", color: "inherit !important" }} />}
                label={customer.isVerified ? "VERIFIED SIGNAL" : "UNVERIFED ASSET"}
                sx={{ 
                    bgcolor: customer.isVerified ? "rgba(34, 197, 94, 0.1)" : "rgba(245, 158, 11, 0.1)", 
                    color: customer.isVerified ? "#22c55e" : "#f59e0b",
                    fontWeight: 900,
                    fontSize: 10,
                    letterSpacing: 1,
                    border: customer.isVerified ? "1px solid rgba(34, 197, 94, 0.2)" : "1px solid rgba(245, 158, 11, 0.2)"
                }}
              />
            </Box>

            <Stack spacing={3}>
              <Box sx={{ p: 2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)" }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 800, mb: 0.5, display: "block" }}>COMMUNICATION SIGNAL</Typography>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <EmailTwoToneIcon sx={{ color: "#00eaff", fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "white" }}>{customer.email || "NO_EMAIL_ON_FILE"}</Typography>
                </Stack>
              </Box>

              <Box sx={{ p: 2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)" }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 800, mb: 0.5, display: "block" }}>REGISTRY TIMESTAMP</Typography>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <CalendarMonthTwoToneIcon sx={{ color: "#00eaff", fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "white" }}>{new Date(customer.createdAt).toLocaleString().toUpperCase()}</Typography>
                </Stack>
              </Box>

              <Box sx={{ p: 2, borderRadius: 3, bgcolor: "rgba(0, 234, 255, 0.02)", border: "1px solid rgba(0, 234, 255, 0.1)" }}>
                <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 800, mb: 0.5, display: "block", opacity: 0.6 }}>LIFETIME FISCAL CONTRIBUTION</Typography>
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <PaymentTwoToneIcon sx={{ color: "#00eaff", fontSize: 18 }} />
                    <Typography variant="body1" sx={{ fontWeight: 900, color: "white" }}>{formatCurrency(customer.totalSpent)}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* RIGHT: ASSET TERMINAL */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            borderRadius: 8, 
            minHeight: 600, 
            background: "rgba(255,255,255,0.02)", 
            border: "1px solid rgba(255,255,255,0.06)",
            backgroundImage: "none",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
          }}>
            <Box sx={{ borderBottom: "1px solid rgba(255,255,255,0.06)", bgcolor: "rgba(255,255,255,0.01)" }}>
              <Tabs 
                value={tab} 
                onChange={(_, v) => setTab(v)} 
                sx={{ 
                    px: 3,
                    "& .MuiTabs-indicator": { bgcolor: "#00eaff", height: 3, borderRadius: "3px 3px 0 0" },
                    "& .MuiTab-root": { color: "rgba(255,255,255,0.3)", fontWeight: 900, fontSize: 11, py: 3, transition: "0.3s" },
                    "& .Mui-selected": { color: "#00eaff !important" }
                }}
              >
                <Tab label="COMMERCE LOGS" icon={<ReceiptTwoToneIcon sx={{ fontSize: "18px !important" }} />} iconPosition="start" />
                <Tab label="ACADEMIC ASSETS" icon={<SchoolTwoToneIcon sx={{ fontSize: "18px !important" }} />} iconPosition="start" />
                <Tab label="NEURAL TOOLS" icon={<BuildTwoToneIcon sx={{ fontSize: "18px !important" }} />} iconPosition="start" />
                <Tab label="FISCAL HISTORY" icon={<HistoryTwoToneIcon sx={{ fontSize: "18px !important" }} />} iconPosition="start" />
              </Tabs>
            </Box>

            <Box sx={{ p: 4 }}>
              {/* ORDERS TAB */}
              <TabPanel value={tab} index={0}>
                {customer.orders?.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <LocalActivityTwoToneIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.05)", mb: 2 }} />
                    <Typography sx={{ opacity: 0.3, fontWeight: 800 }}>NO COMMERCE RECORDS LOCATED</Typography>
                  </Box>
                ) : (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={subHeaderStyle}>INVOICE</TableCell>
                        <TableCell sx={subHeaderStyle}>TIMESTAMP</TableCell>
                        <TableCell sx={subHeaderStyle}>ASSETS</TableCell>
                        <TableCell sx={subHeaderStyle}>GRAND TOTAL</TableCell>
                        <TableCell sx={subHeaderStyle}>STATE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customer.orders.map((order) => (
                        <TableRow key={order.id} sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.02)" } }}>
                          <TableCell sx={cellStyle}>{order.invoiceNumber || order.id.slice(0, 8).toUpperCase()}</TableCell>
                          <TableCell sx={cellStyle}>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell sx={cellStyle}>
                            {order.items?.map(it => it.product).join(", ") || "UNSPECIFIED"}
                          </TableCell>
                          <TableCell sx={{ ...cellStyle, fontWeight: 900, color: "#00eaff" }}>{formatCurrency(order.grandTotal || order.totalAmount)}</TableCell>
                          <TableCell sx={cellStyle}>
                            <Chip 
                                label={order.status} 
                                size="small" 
                                sx={{ 
                                    bgcolor: order.status === "COMPLETED" ? "rgba(34, 197, 94, 0.1)" : "rgba(255,255,255,0.05)", 
                                    color: order.status === "COMPLETED" ? "#22c55e" : "white",
                                    fontWeight: 900,
                                    fontSize: 9,
                                    letterSpacing: 0.5
                                }} 
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabPanel>

              {/* COURSES TAB */}
              <TabPanel value={tab} index={1}>
                {customer.courses?.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <SchoolTwoToneIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.05)", mb: 2 }} />
                    <Typography sx={{ opacity: 0.3, fontWeight: 800 }}>NO ACADEMIC ASSETS ENROLLED</Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {customer.courses.map((uc, i) => (
                      <Grid item xs={12} key={uc.id} component={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Paper sx={{ p: 3, background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 4, backgroundImage: "none" }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                              <Typography fontWeight={900} sx={{ color: "white", mb: 0.5 }}>{uc.course?.title || "UNSPECIFIED ASSET"}</Typography>
                              <Typography variant="caption" sx={{ opacity: 0.3, fontWeight: 800, color: "white" }}>ENROLLMENT: {new Date(uc.createdAt).toLocaleString().toUpperCase()}</Typography>
                            </Box>
                            <Chip 
                                label={uc.paid ? "LICENSE: PAID" : "LICENSE: OPEN"} 
                                size="small" 
                                sx={{ 
                                    bgcolor: uc.paid ? "rgba(0, 234, 255, 0.1)" : "rgba(255,255,255,0.05)", 
                                    color: uc.paid ? "#00eaff" : "white",
                                    fontWeight: 900,
                                    fontSize: 9
                                }} 
                            />
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </TabPanel>

              {/* TOOLS TAB */}
              <TabPanel value={tab} index={2}>
                {customer.toolSubscriptions?.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <BuildTwoToneIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.05)", mb: 2 }} />
                    <Typography sx={{ opacity: 0.3, fontWeight: 800 }}>NO NEURAL TOOLS AUTHORIZED</Typography>
                  </Box>
                ) : (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={subHeaderStyle}>TOOL IDENTIFIER</TableCell>
                        <TableCell sx={subHeaderStyle}>SECTOR</TableCell>
                        <TableCell sx={subHeaderStyle}>PROTOCOL</TableCell>
                        <TableCell sx={subHeaderStyle}>EXPIRATION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customer.toolSubscriptions.map((ts) => (
                        <TableRow key={ts.id}>
                          <TableCell sx={{ ...cellStyle, fontWeight: 900, color: "white" }}>{ts.tool}</TableCell>
                          <TableCell sx={cellStyle}>{ts.category}</TableCell>
                          <TableCell sx={cellStyle}>{ts.planType}</TableCell>
                          <TableCell sx={{ 
                              ...cellStyle, 
                              color: new Date(ts.validUntil) < new Date() ? "#f43f5e" : "white",
                              fontWeight: 700
                           }}>
                            {ts.validUntil ? new Date(ts.validUntil).toLocaleDateString() : "LIFETIME RECOGNITION"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabPanel>

              {/* PAYMENTS TAB */}
              <TabPanel value={tab} index={3}>
                {customer.payments?.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 8 }}>
                    <HistoryTwoToneIcon sx={{ fontSize: 48, color: "rgba(255,255,255,0.05)", mb: 2 }} />
                    <Typography sx={{ opacity: 0.3, fontWeight: 800 }}>NO FISCAL HISTORY DETECTED</Typography>
                  </Box>
                ) : (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={subHeaderStyle}>TIMESTAMP</TableCell>
                        <TableCell sx={subHeaderStyle}>AMOUNT</TableCell>
                        <TableCell sx={subHeaderStyle}>METHOD</TableCell>
                        <TableCell sx={subHeaderStyle}>SIGNAL STATE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customer.payments.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell sx={cellStyle}>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell sx={{ ...cellStyle, fontWeight: 900, color: "white" }}>{formatCurrency(p.amount)}</TableCell>
                          <TableCell sx={cellStyle}><Chip label={p.method || "N/A"} size="small" sx={{ fontWeight: 800, fontSize: 9, bgcolor: "rgba(255,255,255,0.05)", color: "white" }} /></TableCell>
                          <TableCell sx={cellStyle}>
                            <Chip 
                                label={p.status} 
                                size="small" 
                                sx={{ 
                                    bgcolor: (p.status === "COMPLETED" || p.status === "captured") ? "rgba(34, 197, 94, 0.1)" : "rgba(245, 158, 11, 0.1)", 
                                    color: (p.status === "COMPLETED" || p.status === "captured") ? "#22c55e" : "#f59e0b",
                                    fontWeight: 900,
                                    fontSize: 9,
                                    border: (p.status === "COMPLETED" || p.status === "captured") ? "1px solid rgba(34, 197, 94, 0.2)" : "1px solid rgba(245, 158, 11, 0.2)"
                                }} 
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabPanel>

            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

const subHeaderStyle = {
  color: "rgba(255,255,255,0.3)",
  fontWeight: 900,
  fontSize: 9,
  letterSpacing: 1.5,
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  py: 2,
  fontFamily: "monospace"
};

const cellStyle = {
  color: "rgba(255,255,255,0.6)",
  fontSize: 12,
  py: 2,
  borderBottom: "1px solid rgba(255,255,255,0.03)"
};
