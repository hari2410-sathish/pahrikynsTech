import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchPublicBlogPosts } from "../../api/cms";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPublicBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 10, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography variant="h2" fontWeight={900} gutterBottom sx={{ 
            background: "linear-gradient(to right, #60a5fa, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Our Blog
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.7, maxWidth: 600, mx: "auto" }}>
            Latest insights, news, and guides from the Pahrikyns team.
          </Typography>
        </Box>

        {posts.length === 0 ? (
          <Typography textAlign="center" sx={{ opacity: 0.5 }}>No articles published yet.</Typography>
        ) : (
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card 
                  component={Link} 
                  to={`/blog/${post.slug}`}
                  sx={{ 
                    height: "100%", 
                    display: "flex", 
                    flexDirection: "column",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "0.3s",
                    textDecoration: "none",
                    "&:hover": { transform: "translateY(-10px)", borderColor: "primary.main" }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800"}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={800} gutterBottom color="white">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.6, mb: 3, color: "white" }}>
                      {post.content ? post.content.replace(/<[^>]*>?/gm, "").substring(0, 100) + "..." : ""}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}>
                      <Typography variant="caption" sx={{ opacity: 0.4, color: "white" }}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Typography>
                      <Button endIcon={<ArrowForwardIcon />} size="small" sx={{ fontWeight: 700 }}>
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
