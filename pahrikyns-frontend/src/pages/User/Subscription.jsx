// src/pages/User/Subscription.jsx
import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Button, Divider, List, ListItem, ListItemText, Chip } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

export default function Subscription() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      title: "Basic",
      price: "₹0",
      features: ["Access to Free Courses", "Community Forum", "Basic Support"],
      current: true,
    },
    {
      id: 2,
      title: "Pro Plus",
      price: "₹499/mo",
      features: ["All Standard Features", "Exclusive Advanced Projects", "Priority Support", "Mentorship Sessions", "Certificate with QR Verification"],
      current: false,
    },
    {
      id: 3,
      title: "Ultimate Elite",
      price: "₹1,499/mo",
      features: ["Everything in Pro", "1-on-1 Personalized Coaching", "Internship Opportunities", "Resume Builder Pro", "Early Access to New Tech"],
      current: false,
    },
  ]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 800,
          mb: 4,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Subscription & Billing
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <motion.div whileHover={{ y: -10 }}>
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  background: plan.current ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  border: plan.current ? "2px solid #00eaff" : "1px solid rgba(255,255,255,0.06)",
                  boxShadow: plan.current ? "0 0 40px rgba(0,234,255,0.1)" : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {plan.current && (
                  <Chip
                    label="Current Plan"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "#00eaff",
                      color: "#000",
                      fontWeight: 700,
                    }}
                  />
                )}
                <Typography variant="h5" fontWeight={800} sx={{ mb: 1, color: "#fff" }}>
                  {plan.title}
                </Typography>
                <Typography variant="h4" fontWeight={900} sx={{ mb: 3, color: plan.current ? "#00eaff" : "#fff" }}>
                  {plan.price}
                </Typography>
                <Divider sx={{ opacity: 0.1, mb: 3 }} />
                <Box sx={{ flex: 1, mb: 4 }}>
                  {plan.features.map((f, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.5, alignItems: "flex-start" }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: "#00eaff", mt: 0.3 }} />
                      <Typography fontSize={14} sx={{ opacity: 0.7 }}>{f}</Typography>
                    </Box>
                  ))}
                </Box>
                <Button
                  variant={plan.current ? "outlined" : "contained"}
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    fontWeight: 800,
                    bgcolor: plan.current ? "transparent" : "rgba(0,234,255,0.1)",
                    border: plan.current ? "1px solid rgba(0,234,255,0.3)" : "none",
                    color: plan.current ? "#00eaff" : "#fff",
                  }}
                >
                  {plan.current ? "Manage Billing" : "Upgrade Plan"}
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: "#fff" }}>
        Recent Transactions
      </Typography>
      <Paper sx={{ p: 4, borderRadius: 4, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <List>
          {[1, 2].map((tx) => (
            <React.Fragment key={tx}>
              <ListItem sx={{ px: 0, py: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(255,255,255,0.03)", mr: 2 }}>
                  <CreditCardIcon sx={{ color: "rgba(0,234,255,0.6)" }} />
                </Box>
                <ListItemText
                  primary={<Typography fontWeight={700}>Standard Monthly Subscription</Typography>}
                  secondary={<Typography fontSize={12} sx={{ opacity: 0.5 }}>24 March 2026 • 11:20 AM</Typography>}
                />
                <Box sx={{ textAlign: "right" }}>
                  <Typography fontWeight={700} color="#fff">₹0.00</Typography>
                  <Typography fontSize={11} sx={{ color: "#22c55e" }}>Successful</Typography>
                </Box>
              </ListItem>
              {tx === 1 && <Divider sx={{ opacity: 0.05 }} />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
