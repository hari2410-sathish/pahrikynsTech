import React, { useState } from "react";
import { Box, Button, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createPayment, verifyPayment } from "../../api/payment";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const PLANS = [
        {
            id: "pro_monthly",
            title: "Pro Monthly",
            price: 499,
            period: "/ month",
            features: [
                "Access to all Premium Courses",
                "Project-based Learning",
                "Source Code Access",
                "Certificate of Completion",
                "Priority Support",
            ],
            recommended: false,
        },
        {
            id: "pro_yearly",
            title: "Pro Yearly",
            price: 4999,
            period: "/ year",
            features: [
                "Everything in Monthly",
                "Save 17%",
                "Offline Access",
                "Exclusive Webinars",
                "1-on-1 Mentorship Session",
            ],
            recommended: true,
        },
    ];

    const handleSubscribe = async (plan) => {
        if (!user) {
            navigate("/login?redirect=/pricing");
            return;
        }

        setLoading(true);
        try {
            // 1. Create Order
            const res = await createPayment(plan.price, "subscription-" + plan.id);
            if (!res.ok) {
                alert("Failed to create order: " + res.error);
                setLoading(false);
                return;
            }

            const { order } = res.data;

            // 2. Open Razorpay
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this env var exists
                amount: order.amount,
                currency: order.currency,
                name: "Pahrikyns",
                description: `Subscription - ${plan.title}`,
                order_id: order.id,
                handler: async function (response) {
                    // 3. Verify Payment
                    const verifyRes = await verifyPayment(response);
                    if (verifyRes.ok) {
                        alert("Subscription Successful! Welcome to Pro.");
                        navigate("/dashboard");
                    } else {
                        alert("Payment Verification Failed: " + verifyRes.error);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone || "",
                },
                theme: {
                    color: "#00eaff",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #021018 0%, #041225 100%)",
                color: "white",
                py: 8,
                px: 2,
                textAlign: "center",
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 800,
                    background: "linear-gradient(90deg, #00eaff, #0072ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                }}
            >
                Upgrade to Pro
            </Typography>
            <Typography sx={{ color: "#b0c4de", fontSize: "1.2rem", mb: 8, maxWidth: 600, mx: "auto" }}>
                Unlock unlimited access to all advanced DevOps courses, projects, and certifications.
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {PLANS.map((plan) => (
                    <Grid item xs={12} md={4} key={plan.id}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                background: plan.recommended
                                    ? "linear-gradient(145deg, rgba(0, 234, 255, 0.1), rgba(0, 114, 255, 0.05))"
                                    : "rgba(255, 255, 255, 0.03)",
                                backdropFilter: "blur(12px)",
                                border: plan.recommended
                                    ? "2px solid #00eaff"
                                    : "1px solid rgba(255, 255, 255, 0.1)",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                transition: "transform 0.3s",
                                "&:hover": { transform: "translateY(-10px)" },
                            }}
                        >
                            {plan.recommended && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        background: "#00eaff",
                                        color: "#000",
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: 20,
                                        fontWeight: 800,
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    RECOMMENDED
                                </Box>
                            )}

                            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                                {plan.title}
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline", mb: 4 }}>
                                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                                    ₹{plan.price}
                                </Typography>
                                <Typography sx={{ color: "#aaa", ml: 1 }}>{plan.period}</Typography>
                            </Box>

                            <Box sx={{ flex: 1, textAlign: "left", mb: 4 }}>
                                {plan.features.map((feat, i) => (
                                    <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <CheckCircleIcon sx={{ color: "#00eaff", mr: 2, fontSize: 20 }} />
                                        <Typography sx={{ color: "#e0e0e0" }}>{feat}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Button
                                variant="contained"
                                onClick={() => handleSubscribe(plan)}
                                disabled={loading}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    background: plan.recommended
                                        ? "linear-gradient(90deg, #00eaff, #0072ff)"
                                        : "rgba(255, 255, 255, 0.1)",
                                    color: plan.recommended ? "#fff" : "#00eaff",
                                    "&:hover": {
                                        background: plan.recommended
                                            ? "linear-gradient(90deg, #0072ff, #00eaff)"
                                            : "rgba(255, 255, 255, 0.2)",
                                    },
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Subscribe Now"}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
