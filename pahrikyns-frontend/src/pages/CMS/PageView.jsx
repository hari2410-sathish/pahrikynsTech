import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Divider
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { fetchPublicWebPageBySlug } from "../../api/cms";
import Meta from "../../components/global/Meta";
import { motion } from "framer-motion";

export default function PageView() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPublicWebPageBySlug(slug);
        setPage(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress size={50} thickness={4} />
      </Box>
    );
  }

  if (!page) {
    return (
      <Container sx={{ py: 20, textAlign: "center" }}>
        <Typography variant="h2" fontWeight={900} color="white">404</Typography>
        <Typography variant="h5" color="rgba(255,255,255,0.5)" mt={2}>Manifestation not found.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 10, position: "relative" }}>
      <Meta 
        title={page.title} 
        description={page.content ? page.content.replace(/<[^>]*>?/gm, "").substring(0, 160) : ""}
        url={`https://pahrikyns.com/p/${page.slug}`}
      />

      <Container maxWidth="md">
        {/* BREADCRUMBS */}
        <Breadcrumbs sx={{ mb: 4, color: "rgba(255,255,255,0.4)" }}>
          <MuiLink component={Link} to="/" underline="hover" color="inherit">Home</MuiLink>
          <Typography color="white" fontWeight={700}>{page.title}</Typography>
        </Breadcrumbs>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper 
            sx={{ 
              p: { xs: 4, md: 8 }, 
              borderRadius: 6, 
              background: "rgba(255,255,255,0.03)", 
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              transition: "0.3s"
            }}
          >
            <Typography variant="h2" fontWeight={900} gutterBottom sx={{ 
              mb: 6, 
              lineHeight: 1.2,
              background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>
              {page.title}
            </Typography>

            <Divider sx={{ mb: 6, borderColor: "rgba(255,255,255,0.05)" }} />

            <Box 
              sx={{ 
                fontSize: "1.15rem", 
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.8,
                "& p": { mb: 4 },
                "& h2": { mt: 8, mb: 4, fontWeight: 900, color: "white", fontSize: "2rem" },
                "& h3": { mt: 6, mb: 3, fontWeight: 800, color: "#00eaff" },
                "& ul": { mb: 4, pl: 4, "& li": { mb: 1.5 } },
                "& strong": { color: "white" }
              }}
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
