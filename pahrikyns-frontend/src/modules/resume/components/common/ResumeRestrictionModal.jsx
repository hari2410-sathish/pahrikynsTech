import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PaymentIcon from "@mui/icons-material/Payment";
import { useNavigate } from "react-router-dom";

export default function ResumeRestrictionModal({ open, onClose }) {
    const navigate = useNavigate();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    bgcolor: "#0f172a",
                    color: "#fff",
                    border: "1px solid rgba(0, 234, 255, 0.2)",
                    borderRadius: 2,
                    minWidth: 400,
                },
            }}
        >
            <DialogTitle sx={{ textAlign: "center", color: "#00eaff", fontWeight: "bold" }}>
                Download Resume
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ color: "#cbd5e1", textAlign: "center", mb: 3 }}>
                    To download or share your resume, please choose an option below.
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* OPTION 1: LOGIN */}
                    <Button
                        variant="outlined"
                        startIcon={<LoginIcon />}
                        onClick={() => navigate("/login")}
                        sx={{
                            color: "#00eaff",
                            borderColor: "#00eaff",
                            py: 1.5,
                            "&:hover": {
                                borderColor: "#00eaff",
                                bgcolor: "rgba(0, 234, 255, 0.08)",
                            },
                        }}
                    >
                        Login to Download (Free)
                    </Button>

                    <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }}>OR</Divider>

                    {/* OPTION 2: PAY */}
                    <Button
                        variant="contained"
                        startIcon={<PaymentIcon />}
                        onClick={() => alert("Payment logic coming soon! For now, please login.")}
                        sx={{
                            bgcolor: "#22c55e",
                            color: "#fff",
                            py: 1.5,
                            "&:hover": { bgcolor: "#16a34a" },
                        }}
                    >
                        Pay ₹10 (One-time)
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
                <Button onClick={onClose} sx={{ color: "#94a3b8" }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
