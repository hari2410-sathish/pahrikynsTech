import React, { useState } from "react";
import { 
  Box, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton,
  Avatar, Chip, Stack, Tooltip
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

/* ICONS */
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CorporateFareTwoToneIcon from "@mui/icons-material/CorporateFareTwoTone";
import AutoFixHighTwoToneIcon from "@mui/icons-material/AutoFixHighTwoTone";
import AddIcon from "@mui/icons-material/Add";

const INITIAL_BRANDS = [
  { id: 1, name: "Pahrikyns Enterprise", logo: "PE", courses: 12, status: "Active" },
  { id: 2, name: "DevOps Masters", logo: "DM", courses: 5, status: "Active" },
  { id: 3, name: "Cloud Acadamy", logo: "CA", courses: 8, status: "Active" },
];

export default function Brands() {
  const [brands, setBrands] = useState(INITIAL_BRANDS);

  return (
    <Box sx={{ p: 4 }}>
      {/* ================= HEADER ================= */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 6, alignItems: "center" }}>
        <Box>
           <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
             <CorporateFareTwoToneIcon sx={{ color: "#00eaff", fontSize: 28 }} />
             <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: "-0.02em", color: "white" }}>Partner Ecosystem</Typography>
           </Stack>
           <Typography variant="body2" sx={{ opacity: 0.5, fontWeight: 500, color: "white" }}>
             Manage corporate publishing entities and content partnerships.
           </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            bgcolor: "#00eaff", 
            color: "black", 
            fontWeight: 900, 
            borderRadius: 3,
            px: 3,
            py: 1.5,
            boxShadow: "0 0 20px rgba(0, 234, 255, 0.3)",
            "&:hover": { bgcolor: "#67e8f9", boxShadow: "0 0 30px rgba(0, 234, 255, 0.5)" } 
          }}
        >
            ESTABLISH NEW PARTNER
        </Button>
      </Box>

      {/* ================= DATA TABLE ================= */}
      <Paper sx={{ 
        borderRadius: 6, 
        overflow: "hidden", 
        background: "rgba(255,255,255,0.02)", 
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundImage: "none"
      }}>
        <Table>
          <TableHead sx={{ bgcolor: "rgba(255,255,255,0.03)" }}>
            <TableRow>
              <TableCell sx={headerStyle}>PARTNER ENTITY</TableCell>
              <TableCell sx={headerStyle}>CATALOG DEPTH</TableCell>
              <TableCell sx={headerStyle}>STATUS</TableCell>
              <TableCell sx={headerStyle} align="right">ECOSYSTEM ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <AnimatePresence>
              {brands.map((brand, idx) => (
                <TableRow 
                  key={brand.id}
                  component={motion.tr}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  hover
                  sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.03) !important" } }}
                >
                  <TableCell sx={cellStyle}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: "rgba(123, 63, 228, 0.1)", 
                          color: "#a855f7", 
                          fontWeight: 900, 
                          border: "1px solid rgba(123, 63, 228, 0.3)",
                          width: 44,
                          height: 44
                        }}
                      >
                        {brand.logo}
                      </Avatar>
                      <Box>
                         <Typography variant="body2" sx={{ fontWeight: 800, color: "white" }}>{brand.name}</Typography>
                         <Typography variant="caption" sx={{ opacity: 0.4, color: "white" }}>PARTNER-ID: EX-{brand.id}00X</Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell sx={cellStyle}>
                     <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" sx={{ color: "white", fontWeight: 700 }}>{brand.courses} Modules</Typography>
                        <AutoFixHighTwoToneIcon sx={{ fontSize: 14, color: "#00eaff", opacity: 0.5 }} />
                     </Stack>
                  </TableCell>

                  <TableCell sx={cellStyle}>
                    <Chip 
                      label={brand.status.toUpperCase()} 
                      size="small" 
                      sx={{ 
                        bgcolor: "rgba(34, 197, 94, 0.1)", 
                        color: "#22c55e", 
                        fontWeight: 900,
                        fontSize: 9,
                        letterSpacing: 1,
                        border: "1px solid rgba(34, 197, 94, 0.2)"
                      }} 
                    />
                  </TableCell>

                  <TableCell align="right" sx={cellStyle}>
                     <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Tooltip title="Modify Entity">
                           <IconButton size="small" sx={{ color: "#00eaff", bgcolor: "rgba(0, 234, 255, 0.05)" }}>
                             <EditTwoToneIcon fontSize="small" />
                           </IconButton>
                        </Tooltip>
                        <Tooltip title="Dissolve Partnership">
                           <IconButton size="small" sx={{ color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.05)" }}>
                             <DeleteTwoToneIcon fontSize="small" />
                           </IconButton>
                        </Tooltip>
                     </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

const headerStyle = {
  color: "rgba(255,255,255,0.4)",
  fontWeight: 900,
  fontSize: 10,
  letterSpacing: 1.5,
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  py: 3
};

const cellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.03)",
  py: 2.5
};
