import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
  CircularProgress
} from "@mui/material";
import API from "../../../api/axios"; // adjust if path is different, fallback to default fetch if it fails but they use axios

export default function ManageToolAccessModal({ open, onClose, student }) {
  const [form, setForm] = useState({
    category: "devops",
    tool: "github",
    planType: "1-month",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!student?.id) return;
    setLoading(true);
    setErrorMsg("");
    
    try {
      // Create or update subscription
      const res = await API.post(`/admin/users/${student.id}/tools`, {
        category: form.category.toLowerCase(),
        tool: form.tool.toLowerCase(),
        planType: form.planType
      });
      
      if (res.data.success) {
        // Assume success, close modal
        onClose();
      } else {
        setErrorMsg(res.data.message || "Failed to assign tool.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred during tool assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(0,255,255,0.3)",
          color: "white",
          minWidth: 450,
          borderRadius: 4,
          boxShadow: "0 0 25px rgba(0,255,255,0.4)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 900, color: "#00eaff", fontSize: "22px" }}>
        Assign Tool Access - {student?.name}
      </DialogTitle>

      <DialogContent>
        {errorMsg && <div style={{ color: "#ff6b6b", marginBottom: 10 }}>{errorMsg}</div>}
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label="Category"
            value={form.category}
            onChange={handleChange("category")}
            fullWidth
            sx={{
              color: "white",
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "#00eaff" },
            }}
          >
            <MenuItem value="devops">DevOps</MenuItem>
            <MenuItem value="aws">AWS</MenuItem>
            <MenuItem value="os">OS</MenuItem>
          </TextField>

          <TextField
            label="Tool Name"
            placeholder="e.g. github, jenkins, ec2, linux"
            value={form.tool}
            onChange={handleChange("tool")}
            fullWidth
            sx={{
              input: { color: "white" },
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "#00eaff" },
            }}
          />

          <TextField
            select
            label="Access Plan"
            value={form.planType}
            onChange={handleChange("planType")}
            fullWidth
            sx={{
              color: "white",
              "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
              "&:hover fieldset": { borderColor: "#00eaff" },
            }}
          >
            <MenuItem value="1-month">1 Month</MenuItem>
            <MenuItem value="3-months">3 Months</MenuItem>
            <MenuItem value="6-months">6 Months</MenuItem>
            <MenuItem value="lifetime">Lifetime</MenuItem>
            <MenuItem value="revoke">🔥 Revoke Access</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} sx={{ color: "#94a3b8" }} disabled={loading}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg,#00eaff,#7b3fe4)",
            color: "#020617",
            px: 3,
            borderRadius: "999px",
            "&:hover": { background: "linear-gradient(90deg,#00b8cc,#5a2bb8)" }
          }}
        >
          {loading ? <CircularProgress size={20} /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
