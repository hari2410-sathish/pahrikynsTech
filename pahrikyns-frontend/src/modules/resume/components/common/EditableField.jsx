import React, { useState, useEffect, useRef } from "react";
import { Typography, TextField } from "@mui/material";

/**
 * EditableField Component
 * Allows inline editing of text.
 * - Displays text by default.
 * - On click, swaps to an input field.
 * - On blur or Enter, saves the value.
 */
export default function EditableField({
    value,
    onChange,
    variant = "body1",
    placeholder = "Click to edit",
    multiline = false,
    className = "",
    style = {},
    sx = {},
    readOnly = false,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value || "");
    const inputRef = useRef(null);

    useEffect(() => {
        setTempValue(value || "");
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleClick = () => {
        if (!readOnly) setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (tempValue !== value) {
            onChange(tempValue);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !multiline) {
            handleBlur();
        }
        if (e.key === "Escape") {
            setTempValue(value);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <TextField
                inputRef={inputRef}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                multiline={multiline}
                variant="standard"
                fullWidth
                autoFocus
                InputProps={{
                    disableUnderline: true,
                    style: {
                        ...style, // Inherit usage styles
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        lineHeight: "inherit",
                        color: "inherit",
                        padding: 0,
                        backgroundColor: "rgba(255,255,255,0.1)", // Slight highlight
                    },
                }}
                sx={{
                    ...sx,
                    "& .MuiInputBase-root": {
                        ...style,
                        fontSize: "inherit",
                    },
                }}
                className={className}
            />
        );
    }

    return (
        <Typography
            variant={variant}
            onClick={handleClick}
            className={`${className} ${!readOnly ? "cursor-pointer hover:bg-white/10 hover:outline hover:outline-1 hover:outline-dashed hover:outline-cyan-400/50 rounded px-1 transition-all" : ""}`}
            style={{ ...style, minWidth: "1em", display: "inline-block" }}
            sx={sx}
        >
            {value || <span className="opacity-50 italic">{placeholder}</span>}
        </Typography>
    );
}
