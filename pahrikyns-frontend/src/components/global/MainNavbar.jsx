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
} from "@mui/material";

import { Link } from "react-router-dom";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getNotifications, markAllRead } from "../../utils/notifications";
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
import { COURSE_DATA, RESUME_MENU } from "../../data/courseData.jsx"; // ✅ Added Import

// ❌ ThemeToggle component remove pannirukken –
// nested <button> → <button> warning avoid panradhu.
const NAV_HEIGHT = 70;

/* MENU STRUCTURE */
const MENU = COURSE_DATA; // ✅ Use centralized data

// 🔍 FLATTEN DATA FOR SEARCH
const getAllSearchItems = () => {
  let items = [];

  // 1. Add normal menus
  Object.values(MENU).forEach((cat) => {
    if (cat.items) {
      cat.items.forEach((item) => {
        items.push({
          name: item.name,
          link: item.link,
          category: cat.title,
          icon: item.icon,
        });
      });
    }
  });

  // 2. Add resume menu
  RESUME_MENU.items.forEach((item) => {
    items.push({
      name: item.name,
      link: item.link,
      category: RESUME_MENU.title,
      icon: <DescriptionIcon />, // Resume items don't have icons in the original object, adding a default
    });
  });

  return items;
};

const ALL_SEARCH_ITEMS = getAllSearchItems();

export default function MainNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null); // Ref for click outside search
  const coursesBtnRef = useRef(null);
  const resumeBtnRef = useRef(null);

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
  const profileRef = useRef(null);
  const { theme, toggleTheme } = useContext(AppThemeContext);

  // notifications (localStorage-backed)
  const [notifications, setNotifications] = useState(() => getNotifications());

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "notifications") {
        setNotifications(getNotifications());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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

    const filtered = ALL_SEARCH_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(val.toLowerCase())
    );
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
    color: "#e3dcf0ff",
    fontWeight: 700,
    fontSize: 17,
    position: "relative",
    px: 2,
    py: 1,
    "&:hover": {
      color: "#0f0f0fff",
      background: "rgba(6, 250, 6, 0.93)",
      boxShadow: "0 0 10px rgba(245, 249, 250, 0.15)",
      transition: "0.18s",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -6,
      width: "0%",
      height: "2px",
      background: "#ff00f2ff",
      transition: "0.28s ease",
      borderRadius: "2px",
    },
    "&:hover::after": {
      width: "100%",
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
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NAVBAR */}
      <AppBar
        sx={{
          width: "100%",
          left: 0,
          right: 0,
          top: 0,
          height: NAV_HEIGHT,
          justifyContent: "center",
          background: "rgba(68, 58, 92, 0.62)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,234,255,0.12)",
          boxShadow: "0 6px 30px rgba(0, 234, 255, 0.06)",
          zIndex: 2000,
          position: "sticky",
          transition: "0.25s ease",
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
                  bgcolor: "transparent",
                  border: "2px solid #ff00eaff",
                }}
              >
                <Typography sx={{ color: "#e6f705ff", fontWeight: 900 }}>
                  KH
                </Typography>
              </Avatar>
              <Typography sx={{ ml: 1, color: "#eeff00ff", fontWeight: 800 }}>
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
              Courses ▾
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
            Resume ▾
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
                sx={{
                  display: { xs: "none", md: "flex" },
                  position: "relative", // Needed for absolute positioning of results
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

                {/* 🔍 SEARCH RESULTS DROPDOWN */}
                {showResults && searchResults.length > 0 && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      mt: 1,
                      maxHeight: 400,
                      overflowY: "auto",
                      background: "rgba(4,16,38,0.98)", // Consistent dark theme
                      border: "1px solid rgba(0,234,255,0.12)",
                      backdropFilter: "blur(12px)",
                      borderRadius: 1,
                      zIndex: 2500,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
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
                )}
              </Box>
            </ClickAwayListener>

            {/* NOTIFICATIONS */}
            <IconButton
              onClick={() => {
                setNotifOpen((v) => !v);
                if (!notifOpen) {
                  markAllRead();
                  setNotifications(getNotifications());
                }
              }}
              sx={{ color: "#daee22ff" }}
            >
              <Badge
                color="primary"
                badgeContent={notifications.filter((n) => !n.read).length}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* CHAT ICON */}
            <Tooltip title="Chat">
              <IconButton
                onClick={() => navigate("/chat")}
                sx={{
                  color: "#00eaff",
                  "&:hover": { color: "#5b5fc7" }
                }}
              >
                <Badge color="error" badgeContent={2}>
                  <ChatBubbleOutlineIcon />
                </Badge>
              </IconButton>
            </Tooltip>


            {/* THEME TOGGLE – pure IconButton (NO inner button) */}
            <IconButton onClick={toggleTheme} sx={{ color: "#042929ff" }}>
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* NOTIF PANEL */}
            {notifOpen && (
              <Paper
                sx={{
                  position: "absolute",
                  right: 18,
                  top: NAV_HEIGHT + 8,
                  width: 320,
                  p: 1,
                  background: "rgba(4,16,38,0.95)",
                  border: "1px solid rgba(0,234,255,0.12)",
                  backdropFilter: "blur(8px)",
                  animation: "fadeSlide 0.22s ease",
                  zIndex: 2200,
                }}
              >
                <Typography
                  sx={{ color: "#00eaff", fontWeight: 700, px: 1 }}
                >
                  Notifications
                </Typography>
                <Divider sx={{ my: 1 }} />
                {notifications.length === 0 && (
                  <Typography
                    sx={{ px: 1, py: 0.7, color: "#9fbfdc" }}
                  >
                    No notifications
                  </Typography>
                )}
                {notifications.map((n) => (
                  <Box
                    key={n.id}
                    sx={{
                      px: 1,
                      py: 0.8,
                      color: n.read ? "#8fa9bf" : "#fff",
                      bgcolor: n.read
                        ? "transparent"
                        : "rgba(0,234,255,0.03)",
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                      {n.text}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, opacity: 0.6 }}
                    >
                      {new Date(n.id).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            )}

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
              width: active === "resume" ? 300 : 530,
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
            {/* MENU A - ONLY SHOW IF NOT RESUME */}
            {active !== "resume" && (
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
                        ) : key === "aws" ? (
                          <CloudIcon />
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
            <Box sx={{ flex: 1, p: 3, minWidth: active === "resume" ? 300 : "auto" }}>
              <Typography
                component={Link}
                to={MENU[active]?.link || "#"}
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
                {MENU[active]?.title}
              </Typography>

              {(active === "resume"
                ? RESUME_MENU.items
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
            background: "#021018",
            color: "#fff",
            height: "100%",
            p: 2,
          }}
        >
          <Typography sx={{ color: "#00eaff", fontWeight: 800 }}>
            Pahrikyns
          </Typography>
          <Divider sx={{ my: 1 }} />

          {Object.entries(MENU).map(([key, cat]) => (
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
        </Box>
      </Drawer>


    </>
  );
}
