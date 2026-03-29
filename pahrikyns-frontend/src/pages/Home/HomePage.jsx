import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box, Container, Grid, Typography, Button, Stack, Card, CardContent, InputBase, Paper, List, ListItemButton, ListItemText, ListItemIcon, Avatar, AvatarGroup, ClickAwayListener
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";

import infosys from "../../assets/logos/infosys.png";
import tcs from "../../assets/logos/tcs.png";
import wipro from "../../assets/logos/wipro.png";
import accenture from "../../assets/logos/accenture.png";
import amazon from "../../assets/logos/amazon.png";
import zoho from "../../assets/logos/zoho.png";

import { performSearch } from "../../utils/searchData";
import Meta from "../../components/global/Meta";
import "./Home.css";

// === COMPONENTS ===

const NeuralGrid = () => (
  <Box className="neural-grid">
    <Box className="neural-line" style={{ top: '20%', animationDelay: '0s' }} />
    <Box className="neural-line" style={{ top: '50%', animationDelay: '2s' }} />
    <Box className="neural-line" style={{ top: '80%', animationDelay: '4s' }} />
  </Box>
);

const AnimatedStat = ({ value, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value) || 0;
    if (!end) return;
    const step = Math.max(1, Math.floor(end / 60));
    const id = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(id);
      } else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [value]);

  return (
    <Box sx={{ textAlign: "left", position: "relative", zIndex: 2 }}>
      <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: 32, md: 44 }, color: "#fff", textShadow: "0 0 20px rgba(0,234,255,0.4)" }}>
        {count.toLocaleString()}+
      </Typography>
      <Typography variant="body2" sx={{ mt: 0.5, color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, fontSize: 10 }}>
        {label}
      </Typography>
    </Box>
  );
};

const PremiumFeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
    <Box className="glass-panel glass-item" sx={{ p: 4, height: '100%', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ 
          width: 64, height: 64, borderRadius: '16px', display: "flex", 
          alignItems: "center", justifyContent: "center", 
          background: "linear-gradient(135deg, rgba(0,234,255,0.1), rgba(123,63,228,0.1))", 
          color: "#00eaff", mb: 3, border: "1px solid rgba(0,234,255,0.1)"
        }}>
          {icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: "#fff", letterSpacing: '-0.01em' }}>{title}</Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7, fontSize: 13 }}>{desc}</Typography>
    </Box>
  </motion.div>
);

