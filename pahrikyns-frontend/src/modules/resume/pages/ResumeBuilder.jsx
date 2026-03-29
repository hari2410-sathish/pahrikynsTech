import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import ResumeLayout from "../layouts/ResumeLayout";
import ResumeForm from "../components/forms/ResumeForm";
import ResumePreview from "../components/preview/ResumePreview";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import ResumeRestrictionModal from "../components/common/ResumeRestrictionModal";

/** ========================================================
 * RESUME BUILDER — PRO VERSION (v1)
 * The main workspace for building resumes
 * - Layout + Navbar wrapper
 * - Form (left) + Live Preview (right)
 * - True resume.io split-pane builder
 * ======================================================== */

export default function ResumeBuilder() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownload = async () => {
    if (!user) {
      setModalOpen(true);
      return;
    }

    try {
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = document.getElementById("resume-preview");
      if (!element) return alert("Preview not ready");

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (e) {
      console.error(e);
      alert("Download failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#060714 !important", color: "white", position: "relative", overflowX: "hidden" }} className="p-4 lg:p-8">
      {/* Background Gradients (Consistent with Templates Page) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <ResumeRestrictionModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <Box className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto h-[calc(100vh-100px)]">
        {/* LEFT: Form Controller */}
        <Box className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl overflow-y-auto custom-scrollbar">
          <Typography variant="h6" className="font-bold mb-4 text-[#00eaff] flex items-center gap-2">
            ✨ Resume Editor
          </Typography>
          <ResumeForm />
        </Box>

        {/* RIGHT: Live Resume Preview */}
        <Box className="lg:col-span-7 flex flex-col gap-4 h-full">
          {/* TOOLBAR */}
          <Box className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-sm">
            <Typography variant="body2" className="text-gray-400">
              Live Preview
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#00eaff",
                color: "black",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#00c4d6" }
              }}
              onClick={handleDownload}
            >
              Download PDF
            </Button>
          </Box>

          <Box className="bg-[#0a0c16]/50 p-8 rounded-xl shadow-2xl border border-white/10 overflow-auto flex-1 flex justify-center items-start backdrop-blur-sm">
            <Box className="shadow-lg transform scale-[0.85] origin-top lg:scale-100 transition-transform duration-300">
              <ResumePreview />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Nested routes support if needed */}
      <Outlet />
    </Box>
  );
}
