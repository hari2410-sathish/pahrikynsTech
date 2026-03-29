import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Button, TextField, Rating, 
  Avatar, List, ListItem, ListItemAvatar, ListItemText, 
  Divider, CircularProgress, Alert 
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function ReviewSystem({ courseId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ _avg: { rating: 0 }, _count: { id: 0 } });
  const [myReview, setMyReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/reviews/course/${courseId}`);
      setReviews(res.data.reviews || []);
      setStats(res.data.stats || { _avg: { rating: 0 }, _count: { id: 0 } });
      
      // Check if user has already reviewed
      if (user) {
        const existing = (res.data.reviews || []).find(r => r.userId === user.id);
        if (existing) setMyReview({ rating: existing.rating, comment: existing.comment });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/reviews/post`, {
        courseId,
        rating: myReview.rating,
        comment: myReview.comment
      }, { withCredentials: true });
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CircularProgress size={24} />;

  return (
    <Box sx={{ mt: 6, color: "white" }}>
      <Typography variant="h5" fontWeight={800} mb={3}>Student Reviews</Typography>
      
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Typography variant="h2" fontWeight={900} color="primary">
          {stats._avg?.rating?.toFixed(1) || "0.0"}
        </Typography>
        <Box>
          <Rating value={stats._avg?.rating || 0} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ opacity: 0.6 }}>Based on {stats._count?.id || 0} reviews</Typography>
        </Box>
      </Box>

      {user && (
        <Paper sx={{ p: 3, mb: 6, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", color: "white" }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Write a Review</Typography>
          <Rating 
            value={myReview.rating} 
            onChange={(e, val) => setMyReview({ ...myReview, rating: val })} 
            sx={{ mb: 2 }}
          />
          <TextField 
            fullWidth 
            multiline 
            rows={3} 
            placeholder="Share your experience with this course..."
            value={myReview.comment}
            onChange={(e) => setMyReview({ ...myReview, comment: e.target.value })}
            sx={{ 
              mb: 2,
              "& .MuiOutlinedInput-root": { color: "white", bgcolor: "rgba(0,0,0,0.2)" }
            }}
          />
          {error && <Alert severity="warning" sx={{ mb: 2 }}>{error}</Alert>}
          <Button 
            variant="contained" 
            onClick={handleSubmit} 
            disabled={submitting}
            sx={{ borderRadius: 2, fontWeight: 800 }}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Paper>
      )}

      <List sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {reviews.map((r) => (
          <Box key={r.id}>
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar src={r.user.avatar}>{r.user.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontWeight={700}>{r.user.name}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.5 }}>{new Date(r.createdAt).toLocaleDateString()}</Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Rating value={r.rating} size="small" readOnly sx={{ mb: 1 }} />
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>{r.comment}</Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
          </Box>
        ))}
      </List>
      {reviews.length === 0 && <Typography sx={{ opacity: 0.5 }}>No reviews yet.</Typography>}
    </Box>
  );
}