const PremiumCourseCard = ({ title, desc, link, tag, icon }) => (
  <motion.div whileHover={{ translateY: -8 }} transition={{ type: "spring", stiffness: 300 }}>
    <Box className="glass-panel glass-item" sx={{ p: 4, height: '100%', position: 'relative' }}>
      <Box sx={{ position: "absolute", right: 20, top: 20, fontSize: 10, fontWeight: 900, background: "rgba(0,234,255,0.1)", border: "1px solid rgba(0,234,255,0.2)", color: '#00eaff', py: 0.6, px: 1.5, borderRadius: 1.5, letterSpacing: 1 }}>
        {tag}
      </Box>
      <Box sx={{ color: "#00eaff", mb: 2, opacity: 0.8 }}>{icon}</Box>
      <Typography variant="h5" sx={{ fontWeight: 800, color: "#fff", mb: 1, letterSpacing: '-0.02em', fontSize: '1.4rem' }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.3)", mb: 3, minHeight: 40, lineHeight: 1.6, fontSize: 14 }}>{desc}</Typography>
      <Button 
        component={Link} 
        to={link} 
        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />} 
        sx={{ 
          color: "#00eaff", 
          fontWeight: 800, 
          p: 0, 
          fontSize: 13,
          textTransform: "none",
          '&:hover': { bgcolor: 'transparent', gap: 1 } 
        }}
      >
        Access Training
      </Button>
    </Box>
  </motion.div>
);

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleHeroSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setSearchResults(performSearch(val));
    setShowResults(true);
  };

  return (
    <Box className="hp-root">
      <Meta 
        title="Technical Mastery Command Center" 
        description="Master production-grade DevOps, Cloud Architecture, and System Design."
      />
      
      <NeuralGrid />
      
      {/* BACKGROUND GLOWS */}
      <Box className="hero-glow" style={{ top: '-10%', left: '-10%' }} />
      <Box className="hero-glow" style={{ top: '20%', right: '-10%', background: "radial-gradient(circle, rgba(123,63,228,0.1) 0%, transparent 70%)" }} />

      {/* === HERO SECTION === */}
      <Container maxWidth="lg" sx={{ pt: { xs: 15, md: 24 }, pb: { xs: 10, md: 18 }, position: 'relative', zIndex: 1, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, py: 1, px: 2.5, borderRadius: 999, border: "1px solid rgba(0,234,255,0.2)", background: "rgba(0,234,255,0.03)", color: "#00eaff", fontWeight: 800, mb: 4, fontSize: 12, letterSpacing: 2 }}>
               SYSTEM STATUS: ONLINE <Box sx={{ width: 8, height: 8, bgcolor: "#00ff88", borderRadius: "50%", boxShadow: "0 0 10px #00ff88" }} />
            </Box>

            <Typography variant="h1" className="gradient-text" sx={{ 
              fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem' }, 
              lineHeight: 1, 
              fontWeight: 900, 
              letterSpacing: "-0.05em",
              mb: 3
            }}>
              Technical Mastery <br />
              <Box component="span" className="gradient-accent">Command Center.</Box>
            </Typography>

            <Typography variant="h6" sx={{ 
              mt: 2, 
              mb: 6, 
              color: "rgba(255,255,255,0.4)", 
              fontWeight: 400, 
              maxWidth: 750, 
              mx: "auto", 
              lineHeight: 1.8,
              fontSize: { xs: 16, md: 20 },
              letterSpacing: '-0.01em'
            }}>
              High-fidelity simulation and project-led curriculum for the next generation of <b>Production Engineers.</b> Master DevOps, Cloud, and architecture with zero friction.
            </Typography>

            {/* UNIVERSAL SEARCH HUB */}
            <ClickAwayListener onClickAway={() => setShowResults(false)}>
              <Box sx={{ position: "relative", maxWidth: 650, mx: "auto", zIndex: 50 }}>
                <Box sx={{ 
                  display: "flex", alignItems: "center", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(40px)", 
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, px: 3, py: 2,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6)", transition: "all 0.3s",
                  "&:focus-within": { border: "1px solid rgba(0,234,255,0.4)", transform: "translateY(-2px)" }
                }}>
                  <SearchIcon sx={{ color: "#00eaff", fontSize: 28, mr: 2, opacity: 0.7 }} />
                  <InputBase
                    placeholder="Search systems, tools, roadmaps..."
                    value={query}
                    onChange={handleHeroSearch}
                    onFocus={() => { if (query.trim() !== "") setShowResults(true); }}
                    sx={{ color: "#fff", flex: 1, fontSize: 18, fontWeight: 500 }}
                  />
                  <Box sx={{ color: "rgba(255,255,255,0.1)", fontSize: 11, fontWeight: 900, border: "1px solid rgba(255,255,255,0.1)", px: 1, py: 0.5, borderRadius: 1 }}>
                     CMD + K
                  </Box>
                </Box>

                {/* SEARCH DROPDOWN */}
                <AnimatePresence>
                  {showResults && searchResults.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                      <Paper className="glass-panel" sx={{ position: "absolute", top: "110%", left: 0, right: 0, maxHeight: 400, overflowY: "auto", p: 1, zIndex: 100, border: "1px solid rgba(0,234,255,0.2)" }}>
                        <List>
                          {searchResults.map((item, idx) => (
                            <ListItemButton key={idx} component={Link} to={item.link} sx={{ borderRadius: 2, mb: 0.5, "&:hover": { background: "rgba(0,234,255,0.05)" } }}>
                              {item.icon && <ListItemIcon sx={{ minWidth: 40, color: "#00eaff", opacity: 0.8 }}>{item.icon}</ListItemIcon>}
                              <ListItemText 
                                primary={<Typography sx={{color:"#fff", fontWeight: 700, fontSize: 15}}>{item.name}</Typography>} 
                                secondary={<Typography sx={{color:"rgba(255,255,255,0.3)", fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5}}>{item.category}</Typography>} 
                              />
                            </ListItemButton>
                          ))}
                        </List>
                      </Paper>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </ClickAwayListener>
            
            <Stack direction="row" spacing={{ xs: 4, md: 8 }} justifyContent="center" sx={{ mt: 10 }}>
              <AnimatedStat value={"5200"} label="Operators" />
              <AnimatedStat value={"380"} label="Blueprints" />
              <AnimatedStat value={"98"} label="Deployments" />
            </Stack>
          </motion.div>
      </Container>

      {/* === TECH STACK SCROLLER === */}
      <Box sx={{ py: 6, borderTop: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)", background: "rgba(0,0,0,0.2)" }}>
        <Container maxWidth="lg">
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: 3, display: 'block', mb: 5, fontWeight: 900, textAlign: 'center' }}>
            TRUSTED FOR ARCHITECTURAL TRAINING BY TOP ENGINEERS
          </Typography>
          <Stack direction="row" spacing={{ xs: 4, md: 8 }} justifyContent="center" flexWrap="wrap" sx={{ opacity: 0.3 }}>
            {[infosys, tcs, wipro, accenture, amazon, zoho].map((l, i) => (
              <Box component="img" key={i} src={l} alt="partner" sx={{ height: 28, filter: "grayscale(100%) brightness(300%)", transition: '0.4s', '&:hover': { opacity: 1, filter: "grayscale(0%)" } }} />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* === SYSTEM FEATURES === */}
      <Container maxWidth="lg" sx={{ py: { xs: 12, md: 20 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 12 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: 32, md: 56 }, mb: 2, letterSpacing: '-0.04em' }}>
            Master the <Box component="span" sx={{ color: "#00eaff" }}>Production Stack.</Box>
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.3)", maxWidth: 700, mx: "auto", fontSize: 18, lineHeight: 1.7 }}>
             Battle-tested roadmaps designed for engineers who want to build high-availability, distributed systems.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}><PremiumFeatureCard icon={<CodeIcon sx={{ fontSize: 32 }}/>} title="Project Roadmaps" desc="Step-by-step blueprints from basic scripts to multi-cloud clusters." delay={0.1} /></Grid>
          <Grid item xs={12} sm={6} md={3}><PremiumFeatureCard icon={<StorageIcon sx={{ fontSize: 32 }}/>} title="Production Env" desc="Direct access to live cloud sandboxes and production-grade mirrors." delay={0.2} /></Grid>
          <Grid item xs={12} sm={6} md={3}><PremiumFeatureCard icon={<BuildIcon sx={{ fontSize: 32 }}/>} title="Neural Network" desc="Connect with a data-dense community of 5000+ elite engineers." delay={0.3} /></Grid>
          <Grid item xs={12} sm={6} md={3}><PremiumFeatureCard icon={<CloudIcon sx={{ fontSize: 32 }}/>} title="Career HUD" desc="Real-time resume monitoring and direct placement API access." delay={0.4} /></Grid>
        </Grid>
      </Container>

      {/* === MISSION TRACKS === */}
      <Box sx={{ py: { xs: 12, md: 20 }, background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="flex-end" sx={{ mb: 8, gap: 3 }}>
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: 32, md: 48 }, mb: 1, letterSpacing: '-0.03em' }}>Active Tracks</Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}>Interactive simulated environments.</Typography>
            </Box>
            <Button component={Link} to="/courses" className="btn-primary-hud" endIcon={<ArrowForwardIcon />}>Go to Courses</Button>
          </Stack>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}><PremiumCourseCard title="AWS Core Architecture" desc="Architect highly resilient systems using EC2, VPC, Lambda and IAM." link="/courses/aws" tag="ADVANCED" icon={<CloudIcon sx={{ fontSize: 32 }}/>} /></Grid>
            <Grid item xs={12} sm={6} md={4}><PremiumCourseCard title="DevOps Engineering" desc="Full-stack automation with Kubernetes, Terraform, & CI/CD." link="/courses/devops" tag="CAREER" icon={<BuildIcon sx={{ fontSize: 32 }}/>} /></Grid>
            <Grid item xs={12} sm={6} md={4}><PremiumCourseCard title="Database Internals" desc="Master SQL query optimization, sharding, and ACID properties." link="/courses/database" tag="CORE" icon={<StorageIcon sx={{ fontSize: 32 }}/>} /></Grid>
          </Grid>
        </Container>
      </Box>

      {/* === COMMUNITY PULSE === */}
      <Container maxWidth="lg" sx={{ py: { xs: 12, md: 20 }, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={10} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.03em', fontSize: { xs: 32, md: 48 } }}>
              The Network <Box component="span" sx={{ color: "#7b3fe4" }}>Pulse.</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.4)", mb: 6, fontSize: 18, lineHeight: 1.8 }}>
               Pahrikyns isn't just a platform; it's a data-dense ecosystem for collective intelligence.
            </Typography>
            
            <Stack spacing={3}>
              {[
                { name: "Rahul S.", college: "IIT Madras", text: "Deployed multi-region failover architecture today.", icon: "⚡" },
                { name: "Priya K.", college: "NITT", text: "The AWS Solutions track mapping is incredibly precise.", icon: "🛡️" },
                { name: "Arjun M.", college: "VIT", text: "Placement locked. Top-tier architecture role secured.", icon: "🎯" }
              ].map((item, i) => (
                <Box key={i} className="glass-panel" sx={{ p: 3, display: 'flex', gap: 2.5, alignItems: 'center', transition: '0.3s', '&:hover': { transform: 'translateX(10px)', borderColor: 'rgba(123,63,228,0.3)' } }}>
                   <Box sx={{ fontSize: 24, opacity: 0.8 }}>{item.icon}</Box>
                   <Box>
                     <Typography sx={{ fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>{item.name} <Box component="span" sx={{ fontWeight: 400, opacity: 0.3, ml: 1, fontSize: 12 }}>{item.college}</Box></Typography>
                     <Typography sx={{ opacity: 0.5, fontSize: 14, mt: 0.5 }}>{item.text}</Typography>
                   </Box>
                </Box>
              ))}
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={6}>
             <Box className="glass-panel" sx={{ p: 6, textAlign: 'center', background: "linear-gradient(135deg, rgba(0,234,255,0.03), rgba(123,63,228,0.03))" }}>
                <AvatarGroup max={5} sx={{ justifyContent: 'center', mb: 4 }}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Avatar key={i} src={`https://i.pravatar.cc/150?u=${i}`} sx={{ width: 64, height: 64, border: '4px solid #020611 !important' }} />
                  ))}
                </AvatarGroup>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em' }}>5,200+ Operators Joined</Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.3)", mb: 4 }}>Access the collective hive mind of engineers.</Typography>
                <Button variant="outlined" sx={{ borderRadius: 2, borderColor: 'rgba(255,255,255,0.1)', color: '#fff', textTransform: 'none', px: 4, py: 1.5, fontWeight: 700, '&:hover': { borderColor: '#7b3fe4', background: 'rgba(123,63,228,0.05)' } }}>
                  Enter Discord Terminal
                </Button>
             </Box>
          </Grid>
        </Grid>
      </Container>

      {/* === READY PROTOCOL === */}
      <Container maxWidth="md" sx={{ py: { xs: 12, md: 24 }, position: 'relative', zIndex: 1 }}>
          <Box className="glass-panel" sx={{ p: { xs: 4, md: 8 }, textAlign: "center", borderTop: "4px solid var(--accent-cyan)", position: 'relative', overflow: 'hidden' }}>
            <Box className="hero-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }} />
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: 32, md: 52 }, letterSpacing: '-0.05em' }}>Initiate Access.</Typography>
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.3)", mb: 5, fontWeight: 400, maxWidth: 500, mx: "auto" }}>Step into the future of production engineering. Your journey starts now.</Typography>
            <Button component={Link} to="/register" className="btn-primary-hud" sx={{ py: 2.5, px: 10, fontSize: '1.2rem', borderRadius: 2 }}>
              Get Started
            </Button>
          </Box>
      </Container>

    </Box>
  );
}
