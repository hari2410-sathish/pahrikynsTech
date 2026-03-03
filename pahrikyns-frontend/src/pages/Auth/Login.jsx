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
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import AdbIcon from "@mui/icons-material/Adb"; // GitLab placeholder
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockPersonIcon from '@mui/icons-material/LockPerson';

import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { loginUser, googleLogin } from "../../api/auth";
import { getDeviceInfo } from "../../utils/deviceHelper";

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

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    msg: "",
    type: "error",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || (isAdmin ? "/admin/dashboard" : "/");

  const showToast = (msg, type = "error") =>
    setToast({ open: true, msg, type });

  // ================= NORMAL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = form.email.trim().toLowerCase();
    const cleanPassword = form.password;

    if (!cleanEmail || !cleanPassword) {
      showToast("Please enter email & password");
      return;
    }

    setLoading(true);
    try {
      const device = getDeviceInfo();

      const res = await loginUser({
        email: cleanEmail,
        password: cleanPassword,
        device,
        role: isAdmin ? "admin" : "user",
      });

      login(res.data);

      if (isAdmin) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      showToast(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialComingSoon = (name) => {
    showToast(`${name} login coming soon`, "info");
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
        maxWidth: 1000,
        minHeight: 600,
        position: "relative",
        zIndex: 10,
        bgcolor: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 5,
        overflow: "hidden",
        boxShadow: "0 25px 90px rgba(0,0,0,0.5)"
      }}>

        {/* LEFT: Branding */}
        {!isMobile && (
          <Grid item xs={12} md={5} sx={{
            position: "relative",
            background: "linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(30,58,138,0.1) 100%)",
            p: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid rgba(255,255,255,0.05)"
          }}>
            <Box sx={{
              width: 80, height: 80, borderRadius: 3,
              background: "linear-gradient(135deg, #00eaff 0%, #2563eb 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              mb: 4, boxShadow: "0 10px 40px rgba(0,234,255,0.3)"
            }}>
              <LockPersonIcon sx={{ fontSize: 40, color: "#fff" }} />
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 900, color: "#fff", textAlign: "center", mb: 2 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: 280, lineHeight: 1.6 }}>
              Secure access to your personalized DevOps learning dashboard.
            </Typography>
          </Grid>
        )}

        {/* RIGHT: Login Form */}
        <Grid item xs={12} md={7} sx={{ p: { xs: 3, md: 6 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 1 }}>Sign In</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
              Enter your credentials to access your account.
            </Typography>
          </Box>

          {/* Admin Switch */}
          <FormControlLabel
            control={
              <Switch
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: "#facc15" },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#facc15" },
                }}
              />
            }
            label={
              <Typography sx={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600 }}>
                Login as <span style={{ color: isAdmin ? "#facc15" : "inherit" }}>Admin</span>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {/* Social Logins */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ mb: 2 }}>
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await googleLogin(credentialResponse.credential);
                    login(res.data);
                    navigate(from, { replace: true });
                  } catch (err) {
                    showToast("Google Login Failed");
                  }
                }}
                onError={() => showToast("Google Login Failed")}
                theme="filled_black"
                shape="pill"
                width="100%"
              />
            </Box>

            <Stack direction="row" spacing={1} justifyContent="center">
              {[
                { icon: <GitHubIcon fontSize="small" />, name: "GitHub" },
                { icon: <AdbIcon fontSize="small" />, name: "GitLab" },
                { icon: <FacebookIcon fontSize="small" />, name: "Facebook" },
                { icon: <InstagramIcon fontSize="small" />, name: "Instagram" },
                { icon: <WhatsAppIcon fontSize="small" />, name: "WhatsApp" },
              ].map((item, index) => (
                <Tooltip key={index} title={`${item.name} (Coming Soon)`}>
                  <IconButton
                    onClick={() => handleSocialComingSoon(item.name)}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.1)", color: "#fff" }
                    }}
                    size="small"
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>

          <Divider sx={{ mb: 3, "&::before, &::after": { borderColor: "rgba(255,255,255,0.1)" } }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>OR LOGIN WITH EMAIL</Typography>
          </Divider>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                placeholder="Email Address"
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
                placeholder="Password"
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
                  py: 1.6,
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #00eaff, #2563eb)",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 8px 30px rgba(37,99,235,0.3)",
                  "&:hover": { boxShadow: "0 10px 40px rgba(37,99,235,0.4)" }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>
            </Stack>
          </form>

          <Typography sx={{ mt: 3, textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#00eaff", fontWeight: 700, textDecoration: "none" }}>
              Create Account
            </Link>
          </Typography>

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
