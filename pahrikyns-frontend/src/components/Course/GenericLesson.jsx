import React from "react";
import { Box, Typography, Paper, Divider, Grid, Container, Button } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function GenericLesson({ data }) {
    const { langKey } = useLanguage();
    if (!data) return null;

    const getL = (field) => {
        if (!field) return "";
        if (typeof field === "string") return field;
        return field[langKey] || field["en"] || "";
    };

    const title = getL(data.title);
    const description = getL(data.description);
    const longDescription = getL(data.longDescription);
    const { videoUrl, image, table, codeExample } = data;

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                
                {/* 1. PREMIUM HEADER SECTION */}
                <Box sx={{ mb: 8, textAlign: "left" }}>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, py: 0.8, px: 2, borderRadius: 999, border: "1px solid rgba(0,234,255,0.3)", background: "rgba(0,234,255,0.05)", color: "#00eaff", fontWeight: 800, mb: 3, fontSize: 11, letterSpacing: 2 }}>
                       CORE CONTENT
                    </Box>
                    <Typography variant="h1" sx={{ 
                        fontSize: { xs: '3rem', md: '4.5rem' }, 
                        lineHeight: 1.1, 
                        fontWeight: 900, 
                        letterSpacing: "-0.04em",
                        mb: 2,
                        color: "#fff"
                    }}>
                        {title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.5)", fontWeight: 400, fontSize: { xs: 16, md: 20 }, lineHeight: 1.7, maxWidth: "750px" }}>
                        {description}
                    </Typography>
                </Box>

                {/* 2. THE GLASS PANEL CONTENT */}
                <Box sx={{ 
                    background: "rgba(255, 255, 255, 0.02)", 
                    backdropFilter: "blur(24px)", 
                    border: "1px solid rgba(255, 255, 255, 0.08)", 
                    borderRadius: 8,
                    p: { xs: 4, md: 8 },
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 40px 100px rgba(0,0,0,0.3)"
                }}>
                    {/* Ambient Glow Orb inside the panel */}
                    <Box sx={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, background: "radial-gradient(circle, rgba(0,234,255,0.1) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }} />

                    <Grid container spacing={6} sx={{ position: "relative", zIndex: 1 }}>
                        <Grid item xs={12} lg={videoUrl ? 8 : 12}>
                             <Box sx={{ 
                                "& h2": { color: "#fff", fontWeight: 900, fontSize: "2.4rem", mb: 4, letterSpacing: "-0.03em" },
                                "& h3": { color: "#00eaff", fontWeight: 800, fontSize: "1.6rem", mb: 3, mt: 6, display: "flex", alignItems: "center", gap: 2 },
                                "& h3::before": { content: '""', width: 20, height: 4, background: "linear-gradient(90deg, #00eaff, #7b3fe4)", borderRadius: 10 },
                                "& p": { color: "rgba(255,255,255,0.6)", lineHeight: 2, fontSize: "1.1rem", mb: 4 },
                                "& ul": { listStyle: "none", p: 0, mb: 6 },
                                "& li": { color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", mb: 2, display: "flex", gap: 2, alignItems: "start" },
                                "& li::before": { content: '"➞"', color: "#00eaff", fontWeight: 900 },
                                "& hr": { border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", my: 8 }
                            }}>
                                <Typography component="div">
                                    {longDescription.split('\n').map((line, i) => {
                                        const trimmed = line.trim();
                                        if (trimmed.startsWith('###')) {
                                            return <Typography variant="h3" key={i}>{trimmed.replace('###', '').trim()}</Typography>;
                                        }
                                        if (trimmed.startsWith('####')) {
                                            return <Typography variant="h4" key={i} sx={{ color: "#fff", fontSize: "1.3rem", fontWeight: 800, mt: 4, mb: 1.5 }}>{trimmed.replace('####', '').trim()}</Typography>;
                                        }
                                        if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
                                            return <li key={i}>{trimmed.substring(1).trim()}</li>;
                                        }
                                        if (trimmed === '---') {
                                            return <hr key={i} />;
                                        }
                                        return line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>;
                                    })}
                                </Typography>
                            </Box>
                        </Grid>

                        {/* VIDEO / MEDIA SIDEBAR */}
                        {videoUrl && (
                            <Grid item xs={12} lg={4}>
                                <Box sx={{ position: "sticky", top: 120 }}>
                                    <Box sx={{ 
                                        borderRadius: 6, 
                                        overflow: "hidden", 
                                        border: "1px solid rgba(255, 255, 255, 0.1)", 
                                        background: "#000",
                                        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                                        mb: 4
                                    }}>
                                        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                                            <PlayCircleOutlineIcon sx={{ color: "#00eaff" }} />
                                            <Typography variant="overline" sx={{ fontWeight: 900, fontSize: 10, letterSpacing: 2 }}>WATCH_MODULE</Typography>
                                        </Box>
                                        <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                                            <iframe
                                                src={videoUrl}
                                                title={title}
                                                allowFullScreen
                                                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Small Info Widget */}
                                    <Box sx={{ 
                                        background: "rgba(123, 63, 228, 0.05)", 
                                        borderRadius: 4, 
                                        p: 3, 
                                        border: "1px solid rgba(123, 63, 228, 0.2)"
                                    }}>
                                         <Typography sx={{ color: "#7b3fe4", fontWeight: 900, mb: 1, fontSize: 13, display: 'flex', alignItems: 'center', gap: 1 }}>
                                             <EmojiObjectsIcon fontSize="small" /> QUICK TIP
                                         </Typography>
                                         <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>
                                            Pause the video to try the commands in your local terminal. Hands-on learning is key!
                                         </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                {/* 3. ADDITIONAL MODULES (Table/Code) */}
                <Box sx={{ mt: 10, display: "flex", flexDirection: "column", gap: 10 }}>
                    {table && (
                        <Box>
                            <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, fontSize: "2.5rem", letterSpacing: "-0.02em" }}>Quick Comparison</Typography>
                                <Divider sx={{ flex: 1, borderColor: "rgba(255,255,255,0.08)" }} />
                            </Box>
                            <Paper sx={{ 
                                borderRadius: 6, 
                                background: "rgba(255, 255, 255, 0.01)", 
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                overflow: "hidden"
                            }}>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead style={{ background: "rgba(255, 255, 255, 0.03)" }}>
                                        <tr>
                                            {table.headers.map((h, i) => (
                                                <th key={i} style={{ padding: "24px 30px", textAlign: "left", color: "#00eaff", fontWeight: 800, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h.toUpperCase()}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {table.rows.map((row, r) => (
                                            <tr key={r}>
                                                {row.map((cell, c) => (
                                                    <td key={c} style={{ padding: "20px 30px", borderBottom: "1px solid rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.6)", fontSize: "1.05rem" }}>
                                                        {cell === "Yes" ? <Box component="span" sx={{ color: "#00ffb8", fontWeight: 800 }}>YES</Box> : cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Paper>
                        </Box>
                    )}

                    {codeExample && (
                        <Box>
                            <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
                                <Typography variant="h3" sx={{ fontWeight: 900, fontSize: "2.5rem", letterSpacing: "-0.02em" }}>Practical Implementation</Typography>
                                <Divider sx={{ flex: 1, borderColor: "rgba(255,255,255,0.08)" }} />
                            </Box>
                            <Box sx={{ 
                                borderRadius: 6, 
                                background: "#011627", 
                                border: "1px solid rgba(0, 234, 255, 0.3)",
                                boxShadow: "0 0 40px rgba(0, 234, 255, 0.1)",
                                overflow: "hidden"
                            }}>
                                <Box sx={{ p: 2, px: 3, display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.3)", fontWeight: 900, letterSpacing: 2 }}>
                                        {codeExample.title || "TERMINAL_OUPUT"}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27c93f' }} />
                                    </Box>
                                </Box>
                                <SyntaxHighlighter
                                    language={codeExample.language || "bash"}
                                    style={atomOneDark}
                                    customStyle={{ background: "transparent", padding: "40px", margin: 0, fontSize: "1.1rem" }}
                                >
                                    {codeExample.content.trim()}
                                </SyntaxHighlighter>
                            </Box>
                        </Box>
                    )}
                </Box>

            </motion.div>
        </Container>
    );
}
