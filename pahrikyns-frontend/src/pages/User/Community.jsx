// src/pages/User/Community.jsx
import React, { useState } from "react";
import { Box, Typography, Paper, Grid, Card, CardHeader, CardContent, Avatar, TextField, Button, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import { motion } from "framer-motion";

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      content: "Just finished the React Advanced course! Highly recommend it to everyone. 🚀",
      date: "2h ago",
      likes: 12,
      comments: 5,
    },
    {
      id: 2,
      author: "David",
      avatar: "https://i.pravatar.cc/150?u=david",
      content: "Anyone else having trouble with lesson 5? Let's discuss in the common room today.",
      date: "5h ago",
      likes: 8,
      comments: 3,
    },
  ]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 800,
          mb: 4,
          background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Learner Community
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* CREATE POST */}
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: "#6366f1" }}>{user?.name?.[0]?.toUpperCase()}</Avatar>
              <TextField
                placeholder="Share your learning journey..."
                fullWidth
                multiline
                rows={2}
                sx={{ bgcolor: "rgba(255,255,255,0.03)", borderRadius: 2 }}
              />
            </Stack>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" sx={{ borderRadius: 2, px: 4, fontWeight: 700 }}>
                Post
              </Button>
            </Box>
          </Paper>

          {/* POSTS LIST */}
          {posts.map((post) => (
            <motion.div key={post.id} whileHover={{ y: -5 }}>
              <Card
                sx={{
                  mb: 3,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  color: "#fff",
                }}
              >
                <CardHeader
                  avatar={<Avatar src={post.avatar} />}
                  title={<Typography fontWeight={700}>{post.author}</Typography>}
                  subheader={<Typography fontSize={11} sx={{ opacity: 0.5 }}>{post.date}</Typography>}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mb: 3 }}>
                    {post.content}
                  </Typography>
                  <Divider sx={{ opacity: 0.1, mb: 2 }} />
                  <Box sx={{ display: "flex", gap: 3, opacity: 0.7 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
                      <FavoriteIcon fontSize="small" /> <Typography fontSize={13}>{post.likes}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
                      <MessageIcon fontSize="small" /> <Typography fontSize={13}>{post.comments}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
                      <ShareIcon fontSize="small" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Grid>

        {/* SIDEBAR */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              mb: 4,
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#fff" }}>
              Trending Topics
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {["#ReactLearn", "#FullstackDev", "#CareerGoals", "#UIUX", "#JavascriptMastery"].map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "rgba(0,234,255,0.1)", color: "#00eaff", border: "1px solid rgba(0,234,255,0.3)" }} />
              ))}
            </Box>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 4,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#fff" }}>
              Upcoming Meetups
            </Typography>
            <List>
              <ListItem disableGutters>
                <ListItemText
                  primary={<Typography fontWeight={600} fontSize={14}>Weekly Study Session</Typography>}
                  secondary={<Typography fontSize={12} sx={{ opacity: 0.5 }}>Sat, 10:00 AM • Online</Typography>}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function Stack({ children, direction = "row", spacing = 0, sx = {} }) {
  return (
    <Box sx={{ display: "flex", flexDirection: direction, gap: spacing, ...sx }}>
      {children}
    </Box>
  );
}
