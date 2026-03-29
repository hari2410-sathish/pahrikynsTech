import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
    Stack,
    IconButton,
    Chip,
    CircularProgress
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

/* ICONS */
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";
import SensorsTwoToneIcon from "@mui/icons-material/SensorsTwoTone";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";

/* COMPONENTS */
import BarChart from "../adminmodules/components/chart/BarChart";

export default function Dashboard() {
    const navigate = useNavigate();
    const [summary, setSummary] = useState(null);
    const [revenueData, setRevenueData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            try {
                const [sumRes, revRes, txnRes] = await Promise.all([
                    axios.get("/admin/dashboard/summary"),
                    axios.get("/admin/dashboard/revenue"),
                    axios.get("/admin/dashboard/transactions?limit=5"),
                ]);

                setSummary(sumRes.data);
                // Transform revenue data for standard BarChart
                const formattedRev = revRes.data.map(item => ({
                    label: item.month.toUpperCase().slice(0, 3),
                    value: item.revenue
                }));
                setRevenueData(formattedRev);
                setTransactions(txnRes.data.data);
            } catch (err) {
                console.error("Dashboard init error", err);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    if (loading) return (
        <Box sx={{ p: 10, textAlign: "center" }}>
            <CircularProgress sx={{ color: "#00eaff" }} size={60} thickness={4} />
            <Typography variant="caption" sx={{ display: "block", mt: 3, fontWeight: 900, color: "#00eaff", letterSpacing: 4 }}>SYNCHRONIZING COMMAND CENTER...</Typography>
        </Box>
    );

    return (
        <Box sx={{ p: 4 }} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* ================= HEADER ================= */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10}>
                <Box>
                    <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: 4, mb: 1.5, display: "block" }}>
                        INTELLIGENCE SECTOR · COMMAND CENTER
                    </Typography>
                    <Typography variant="h3" fontWeight={900} sx={{ letterSpacing: "-0.04em", color: "white" }}>
                        Strategic Oversight
                    </Typography>
                </Box>
                <Chip icon={<BoltTwoToneIcon sx={{ color: "#22c55e !important" }} />} label="SYSTEM OPTIMAL" sx={statusChipStyle} />
            </Stack>

            {/* ================= STAT CARDS ================= */}
            <Grid container spacing={4} mb={8}>
                <Grid item xs={12} sm={4}>
                    <StatBox 
                        title="TOTAL REVENUE" 
                        value={`₹${summary?.revenue?.toLocaleString("en-IN") || 0}`} 
                        icon={<TrendingUpTwoToneIcon sx={{ color: "#00eaff" }} />} 
                        color="#00eaff"
                        delay={0.1}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatBox 
                        title="ACTIVE LEARNERS" 
                        value={summary?.totalStudents || 0} 
                        icon={<PeopleTwoToneIcon sx={{ color: "#a855f7" }} />} 
                        color="#a855f7"
                        delay={0.2}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StatBox 
                        title="CORE MODULES" 
                        value={summary?.totalCourses || 0} 
                        icon={<MenuBookTwoToneIcon sx={{ color: "#f59e0b" }} />} 
                        color="#f59e0b"
                        delay={0.3}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                {/* ================= REVENUE TREND ================= */}
                <Grid item xs={12} md={8}>
                    <Paper sx={chartPaperStyle} component={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={6}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={iconWrapperStyle("#00eaff")}>
                                    <TrendingUpTwoToneIcon sx={{ color: "#00eaff" }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" fontWeight={900} color="white">Fiscal Trajectory</Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.3, color: "white", fontWeight: 800, letterSpacing: 1 }}>MONTHLY REVENUE SIGNALS</Typography>
                                </Box>
                            </Stack>
                            <Button 
                                variant="outlined" 
                                size="small" 
                                component={Link} 
                                to="/admin/analytics" 
                                endIcon={<ArrowForwardTwoToneIcon />}
                                sx={outlineButtonStyle}
                            >
                                DEEP SCAN
                            </Button>
                        </Stack>
                        <BarChart data={revenueData} height={300} />
                    </Paper>
                </Grid>

                {/* ================= RECENT PAYMENTS ================= */}
                <Grid item xs={12} md={4}>
                    <Paper sx={listPaperStyle} component={motion.div} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                            <Typography variant="h6" fontWeight={900} color="white">Recent Intake</Typography>
                            <IconButton component={Link} to="/admin/payments" sx={{ color: "rgba(255,255,255,0.3)", "&:hover": { color: "#00eaff" } }}>
                                <ArrowForwardTwoToneIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                        <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2 }} />
                        
                        <List disablePadding>
                            {transactions.map((tx, idx) => (
                                <ListItem key={tx.id} disableGutters sx={{ py: 2, borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                                    <ListItemText 
                                        primary={tx.user?.name || "ANONYMOUS"}
                                        secondary={new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()}
                                        primaryTypographyProps={{ color: "white", fontWeight: 900, fontSize: 13, letterSpacing: "0.02em" }}
                                        secondaryTypographyProps={{ color: "rgba(255,255,255,0.3)", fontWeight: 800, fontSize: 10, letterSpacing: 1 }}
                                    />
                                    <Typography color="#22c55e" fontWeight={900} fontSize={14}>
                                        +₹{tx.amount.toLocaleString()}
                                    </Typography>
                                </ListItem>
                            ))}
                            {transactions.length === 0 && (
                                <Box sx={{ py: 10, textAlign: "center" }}>
                                    <Typography variant="caption" sx={{ fontWeight: 900, opacity: 0.2, color: "white", letterSpacing: 2 }}>ZERO RECENT SIGNALS</Typography>
                                </Box>
                            )}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            {/* ================= QUICK COMMANDS ================= */}
            <Box mt={8}>
                 <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 900, letterSpacing: 2, mb: 3, display: "block" }}>QUICK COMMAND INTERFACE</Typography>
                 <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <ActionCard title="INJECT MODULE" subtitle="Add New Course" icon={<AddCircleTwoToneIcon />} to="/admin/products/add" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ActionCard title="AUDIT LEARNERS" subtitle="Manage Students" icon={<PeopleTwoToneIcon />} to="/admin/Customers/AllCustomers" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ActionCard title="LEDGER OVERVIEW" subtitle="Financial Logs" icon={<ReceiptLongTwoToneIcon />} to="/admin/payments" />
                    </Grid>
                 </Grid>
            </Box>
        </Box>
    );
}

