import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number[];
  unit?: string;
  onChange: (value: number[]) => void;
}

export default function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  unit = "",
  onChange,
}: RangeSliderProps) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        {label}:
        <Typography
          component="span"
          sx={{ ml: 1, fontWeight: "normal", color: "text.secondary" }}
        >
          {`${value[0]}${unit} - ${value[1]}${unit}`}
        </Typography>
      </Typography>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `${v}${unit}`}
        sx={{
          "& .MuiSlider-thumb": {
            height: 18,
            width: 18,
            backgroundColor: "#22c55e", // Green-500
            border: "2px solid white",
            boxShadow: "0 0 6px rgba(34, 197, 94, 0.5)",
            "&:hover": {
              boxShadow: "0 0 8px rgba(34, 197, 94, 0.7)",
            },
          },
          "& .MuiSlider-track": {
            background: "linear-gradient(to right, #22c55e, #4ade80)", // Green-500 → Green-400
            height: 6,
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#e5e7eb",
            height: 6,
          },
        }}
      />
    </Box>
  );
}
