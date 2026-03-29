import React, { useState } from "react";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Rating, IconButton, 
  Chip, Avatar 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const INITIAL_REVIEWS = [
  { id: 1, user: "Arun Kumar", course: "Docker Mastery", rating: 5, comment: "Amazing course, really helped me learn containers!", status: "Approved" },
  { id: 2, user: "Saira Banu", course: "K8s Essentials", rating: 4, comment: "Good content, but needs more practice labs.", status: "Pending" },
  { id: 3, user: "John Doe", course: "Jenkins CI/CD", rating: 5, comment: "The best Jenkins course on the market.", status: "Approved" },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={900} color="white">Course Reviews</Typography>
        <Typography sx={{ opacity: 0.6, color: "white" }}>Monitor and moderate student feedback</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: "rgba(15, 23, 42, 0.6)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.05)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#00eaff", fontWeight: 800 }}>Student</TableCell>
              <TableCell sx={{ color: "#00eaff", fontWeight: 800 }}>Course</TableCell>
              <TableCell sx={{ color: "#00eaff", fontWeight: 800 }}>Rating</TableCell>
              <TableCell sx={{ color: "#00eaff", fontWeight: 800 }}>Comment</TableCell>
              <TableCell sx={{ color: "#00eaff", fontWeight: 800 }}>Status</TableCell>
              <TableCell align="right" sx={{ color: "#00eaff", fontWeight: 800 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((rev) => (
              <TableRow key={rev.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: "#7b3fe4", width: 32, height: 32, fontSize: 14 }}>{rev.user[0]}</Avatar>
                    <Typography color="white" fontWeight={600}>{rev.user}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "white" }}>{rev.course}</TableCell>
                <TableCell>
                  <Rating value={rev.rating} readOnly size="small" />
                </TableCell>
                <TableCell sx={{ color: "rgba(255,255,255,0.7)", maxWidth: 300 }}>
                    "{rev.comment}"
                </TableCell>
                <TableCell>
                  <Chip 
                    label={rev.status} 
                    size="small" 
                    sx={{ 
                        bgcolor: rev.status === "Approved" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)", 
                        color: rev.status === "Approved" ? "#10b981" : "#f59e0b",
                        fontWeight: 800 
                    }} 
                  />
                </TableCell>
                <TableCell align="right">
                    <IconButton size="small" sx={{ color: "#10b981" }}><CheckCircleIcon fontSize="small" /></IconButton>
                    <IconButton size="small" sx={{ color: "#f43f5e" }}><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
