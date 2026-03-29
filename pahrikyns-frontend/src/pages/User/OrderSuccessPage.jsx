import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Divider,
  Grid,
  CircularProgress,
  Fade,
} from "@mui/material";
import {
  CheckCircleOutline,
  Receipt,
  Download,
  School,
  ArrowForward,
} from "@mui/icons-material";
import axios from "../../api/axios";

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order details", err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!order) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h5" color="error">Order details not found.</Typography>
        <Button component={Link} to="/dashboard" variant="contained" sx={{ mt: 3 }}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Fade in={true} timeout={800}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          {/* ✅ SUCCESS ICON */}
          <CheckCircleOutline
            sx={{ fontSize: 80, color: "#10b981", mb: 2 }}
          />
          <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: "#fff" }}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 4 }}>
            Thank you for your purchase. Your invoice has been sent to <b>{order.customerEmail}</b>.
          </Typography>

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

          {/* ✅ ORDER DETAILS */}
          <Grid container spacing={4} sx={{ textAlign: "left", mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, textTransform: "uppercase" }}>
                  Order ID
                </Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#fff" }}>
                   #{order.invoiceNumber || order.id.slice(0, 8)}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, textTransform: "uppercase" }}>
                  Customer Name
                </Typography>
                <Typography variant="body1" fontWeight={500} sx={{ color: "#fff" }}>
                  {order.customer}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, textTransform: "uppercase" }}>
                  Date & Time
                </Typography>
                <Typography variant="body1" fontWeight={500} sx={{ color: "#fff" }}>
                  {new Date(order.createdAt).toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700, textTransform: "uppercase" }}>
                  Payment Method
                </Typography>
                <Typography variant="body1" fontWeight={500} sx={{ color: "#fff" }}>
                  {order.paymentMethod || "Razorpay"}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* ✅ ITEMS SUMMARY */}
          <Box
            sx={{
              background: "rgba(255,255,255,0.05)",
              p: 3,
              borderRadius: 3,
              mb: 4,
              textAlign: "left",
            }}
          >
             <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: "#fff", display: "flex", alignItems: "center", gap: 1 }}>
               <Receipt fontSize="small"/> Order Summary
             </Typography>
             {order.items?.map((item, idx) => (
               <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                 <Typography sx={{ color: "rgba(255,255,255,0.7)" }}>{item.product} (x{item.quantity})</Typography>
                 <Typography fontWeight={700} sx={{ color: "#fff" }}>₹{item.price}</Typography>
               </Box>
             ))}
             <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />
             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
               <Typography fontWeight={700} sx={{ color: "#fff" }}>Total Paid</Typography>
               <Typography variant="h5" fontWeight={900} color="primary.main">₹{order.totalAmount}</Typography>
             </Box>
          </Box>

          {/* ✅ ACTIONS */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              startIcon={<ArrowForward />}
              sx={{
                background: "linear-gradient(90deg, #00eaff, #7b3fe4)",
                fontWeight: 700,
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              startIcon={<School />}
              component={Link}
              to="/courses"
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "#fff",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                "&:hover": { borderColor: "primary.main" }
              }}
            >
              Browse More Courses
            </Button>
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
}
