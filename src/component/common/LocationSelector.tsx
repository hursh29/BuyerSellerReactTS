// LocationSelector.tsx
import React from "react";

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const locations = ["Any", "North America", "Europe", "Asia", "Australia"];

const LocationSelector: React.FC<LocationSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <h3>Location Preference</h3>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationSelector;
