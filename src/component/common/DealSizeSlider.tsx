// DealSizeSlider.tsx
import React from "react";

interface DealSizeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const DealSizeSlider: React.FC<DealSizeSliderProps> = ({ value, onChange }) => {
  return (
    <div>
      <h3>Deal Size Range</h3>
      <input
        type="range"
        min={10000}
        max={1000000}
        step={10000}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
      <p>Selected: ${value.toLocaleString()}</p>
    </div>
  );
};

export default DealSizeSlider;
