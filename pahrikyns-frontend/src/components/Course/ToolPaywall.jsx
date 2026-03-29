import React, { useState } from "react";
import { Box, Typography, Button, Paper, Grid, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import API from "../../api/axios";

// This expects Razorpay script to be loaded in index.html, or we can load it dynamically
function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const ToolPaywall = ({ category, tool, basePrice = 5, onAccessGranted }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loadingPlan, setLoadingPlan] = useState(null);

  // Derive prices based on backend logic structure
  const plans = [
    { type: "1-month", label: "1 Month", price: basePrice, multiplier: 1 },
    { type: "3-months", label: "3 Months", price: Math.round(basePrice * 3 * 0.9), multiplier: 3, discount: "10% Off!" },
    { type: "6-months", label: "6 Months", price: Math.round(basePrice * 6 * 0.8), multiplier: 6, discount: "20% Off!" },
    { type: "lifetime", label: "Lifetime", price: basePrice * 12, multiplier: 12, discount: "Best Value!" },
  ];

  const handleSubscribe = async (planType) => {
    setLoadingPlan(planType);
    try {
      const resLoaded = await loadRazorpayScript();
      if (!resLoaded) {
        enqueueSnackbar("Razorpay SDK failed to load. Are you online?", { variant: "error" });
        setLoadingPlan(null);
        return;
      }

      // 1. Create Order
      const { data: orderData } = await API.post("/payments/tool/create", {
        category,
        tool,
        planType
      });

      if (!orderData.success) throw new Error("Order creation failed");

      // 2. Init Razorpay
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Pahrikyns Tech",
        description: `Unlock ${category.toUpperCase()} - ${tool}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            // 3. Verify Payment
            const verifyRes = await API.post("/payments/tool/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature || "dummy_sig",
            });
            if (verifyRes.data.success) {
              enqueueSnackbar("Payment Successful! Access Granted.", { variant: "success" });
              onAccessGranted(); // refresh parent
            }
          } catch (err) {
            console.error("Verification failed", err);
            enqueueSnackbar("Payment verification failed", { variant: "error" });
          }
        },
        theme: { color: "#00eaff" },
      };

      // QA BYPASS FOR DUMMY KEYS
      if (!orderData.key || orderData.key === "dummy_key_id") {
        enqueueSnackbar("QA Build: Bypassing Razorpay overlay for test key.", { variant: "info" });
        setTimeout(() => {
          options.handler({
            razorpay_payment_id: "pay_dummy_fake_qa",
            razorpay_order_id: orderData.orderId,
            razorpay_signature: "mock_signature_qa",
          });
        }, 800);
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        enqueueSnackbar(response.error.description || "Payment Failed", { variant: "error" });
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error initiating checkout", { variant: "error" });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: "auto", textAlign: "center", color: "white" }}>
      <Typography variant="h3" sx={{ color: "#00eaff", mb: 2, fontWeight: 700 }}>
        Unlock {tool.toUpperCase()}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1, opacity: 0.8 }}>
        You need an active subscription to view these lessons. Choose a plan below:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
         <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: 1 }}>
            SECURED BY RAZORPAY
         </Typography>
         <Typography variant="caption" sx={{ color: "#00eaff", fontWeight: 700, letterSpacing: 1 }}>
            • SUPPORTS GPAY, PHONEPE, PAYTM
         </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={3} key={plan.type}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                background: plan.type === "lifetime" ? "linear-gradient(135deg, #0d3b4b, #001f29)" : "#001f29",
                border: plan.type === "lifetime" ? "2px solid #00eaff" : "1px solid #0a3d4d",
                borderRadius: 3,
                textAlign: "center",
                position: "relative",
                transition: "0.3s ease",
                "&:hover": { transform: "translateY(-5px)", boxShadow: "0px 10px 20px rgba(0, 234, 255, 0.2)" }
              }}
            >
              {plan.discount && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    right: -10,
                    background: "#00eaff",
                    color: "#001f29",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: "0.75rem",
                    fontWeight: "bold"
                  }}
                >
                  {plan.discount}
                </Box>
              )}
              <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                {plan.label}
              </Typography>
              <Typography variant="h4" sx={{ color: "#00eaff", fontWeight: 800, mb: 2 }}>
                ₹{plan.price}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                disabled={loadingPlan !== null}
                onClick={() => handleSubscribe(plan.type)}
                sx={{
                  background: "#00eaff",
                  color: "#001f29",
                  fontWeight: "bold",
                  "&:hover": { background: "#00b8cc" }
                }}
              >
                {loadingPlan === plan.type ? <CircularProgress size={24} color="inherit" /> : "Subscribe"}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ToolPaywall;
