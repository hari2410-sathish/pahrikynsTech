import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Collapse,
  IconButton,
  Drawer,
  useMediaQuery,
  Badge,
  Stack
} from "@mui/material";

// ICONS (TwoTone)
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import BookTwoToneIcon from "@mui/icons-material/BookTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import PaymentsTwoToneIcon from "@mui/icons-material/PaymentsTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import AnalyticsTwoToneIcon from "@mui/icons-material/AnalyticsTwoTone";
import BoltTwoToneIcon from "@mui/icons-material/BoltTwoTone";

// =====================================================
// MENU CONFIG
// =====================================================
const menu = [
  {
    title: "Intelligence",
    single: true,
    path: "/admin/dashboard",
    icon: <DashboardTwoToneIcon />,
  },

  {
    title: "Operations",
    icon: <SchoolTwoToneIcon />,
    basePath: "/admin/orders",
    children: [
      { title: "All Records", path: "/admin/orders" },
      { title: "Manual Entry", path: "/admin/orders/add" },
      { title: "Deep Scan", path: "/admin/orders/search" },
      { title: "Data Export", path: "/admin/orders/export" },
      { title: "Draft Orders", path: "/admin/orders/drafts" },
      { title: "Shipments", path: "/admin/orders/shipments" },
      { title: "Gift Exchange", path: "/admin/orders/gift-certificates" },
    ],
  },

  {
    title: "Curriculum",
    icon: <BookTwoToneIcon />,
    basePath: "/admin/products",
    children: [
      { title: "Global Catalog", path: "/admin/products" },
      { title: "New Module", path: "/admin/products/add" },
      { title: "Batch Import", path: "/admin/products/import" },
      { title: "Curated Sectors", path: "/admin/products/categories" },
      { title: "Module Options", path: "/admin/products/options" },
      { title: "Attribute Filter", path: "/admin/products/filtering" },
      { title: "Learner Feedback", path: "/admin/products/reviews" },
      { title: "Partner Brands", path: "/admin/products/brands" },
    ],
  },

  {
    title: "Learners",
    icon: <PeopleTwoToneIcon />,
    basePath: "/admin/Customers",
    children: [
      { title: "Global Registry", path: "/admin/Customers/AllCustomers" },
      { title: "Identity Entry", path: "/admin/Customers/AddCustomer" },
      { title: "User Segments", path: "/admin/Customers/CustomerGroups" },
    ],
  },

  {
    title: "Ecosystem",
    icon: <StorefrontTwoToneIcon />,
    basePath: "/admin/storefront",
    children: [
      { title: "Neural Pages", path: "/admin/storefront/webpages" },
      { title: "Editorial Center", path: "/admin/storefront/blog" },
      { title: "Imagery Archive", path: "/admin/storefront/images" },
    ],
  },

  {
    title: "Analytics",
    icon: <AnalyticsTwoToneIcon />,
    basePath: "/admin/analytics",
    children: [
      { title: "System Overview", path: "/admin/analytics" },
      { title: "Intelligence", path: "/admin/analytics/insight" },
      { title: "Real-time Pulse", path: "/admin/analytics/realtime" },
      { title: "Marketing signals", path: "/admin/analytics/marketing" },
      { title: "Revenue Trajectory", path: "/admin/analytics/orders" },
      { title: "Retention Data", path: "/admin/analytics/customers" },
      { title: "Conversion Pipeline", path: "/admin/analytics/purchase-funnel" },
      { title: "Recovery Vault", path: "/admin/analytics/carts" },
    ],
  },

  {
    title: "Achievements",
    icon: <WorkspacePremiumTwoToneIcon />,
    basePath: "/admin/certificates",
    children: [
      { title: "Registry", path: "/admin/certificates" },
      { title: "Issue Command", path: "/admin/certificates/issue" },
    ],
  },

  {
    title: "Commerce",
    icon: <PaymentsTwoToneIcon />,
    basePath: "/admin/payments",
    children: [
      { title: "Ledger", path: "/admin/payments" },
      { title: "Invoices", path: "/admin/payments/invoices" },
      { title: "Refund protocols", path: "/admin/payments/refunds" },
    ],
  },

  {
    title: "Personnel",
    icon: <DescriptionTwoToneIcon />,
    basePath: "/admin/resume",
    children: [
      { title: "Home", path: "/admin/resume" },
      { title: "Builder Engine", path: "/admin/resume/builder" },
    ],
  },

  {
    title: "Core Config",
    icon: <SettingsTwoToneIcon />,
    basePath: "/admin/settings",
    children: [
      { title: "Protocols", path: "/admin/settings" },
      { title: "Admin Identity", path: "/admin/settings/profile" },
      { title: "Cipher Shift", path: "/admin/settings/password" },
      { title: "Access Logs", path: "/admin/settings/security-logs" },
      { title: "2FA Shield", path: "/admin/settings/2fa" },
    ],
  },
];

