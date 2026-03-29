import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumePreview from "../../pages/Admin/Resume/components/ResumePreview"; // reuse preview
import { Box, CircularProgress } from "@mui/material";
import axios from "../../api/axios";

export default function ResumePublic() {
  const { publicId } = useParams();
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/resumes/public/${publicId}`);
        setDoc(res.data.doc);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [publicId]);

  if (!doc) return <Box sx={{ p: 6, textAlign: "center" }}><CircularProgress /></Box>;

  // Simple wrapper: render appropriate template by passing data
  return (
    <Box sx={{ p: 3 }}>
      {/* reuse template components directly with data props */}
      {/* you might want a special public template with no edit controls */}
      <ResumePreviewWrapper doc={doc} />
    </Box>
  );
}

// small wrapper to render correct template
function ResumePreviewWrapper({ doc }) {
  // import mapping here or decide by doc.template
  const Template = require("../../pages/Admin/Resume/templates/TemplateSimple").default; // example
  return <Template data={doc} />;
}