function StatBox({ title, value, icon, color, delay }) {
    return (
        <Paper sx={statCardStyle} component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
            <Box sx={iconWrapperStyle(color)}>{icon}</Box>
            <Box textAlign="right">
                <Typography variant="caption" sx={{ fontWeight: 900, color: "rgba(255,255,255,0.3)", letterSpacing: 1.5 }}>{title}</Typography>
                <Typography variant="h4" fontWeight={900} color="white" sx={{ letterSpacing: "-0.03em" }}>{value}</Typography>
            </Box>
        </Paper>
    );
}

function ActionCard({ title, subtitle, icon, to }) {
    return (
        <Paper 
            component={Link} 
            to={to} 
            sx={actionCardStyle}
        >
            <Box sx={{ color: "#00eaff" }}>{icon}</Box>
            <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, color: "rgba(255,255,255,0.3)", letterSpacing: 1, display: "block", mb: 0.5 }}>{title}</Typography>
                <Typography variant="body2" fontWeight={900} color="white">{subtitle}</Typography>
            </Box>
            <ArrowForwardTwoToneIcon sx={{ ml: "auto", fontSize: 16, opacity: 0.2, color: "white" }} />
        </Paper>
    );
}

/* ================= STYLES ================= */
const statusChipStyle = { 
    bgcolor: "rgba(34, 197, 94, 0.05)", 
    color: "#22c55e", 
    fontWeight: 900, 
    fontSize: 10,
    border: "1px solid rgba(34, 197, 94, 0.15)",
    letterSpacing: 1.5,
    borderRadius: "10px",
    px: 1,
    height: 32
};

const statCardStyle = {
    p: 4,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundImage: "none",
    boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
    transition: "transform 0.3s",
    "&:hover": { transform: "translateY(-5px)", borderColor: "rgba(255,255,255,0.12)" }
};

const chartPaperStyle = {
    p: 5,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "28px",
    backgroundImage: "none",
    boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
};

const listPaperStyle = {
    p: 5,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "28px",
    backgroundImage: "none",
    height: "100%",
    boxShadow: "0 40px 100px rgba(0,0,0,0.4)"
};

const actionCardStyle = {
    p: 3,
    display: "flex",
    alignItems: "center",
    gap: 3,
    textDecoration: "none",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    backgroundImage: "none",
    transition: "all 0.3s",
    "&:hover": { 
        bgcolor: "rgba(0, 234, 255, 0.03)", 
        borderColor: "rgba(0, 234, 255, 0.2)",
        transform: "translateX(10px)",
        "& .MuiSvgIcon-root": { opacity: 1 }
    }
};

const iconWrapperStyle = (color) => ({ 
    width: 60, 
    height: 60, 
    borderRadius: "18px", 
    bgcolor: `${color}08`, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    border: `1px solid ${color}15`,
    boxShadow: `0 10px 20px ${color}05`
});

const outlineButtonStyle = { 
    borderRadius: "12px", 
    borderColor: "rgba(255,255,255,0.1)", 
    color: "rgba(255,255,255,0.5)",
    px: 3,
    fontWeight: 900,
    fontSize: 10,
    letterSpacing: 2,
    "&:hover": { borderColor: "#00eaff", color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.05)" }
};
