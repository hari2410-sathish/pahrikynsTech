import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Stack,
  Avatar,
  AvatarGroup,
  useTheme,
  useMediaQuery
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from '@mui/icons-material/Google';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedIcon from '@mui/icons-material/Verified';

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  registerUser,
  verifyOTP,
  resendOTP,
  googleLogin,
} from "../../api/auth";

import { GoogleLogin } from "@react-oauth/google";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.1
    }));

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = "#00eaff";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
};

export default function Register() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  const navigate = useNavigate();
  const { login, user } = useAuth();

  // ✅ Already logged-in user redirect
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  // ================= EMAIL REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim().toLowerCase();
    const cleanPassword = form.password;

    if (!cleanName || !cleanEmail || !cleanPassword) {
      showToast("Please fill all fields");
      return;
    }

    if (cleanPassword.length < 6) {
      showToast("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser({
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
      });

      setForm((prev) => ({ ...prev, name: cleanName, email: cleanEmail }));

      if (res.data?.requiresOTP) {
        showToast("OTP sent to your email", "success");
        setStep(2);
      } else {
        login({
          token: res.data.token,
          user: res.data.user,
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      showToast(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= OTP VERIFY =================
  const handleVerifyOTP = async () => {
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      showToast("Enter valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOTP({
        email: form.email.trim().toLowerCase(),
        otp,
      });

      login({
        token: res.data.token,
        user: res.data.user,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      showToast(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP({ email: form.email.trim().toLowerCase() });
      showToast("OTP resent successfully!", "success");
    } catch {
      showToast("Failed to resend OTP");
    }
  };

  // ================= GOOGLE SIGNUP =================
  const handleGoogleSignup = async (credentialResponse) => {
    try {
      setGoogleLoading(true);

      const res = await googleLogin(
        credentialResponse.credential // ✅ ID TOKEN
      );

      login({
        token: res.data.token,
        user: res.data.user,
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      showToast("Google Signup Failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#060714",
        overflow: "hidden",
        p: 2,
      }}
    >
      <ParticleBackground />

      {/* Main Glass Container */}
      <Grid container sx={{
        maxWidth: 1100,
        minHeight: 650,
        position: "relative",
        zIndex: 10,
        bgcolor: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 5,
        overflow: "hidden",
        boxShadow: "0 25px 90px rgba(0,0,0,0.5)"
      }}>

        {/* LEFT: Branding & Testimonials */}
        {!isMobile && (
          <Grid item xs={12} md={5} sx={{
            position: "relative",
            background: "linear-gradient(135deg, rgba(0,234,255,0.1) 0%, rgba(123,63,228,0.1) 100%)",
            p: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid rgba(255,255,255,0.05)"
          }}>
            <Box>
              <Box sx={{ display: "inline-block", py: 0.5, px: 1.5, borderRadius: 99, bgcolor: "rgba(0,234,255,0.1)", color: "#00eaff", fontSize: 11, fontWeight: 800, mb: 3 }}>
                PAHRIKYNS • PRO
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
                Join the elite <br /> community.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Master DevOps, Cloud, and Engineering skills with real-world projects and mentorship.
              </Typography>
            </Box>

            {/* Testimonial Card */}
            <Box sx={{
              p: 3,
              bgcolor: "rgba(0,0,0,0.4)",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)"
            }}>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                {[1, 2, 3, 4, 5].map(i => <Typography key={i} sx={{ color: "#fbbf24" }}>★</Typography>)}
              </Stack>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)", fontStyle: "italic", mb: 2 }}>
                "Since joining Pahrikyns, I've transitioned from Support to a DevOps Engineer role. The hands-on labs are a game changer!"
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar src="/static/images/avatar/2.jpg" sx={{ width: 40, height: 40, border: "2px solid #00eaff" }} />
                <Box>
                  <Typography variant="caption" sx={{ color: "#fff", fontWeight: 700, display: "block" }}>Sarah J.</Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>DevOps Engineer @ TechCorp</Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        )}

        {/* RIGHT: Register Form */}
        <Grid item xs={12} md={7} sx={{ p: { xs: 3, md: 6 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>

          {step === 1 ? (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff" }}>Create Account</Typography>
                <Button component={Link} to="/login" sx={{ color: "rgba(255,255,255,0.5)", textTransform: "none" }}>Log in instead</Button>
              </Stack>

              {/* Google Button */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ opacity: googleLoading ? 0.7 : 1, pointerEvents: googleLoading ? "none" : "auto" }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSignup}
                    onError={() => showToast("Google Signup Failed")}
                    theme="filled_black"
                    shape="pill"
                    width="100%"
                  />
                </Box>
              </Box>

              <Divider sx={{ mb: 4, "&::before, &::after": { borderColor: "rgba(255,255,255,0.1)" } }}>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>OR CONTINUE WITH EMAIL</Typography>
              </Divider>

              <form onSubmit={handleRegister}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.03)",
                        borderRadius: 2,
                        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                        "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                        "&.Mui-focused fieldset": { borderColor: "#00eaff" },
                      },
                      "& input::placeholder": { color: "rgba(255,255,255,0.3)" }
                    }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.03)",
                        borderRadius: 2,
                        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                        "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                        "&.Mui-focused fieldset": { borderColor: "#00eaff" },
                      },
                      "& input::placeholder": { color: "rgba(255,255,255,0.3)" }
                    }}
                  />

                  <TextField
                    fullWidth
                    placeholder="Password (6+ chars)"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPass(!showPass)} sx={{ color: "rgba(255,255,255,0.4)" }}>
                            {showPass ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.03)",
                        borderRadius: 2,
                        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                        "&:hover fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                        "&.Mui-focused fieldset": { borderColor: "#00eaff" },
                      },
                      "& input::placeholder": { color: "rgba(255,255,255,0.3)" }
                    }}
                  />

                  <Button
                    fullWidth
                    type="submit"
                    disabled={loading}
                    endIcon={!loading && <ArrowForwardIcon />}
                    sx={{
                      py: 1.8,
                      borderRadius: 2,
                      background: "linear-gradient(90deg, #00eaff, #7b3fe4)",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "1rem",
                      textTransform: "none",
                      boxShadow: "0 8px 30px rgba(0,234,255,0.2)",
                      "&:hover": { boxShadow: "0 10px 40px rgba(0,234,255,0.3)" }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
                  </Button>
                </Stack>
              </form>

              <Typography sx={{ mt: 3, textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                By joining, you agree to our Terms & Privacy Policy.
              </Typography>
            </Box>
          ) : (
            // STEP 2: OTP
            <Box sx={{ textAlign: "center" }}>
              <VerifiedIcon sx={{ fontSize: 64, color: "#00eaff", mb: 2, opacity: 0.8 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 1 }}>Verify Email</Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
                We sent a 6-digit code to <br /> <strong style={{ color: "#fff" }}>{form.email}</strong>
              </Typography>

              <TextField
                fullWidth
                placeholder="000 000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                inputProps={{ style: { textAlign: "center", fontSize: 24, letterSpacing: 8, fontWeight: 700 } }}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    bgcolor: "rgba(255,255,255,0.03)",
                    borderRadius: 2,
                    py: 1,
                    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                    "&.Mui-focused fieldset": { borderColor: "#00eaff" },
                  }
                }}
              />

              <Button
                fullWidth
                onClick={handleVerifyOTP}
                disabled={loading}
                sx={{
                  py: 1.8,
                  borderRadius: 2,
                  background: "#fff",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "1rem",
                  mb: 2,
                  "&:hover": { bgcolor: "#f5f5f5" }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Continue"}
              </Button>

              <Button onClick={handleResend} sx={{ color: "rgba(255,255,255,0.5)", textTransform: "none" }}>
                Didn't receive code? Resend
              </Button>
            </Box>
          )}

        </Grid>
      </Grid>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.type} variant="filled" sx={{ borderRadius: 3 }}>{toast.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