export default function AdminSidebar({ notifyCount = 0 }) {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const userName = localStorage.getItem("ADMIN_NAME") || "Operative";

  const [openMenus, setOpenMenus] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const active = {};
    menu.forEach((m) => {
      if (m.basePath && location.pathname.startsWith(m.basePath)) {
        active[m.title] = true;
      }
    });
    setOpenMenus(active);
  }, [location.pathname]);

  const sidebarContent = (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        color: "white",
        display: "flex",
        flexDirection: "column",
        background: "rgba(2, 6, 23, 0.7)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(0, 234, 255, 0.08)",
      }}
    >
      {/* HUD HEADER */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          mb: 1
        }}
      >
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: "rgba(0, 234, 255, 0.05)",
            color: "#00eaff",
            fontWeight: 900,
            border: "1px solid rgba(0, 234, 255, 0.3)",
            boxShadow: "0 0 15px rgba(0, 234, 255, 0.2)"
          }}
        >
          {userName[0]}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={900} sx={{ letterSpacing: "0.02em", color: "white" }}>{userName}</Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
            <Typography variant="caption" sx={{ color: "#00eaff", opacity: 0.8, fontWeight: 800, letterSpacing: "1px", fontSize: 9 }}>SUPER ADMIN · ACTIVE</Typography>
          </Stack>
        </Box>
      </Box>

      {/* COMMAND MENU */}
      <Box sx={{ flex: 1, overflowY: "auto", py: 2, px: 2, 
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 10 }
      }}>
        <List component="nav" disablePadding>
          {menu.map((item) =>
            item.single ? (
              <ListItemButton
                key={item.title}
                component={NavLink}
                to={item.path}
                end
                sx={sidebarItemStyle}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title.toUpperCase()} primaryTypographyProps={{ fontSize: 11, fontWeight: 900, letterSpacing: 1 }} />
              </ListItemButton>
            ) : (
              <Box key={item.title} sx={{ mb: 0.5 }}>
                <ListItemButton
                  sx={sidebarItemStyle}
                  onClick={() =>
                    setOpenMenus((p) => ({ ...p, [item.title]: !p[item.title] }))
                  }
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title.toUpperCase()} primaryTypographyProps={{ fontSize: 11, fontWeight: 900, letterSpacing: 1 }} />
                  <ExpandMoreIcon
                    sx={{
                      fontSize: 14,
                      opacity: 0.5,
                      transform: openMenus[item.title] ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s"
                    }}
                  />
                </ListItemButton>

                <Collapse in={openMenus[item.title]} timeout={300}>
                  <List component="div" disablePadding sx={{ position: "relative", ml: 3.5, mt: 0.5, mb: 1.5, borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                    {item.children.map((sub) => (
                      <ListItemButton
                        key={sub.title}
                        component={NavLink}
                        to={sub.path}
                        sx={sidebarChildStyle}
                      >
                        <ListItemText primary={sub.title} primaryTypographyProps={{ fontSize: 12, fontWeight: 600 }} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            )
          )}
        </List>
      </Box>

      {/* FOOTER SYSTEM STATUS */}
      <Box sx={{ p: 2, mt: 'auto', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
         <Stack direction="row" spacing={1} alignItems="center">
            <BoltTwoToneIcon sx={{ fontSize: 14, color: '#f59e0b' }} />
            <Typography variant="caption" sx={{ fontSize: 9, fontWeight: 900, opacity: 0.4, letterSpacing: 1, color: 'white' }}>
               SYSTEM INTEGRITY: OPTIMAL
            </Typography>
         </Stack>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton onClick={() => setMobileOpen(true)} sx={{ m: 1, color: '#00eaff' }}>
          <MenuIcon />
        </IconButton>
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { bgcolor: "transparent" } }}
        >
          {sidebarContent}
        </Drawer>
      </>
    );
  }

  return sidebarContent;
}

const sidebarItemStyle = {
  py: 1.2,
  px: 2,
  borderRadius: "12px",
  color: "rgba(255,255,255,0.4)",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    bgcolor: "rgba(255,255,255,0.03)",
    color: "white",
  },
  "&.active": {
    bgcolor: "rgba(0, 234, 255, 0.06)",
    color: "#00eaff !important",
    border: "1px solid rgba(0, 234, 255, 0.1)",
    "& .MuiListItemIcon-root": { color: "#00eaff" },
    "& .MuiTypography-root": { fontWeight: 900, letterSpacing: 1.5 }
  },
};

const sidebarChildStyle = {
  py: 0.8,
  ml: 2,
  borderRadius: "8px",
  color: "rgba(255,255,255,0.3)",
  transition: "all 0.2s",
  "&:hover": {
    color: "white",
    bgcolor: "rgba(255,255,255,0.02)",
  },
  "&.active": {
    color: "#00eaff",
    bgcolor: "rgba(0, 234, 255, 0.03)",
    "&::before": {
       content: '""',
       position: 'absolute',
       left: -16,
       width: 4,
       height: 4,
       borderRadius: '50%',
       bgcolor: '#00eaff',
       boxShadow: '0 0 5px #00eaff'
    }
  },
};
