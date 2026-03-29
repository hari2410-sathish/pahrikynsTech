import React from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { getTemplateById } from "../../templates/templateRegistry";
import { useResume } from "../../context/ResumeContext";

/** ========================================================
 * RESUME PREVIEW — PRO VERSION (v2)
 * Loads correct template dynamically with config
 * ======================================================== */

export default function ResumePreview({ readOnly = false }) {
  const { state } = useResume();
  const [params] = useSearchParams();

  // Default template if none selected
  const templateId = params.get("template") || "free-01";

  const template = getTemplateById(templateId);
  const TemplateComponent = template?.component;

  if (!TemplateComponent) {
    return <p className="text-red-600">Template not found.</p>;
  }

  return (
    <Box className="w-full">
      <TemplateComponent readOnly={readOnly} config={template.config} />
    </Box>
  );
}
