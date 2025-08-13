import React from "react";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  isRange?: boolean; // true for [min, max] range
  unit?: string; // optional display unit like "$", "%"
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  isRange = false,
  unit = "",
}) => {

  const handleChangeRange = (index: 0 | 1, val: number) => {
    if (Array.isArray(value)) {
      const newVal: [number, number] = [...value] as [number, number];
      newVal[index] = val;
      onChange(newVal);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{ fontWeight: "bold", display: "block", marginBottom: "0.5rem" }}
      >
        {label}:{" "}
        {isRange && Array.isArray(value)
          ? `${value[0]}${unit} - ${value[1]}${unit}`
          : `${value}${unit}`}
      </label>

      {
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={(e) => handleChangeRange(0, Number(e.target.value))}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={(e) => handleChangeRange(1, Number(e.target.value))}
          />
        </div>
      }
    </div>
  );
};

export default RangeSlider;
