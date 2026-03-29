import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Divider,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPublicBlogPostBySlug } from "../../api/cms";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Meta from "../../components/global/Meta";

export default function BlogPostView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPublicBlogPostBySlug(slug);
        setPost(data);
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
      <Box sx={{ display: "flex", justifyContent: "center", py: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Post Not Found</Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/blog")}>Back to Blog</Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8, bgcolor: "#0f172a", color: "white", minHeight: "100vh" }}>
      <Meta 
        title={post.title} 
        description={post.content ? post.content.replace(/<[^>]*>?/gm, "").substring(0, 160) : ""}
        image={post.thumbnail}
        url={`https://pahrikyns.com/blog/${post.slug}`}
      />
      <Container maxWidth="md">
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate("/blog")}
          sx={{ mb: 4, color: "rgba(255,255,255,0.6)" }}
        >
          Back to Articles
        </Button>

        <Typography variant="h3" fontWeight={900} gutterBottom>
          {post.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 4, opacity: 0.6 }}>
          <Typography variant="body2">By {post.author}</Typography>
          <Typography variant="body2">•</Typography>
          <Typography variant="body2">{new Date(post.createdAt).toLocaleDateString()}</Typography>
        </Box>

        {post.thumbnail && (
          <Box 
            component="img" 
            src={post.thumbnail} 
            sx={{ width: "100%", borderRadius: 4, mb: 6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          />
        )}

        <Divider sx={{ mb: 6, borderColor: "rgba(255,255,255,0.1)" }} />

        <Box 
          sx={{ 
            fontSize: "1.1rem", 
            lineHeight: 1.8,
            opacity: 0.9,
            "& p": { mb: 3 },
            "& h2": { mt: 6, mb: 3, fontWeight: 800 },
            "& img": { maxWidth: "100%", borderRadius: 2, my: 4 }
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Container>
    </Box>
  );
}
