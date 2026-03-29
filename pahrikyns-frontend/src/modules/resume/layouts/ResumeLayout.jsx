import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import ResumeNavbar from "../components/common/ResumeNavbar";
import { ResumeProvider } from "../context/ResumeContext";
import { DarkModeProvider } from "../context/DarkModeContext";

/** ========================================================
 *  RESUME LAYOUT — PRO VERSION (v1)
 *  Global layout wrapper for Resume Builder system
 *  - Sticky premium navbar
 *  - Max-width container
 *  - Clean padding
 *  ======================================================== */

export default function ResumeLayout() {
  const location = useLocation();
  const isBuilder = location.pathname.includes("/builder");

  return (
    <ResumeProvider>
      <DarkModeProvider>
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#060714", color: "white" }}>
          {/* NAVBAR - Hide on builder if desired, or keep. Let's keep it but maybe transparent? 
              For now keeping existing navbar behavior but ensuring z-index is above content 
          */}
          <Box className="sticky top-0 z-50 shadow-md bg-white dark:bg-gray-800 transition-colors">
            <ResumeNavbar />
          </Box>

          {/* PAGE CONTENT 
              If builder, remove constraints to allow full-screen immersive experience
          */}
          <Box className={`flex-1 w-full ${isBuilder ? 'p-0' : 'max-w-7xl mx-auto px-4 py-6'}`}>
            <Outlet />
          </Box>
        </Box>
      </DarkModeProvider>
    </ResumeProvider>
  );
}
