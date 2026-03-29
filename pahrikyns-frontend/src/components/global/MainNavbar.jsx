// src/components/global/MainNavbar.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Popper,
  Paper,
  Typography,
  InputBase,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Badge,
  Avatar,
  Portal,
} from "@mui/material";

import { Link } from "react-router-dom";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AppThemeContext } from "../../ThemeContext";
import BuildIcon from "@mui/icons-material/Build";
import CloudIcon from "@mui/icons-material/Cloud";
import ComputerIcon from "@mui/icons-material/Computer";
import GitHubIcon from "@mui/icons-material/GitHub";
import AdbIcon from "@mui/icons-material/Adb";
import PrecisionIcon from "@mui/icons-material/PrecisionManufacturing";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ConstructionIcon from "@mui/icons-material/Construction";
import StorageIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { COURSE_DATA, RESUME_MENU, ENGLISH_MENU } from "../../data/courseData.jsx";
import NotificationHub from "./NotificationHub";

// ❌ ThemeToggle component remove pannirukken –
// nested <button> → <button> warning avoid panradhu.
const NAV_HEIGHT = 70;

/* MENU STRUCTURE */
const MENU = COURSE_DATA; // ✅ Use centralized data

import { performSearch } from "../../utils/searchData";

export default function MainNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const searchBoxRef = useRef(null); // Ref for positioning Portal dropdown
  const coursesBtnRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const englishBtnRef = useRef(null);

  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // 🔍 Search Results
  const [showResults, setShowResults] = useState(false);  // 🔍 Toggle Results
  const [drawer, setDrawer] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Hover intent timer to avoid popper flicker when moving between button and menu
  const closeTimerRef = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const startCloseTimer = (delay = 200) => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      closeMenu();
    }, delay);
  };

  // Profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef(null);
  const { theme, toggleTheme } = useContext(AppThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live Notifications
  const { notifications, unreadCount, markAsRead, deleteNotification } = useNotifications();

  const closeMenu = () => {
    setOpen(false);
    setActive(null);
  };

  // 🔍 Handle Search Input
  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = performSearch(val);
    setSearchResults(filtered);
    setShowResults(true);
  };

  // 🔍 Click Away for Search
  const closeSearch = () => {
    setShowResults(false);
  };

  const toggleProfile = () => setProfileOpen((p) => !p);
  const closeProfile = () => setProfileOpen(false);

  const navBtn = {
    textTransform: "none",
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: '0.04em',
    position: "relative",
    px: 1.8,
    py: 1.2,
    borderRadius: '12px',
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      color: "#00eaff",
      background: "rgba(0, 234, 255, 0.05)",
      transform: 'translateY(-1px)',
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: "50%",
      bottom: 8,
      width: "0%",
      height: "2px",
      background: "linear-gradient(90deg, #11f73b, #ff6200)",
      transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      borderRadius: "2px",
      transform: 'translateX(-50%)',
    },
    "&:hover::after": {
      width: "60%",
    },
  };

  const profileItemStyle = {
    px: 2,
    py: 1,
    fontSize: "14px",
    borderRadius: 1,
    color: "#3c16c7ff",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    display: "block",
    "&:hover": {
      background: "rgba(0,234,255,0.08)",
      color: "#00eaff",
      boxShadow: "0 0 10px rgba(0,234,255,0.12)",
      transition: "0.18s",
    },
  };

  return (
    <>
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 1; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NAVBAR */}
      <AppBar
        elevation={0}
        sx={{
          width: "100%",
          left: 0,
          right: 0,
          top: 0,
          height: NAV_HEIGHT,
          justifyContent: "center",
          background: isScrolled
            ? (theme === "dark" ? "rgba(4, 8, 20, 0.85)" : "rgba(255, 255, 255, 0.85)")
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: isScrolled
            ? (theme === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)")
            : "none",
          boxShadow: isScrolled
            ? (theme === "dark" ? "0 4px 40px rgba(0, 0, 0, 0.4)" : "0 4px 15px rgba(0, 0, 0, 0.03)")
            : "none",
          zIndex: 2000,
          position: "fixed",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1400,
            mx: "auto",
            width: "100%",
            minHeight: `${NAV_HEIGHT}px !important`,
            px: { xs: 1, sm: 2, md: 3 },
            gap: { xs: 1, md: 1.5 },
            overflow: "hidden",
          }}
        >
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component={Link}
              to="/"
              sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
            >
              <Avatar
                sx={{
                  bgcolor: "rgba(0, 234, 255, 0.05)",
                  border: "2.5px solid #00eaff",
                  boxShadow: "0 0 15px rgba(0, 234, 255, 0.3)",
                }}
              >
                <Typography sx={{ color: "#00eaff", fontWeight: 900, letterSpacing: '1px' }}>
                  KH
                </Typography>
              </Avatar>
              <Typography 
                sx={{ 
                  ml: 1.5, 
                  color: theme === "dark" ? "#fff" : "#1a1a1a", 
                  fontWeight: 800, 
                  fontSize: 20,
                  letterSpacing: '0.05em',
                  background: theme === "dark" ? "linear-gradient(90deg, #fff, #00eaff)" : "inherit",
                  WebkitBackgroundClip: theme === "dark" ? "text" : "none",
                  WebkitTextFillColor: theme === "dark" ? "transparent" : "inherit"
                }}
              >
                PAHRIKYNS
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}>
            <Button component={Link} to="/" sx={navBtn}>
              Home
            </Button>
            <Button
              ref={coursesBtnRef}
              sx={navBtn}
              onMouseEnter={() => {
                clearCloseTimer();
                setActive("devops");
                setOpen(true);
              }}
              onMouseLeave={() => {
                startCloseTimer();
              }}
              onClick={() => {
                clearCloseTimer();
                navigate("/courses"); // ✅ Navigate to /courses
                // setActive("devops"); // Optional: if you want the menu to open/stay open
                setOpen(false); // Close menu if navigating
              }}
            >
              Courses 
            </Button>

            <Button component={Link} to="/blog" sx={navBtn}>
              Blog
            </Button>
          </Box>
          <Button
            ref={resumeBtnRef}
            sx={{ ...navBtn, display: { xs: "none", lg: "inline-flex" } }}
            onMouseEnter={() => {
              clearCloseTimer();
              setActive("resume");
              setOpen(true);
            }}
            onMouseLeave={() => startCloseTimer()}
            onClick={() => {
              clearCloseTimer();
              setActive("resume");
              setOpen(true);
            }}
          >
            Resume
          </Button>
          <Button
            ref={englishBtnRef}
            sx={{ ...navBtn, display: { xs: "none", lg: "inline-flex" } }}
            onMouseEnter={() => {
              clearCloseTimer();
              setActive("english");
              setOpen(true);
            }}
            onMouseLeave={() => startCloseTimer()}
            onClick={() => {
              clearCloseTimer();
              setActive("english");
              setOpen(true);
            }}
          >
           English
          </Button>
          <Box sx={{ flex: 1 }} />

          {/* RIGHT */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            {/* SEARCH */}
            <ClickAwayListener onClickAway={closeSearch}>
              <Box
                ref={searchBoxRef}
                sx={{
                  display: { xs: "none", md: "flex" },
                  position: "relative",
                  alignItems: "center",
                  background: "rgba(68, 31, 201, 0.03)",
                  px: 1,
                  py: 0.45,
                  borderRadius: 1,
                  width: { md: 240, lg: 280, xl: 320 },
                  minWidth: 0,
                  transition: "0.25s",
                  "&:focus-within": {
                    boxShadow: "0 0 12px rgba(243, 238, 239, 0.28)",
                    border: "1px solid rgba(252, 253, 253, 0.28)",
                  },
                }}
              >
                <InputBase
                  placeholder="search..."
                  value={query}
                  onChange={handleSearch}
                  onFocus={() => {
                    if (query.trim() !== "") setShowResults(true);
                  }}
                  sx={{ ml: 1, color: "#f1ebebff", flex: 1 }}
                />
                <SearchIcon sx={{ color: "#00eaff" }} />

                {/* 🔍 SEARCH RESULTS — rendered in Portal to escape AppBar stacking context */}
                {showResults && searchResults.length > 0 && searchBoxRef.current && (
                  <Portal>
                    <Paper
                      sx={{
                        position: "fixed",
                        top: (() => {
                          const rect = searchBoxRef.current?.getBoundingClientRect();
                          return rect ? rect.bottom + 8 : 80;
                        })(),
                        left: (() => {
                          const rect = searchBoxRef.current?.getBoundingClientRect();
                          return rect ? rect.left : 0;
                        })(),
                        width: (() => {
                          const rect = searchBoxRef.current?.getBoundingClientRect();
                          return rect ? rect.width : 280;
                        })(),
                        maxHeight: 400,
                        overflowY: "auto",
                        background: "rgba(4,16,38,0.98)",
                        border: "1px solid rgba(0,234,255,0.2)",
                        backdropFilter: "blur(20px)",
                        borderRadius: 2,
                        zIndex: 99999,
                        boxShadow: "0 12px 50px rgba(0,0,0,0.9)",
                      }}
                    >
                    <List dense sx={{ py: 0 }}>
                      {searchResults.map((item, idx) => (
                        <ListItemButton
                          key={idx}
                          component={Link}
                          to={item.link}
                          onClick={() => {
                            setQuery("");
                            setShowResults(false);
                          }}
                          sx={{
                            borderBottom: "1px solid rgba(255,255,255,0.03)",
                            "&:hover": {
                              background: "rgba(0,234,255,0.08)",
                            }
                          }}
                        >
                          {item.icon && (
                            <ListItemIcon sx={{ minWidth: 36, color: "#00eaff" }}>
                              {item.icon}
                            </ListItemIcon>
                          )}
                          <ListItemText
                            primary={
                              <Typography sx={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                                {item.category}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Paper>
                  </Portal>
                )}
              </Box>
            </ClickAwayListener>

            {/* NOTIFICATIONS */}
            <NotificationHub />

            {/* CHAT ICON */}
            <Tooltip title="Chat">
              <IconButton
                onClick={() => navigate("/chat")}
                sx={{
                  color: "#00eaff",
                  display: { xs: "none", sm: "inline-flex" },
                  "&:hover": { color: "#5b5fc7" }
                }}
              >
                <Badge color="error" badgeContent={0}>
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* THEME TOGGLE */}
            <IconButton onClick={toggleTheme} sx={{ color: theme === "dark" ? "#00eaff" : "#1a1a1a", display: { xs: "none", sm: "inline-flex" } }}>
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* LOGIN / REGISTER */}
            {!user ? (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    bgcolor: "#1ed86cff",
                    color: "#fff",
                    px: { xs: 1.2, sm: 1.8 },
                    fontSize: { xs: 12, sm: 14 },
                  }}
                >
                  LOGIN
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  sx={{
                    bgcolor: "#03bd50ff",
                    color: "#001",
                    px: { xs: 1.2, sm: 1.8 },
                    fontSize: { xs: 12, sm: 14 },
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                >
                  REGISTER
                </Button>
              </>
            ) : (
              <ClickAwayListener onClickAway={closeProfile}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    ref={profileRef}
                    onClick={toggleProfile}
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "#002b36",
                      border: "2px solid rgba(0,234,255,0.35)",
                      cursor: "pointer",
                    }}
                  >
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </Avatar>

                  {profileOpen && (
                    <Paper sx={{ position: "absolute", right: 0, top: "46px", p: 1 }}>
                      <Box component={Link} to="/dashboard" sx={profileItemStyle}>
                        Dashboard
                      </Box>
                      <Box
                        onClick={() => {
                          logout();
                          closeProfile();
                        }}
                        sx={profileItemStyle}
                      >
                        Logout
                      </Box>
                    </Paper>
                  )}
                </Box>
              </ClickAwayListener>
            )}

            <IconButton
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
              onClick={() => setDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* POPPER MEGA MENU */}
      <Popper
        open={open}
        anchorEl={
          active === "resume"
            ? resumeBtnRef.current
            : active === "english"
            ? englishBtnRef.current
            : coursesBtnRef.current
        }
        placement="bottom-start"
        modifiers={[{ name: "offset", options: { offset: [0, 15] } }]}
        onMouseEnter={() => clearCloseTimer()}
        onMouseLeave={() => startCloseTimer()}
      >

        <ClickAwayListener onClickAway={closeMenu}>
          <Paper
            sx={{
              width: (active === "resume" || active === "english") ? 300 : 530,
              display: "inline-flex",
              borderRadius: 2,
              background: "linear-gradient(180deg,#041225,#021018)",
              border: "1px solid rgba(0,234,255,0.06)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              animation: "fadeSlide 0.22s ease",
              transformOrigin: "top left",
              overflow: "hidden",
            }}
          >
            {/* MENU A - ONLY SHOW IF NOT RESUME OR ENGLISH */}
            {active !== "resume" && active !== "english" && (
              <Box
                sx={{
                  width: 240,
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <List>
                  {Object.entries(MENU).map(([key, cat]) => (
                    <ListItemButton
                      key={key}
                      selected={active === key}
                      onMouseEnter={() => setActive(key)}
                      sx={{ py: 2 }}
                    >
                      <ListItemIcon sx={{ color: "#00eaff" }}>
                        {key === "devops" ? (
                          <BuildIcon />
                        ) : key === "aws" || key === "azure" || key === "gcp" ? (
                          <CloudIcon />
                        ) : key === "database" ? (
                          <StorageIcon />
                        ) : key === "SystemDesign" ? (
                          <PrecisionIcon />
                        ) : (
                          <ComputerIcon />
                        )}
                      </ListItemIcon>

                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              color: active === key ? "#00eaff" : "#fff",
                              fontWeight: 800,
                            }}
                          >
                            {cat.title}
                          </Typography>
                        }
                        secondary={
                          <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                            {cat.desc}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            )}

            {/* MENU B */}
            <Box sx={{ flex: 1, p: 3, minWidth: (active === "resume" || active === "english") ? 300 : "auto" }}>
              <Typography
                component={Link}
                to={active === "english" ? "/english" : active === "resume" ? "/resume" : (MENU[active]?.link || "#")}
                onClick={closeMenu}
                sx={{
                  color: "#00eaff",
                  fontWeight: 900,
                  mb: 1,
                  display: "inline-block",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                {active === "english" ? "🇬🇧 English Learning" : MENU[active]?.title}
              </Typography>

              {(active === "resume"
                ? RESUME_MENU.items
                : active === "english"
                ? ENGLISH_MENU.items
                : MENU[active]?.items
              )?.map((it, i) => (

                <Box
                  key={i}
                  component={Link}
                  to={it.link}
                  onClick={closeMenu}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    py: 0.6,
                    my: 0.3,
                    textDecoration: "none",
                    color: "#fff",
                    borderRadius: 1,
                    transition: "0.15s",
                    "&:hover": {
                      background: "rgba(255,255,255,0.04)",
                      color: "#00eaff",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,234,255,0.06)",
                      border: "1px solid rgba(0,234,255,0.10)",
                      color: "#00eaff",
                      fontSize: 17,
                    }}
                  >
                    {it.icon}
                  </Box>

                  <Typography
                    sx={{ fontWeight: 700, fontSize: 14 }}
                  >
                    {it.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <Box
          sx={{
            width: 280,
            background: theme === "dark" ? "#021018" : "#fff",
            color: theme === "dark" ? "#fff" : "#021018",
            height: "100%",
            p: 2,
          }}
        >
          <Typography sx={{ color: theme === "dark" ? "#00eaff" : "primary.main", fontWeight: 800 }}>
            Pahrikyns
          </Typography>
          <Divider sx={{ my: 1, borderColor: theme === "dark" ? "rgba(0,234,255,0.2)" : "rgba(0,0,0,0.1)" }} />

          {/* Theme & Profile quick actions in mobile drawer */}
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
             <Button 
               fullWidth 
               variant="outlined" 
               startIcon={theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
               onClick={toggleTheme}
               sx={{ 
                 borderColor: theme === "dark" ? "rgba(0,234,255,0.2)" : "rgba(0,0,0,0.2)", 
                 color: theme === "dark" ? "#fff" : "#333", 
                 textTransform: "none" 
               }}
             >
               {theme === "dark" ? "Light" : "Dark"}
             </Button>
             <Button 
               fullWidth 
               variant="outlined" 
               startIcon={<ChatBubbleOutlineIcon />}
               onClick={() => { navigate("/chat"); setDrawer(false); }}
               sx={{ borderColor: "rgba(0,234,255,0.2)", color: "#fff", textTransform: "none" }}
             >
               Chat
             </Button>
          </Box>

          {/* MOBILE UNIVERSAL SEARCH */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: theme === "dark" ? "rgba(0,234,255,0.05)" : "rgba(0,0,0,0.03)",
              p: 1,
              borderRadius: 2,
              mb: 2,
              border: theme === "dark" ? "1px solid rgba(0,234,255,0.2)" : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <SearchIcon sx={{ color: theme === "dark" ? "#00eaff" : "primary.main", mr: 1 }} />
            <InputBase
              placeholder="Universal Search..."
              value={query}
              onChange={handleSearch}
              sx={{ color: theme === "dark" ? "#fff" : "#333", width: "100%" }}
            />
          </Box>
          
          {/* MOBILE SEARCH RESULTS */}
          {query.trim() !== "" && searchResults.length > 0 && (
             <Box sx={{ mb: 2, background: theme === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.02)", borderRadius: 2, overflow: "hidden" }}>
                <Typography sx={{ color: theme === "dark" ? "#00eaff" : "primary.main", fontSize: 12, px: 2, pt: 1, pb: 0.5, fontWeight: "bold" }}>SEARCH RESULTS</Typography>
                <List dense>
                  {searchResults.slice(0, 5).map((item, idx) => (
                    <ListItemButton
                      key={`mob-${idx}`}
                      component={Link}
                      to={item.link}
                      onClick={() => { setDrawer(false); setQuery(""); }}
                      sx={{ borderBottom: theme === "dark" ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)" }}
                    >
                      <ListItemText 
                        primary={<Typography sx={{color: theme === "dark" ? "#fff" : "#333", fontSize: 13}}>{item.name}</Typography>} 
                        secondary={<Typography sx={{color: theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontSize: 11}}>{item.category}</Typography>} 
                      />
                    </ListItemButton>
                  ))}
                </List>
             </Box>
          )}

          {query.trim() === "" && Object.entries(MENU).map(([key, cat]) => (
            <Box key={key} sx={{ mt: 1 }}>
              <Typography sx={{ color: "#00eaff", fontWeight: 800 }}>
                {cat.title}
              </Typography>
              {cat.items.map((it, i) => (
                <ListItemButton
                  key={i}
                  component={Link}
                  to={it.link}
                  onClick={() => setDrawer(false)}
                >
                  <ListItemText primary={it.name} />
                </ListItemButton>
              ))}
            </Box>
          ))}

          {/* English Section in Mobile Drawer */}
          {query.trim() === "" && (
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ color: theme === "dark" ? "#00eaff" : "primary.main", fontWeight: 800 }}>🇬🇧 English</Typography>
              {ENGLISH_MENU.items.map((it, i) => (
                <ListItemButton 
                  key={i} 
                  component={Link} 
                  to={it.link} 
                  onClick={() => setDrawer(false)}
                  sx={{ color: theme === "dark" ? "inherit" : "#333" }}
                >
                  <ListItemIcon sx={{ color: theme === "dark" ? "#00eaff" : "primary.main", minWidth: 36 }}>{it.icon}</ListItemIcon>
                  <ListItemText primary={it.name} />
                </ListItemButton>
              ))}
            </Box>
          )}
        </Box>
      </Drawer>


    </>
  );
}
