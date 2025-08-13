// IndustrySelector.tsx
import React from "react";

interface IndustrySelectorProps {
  selectedIndustries: string[];
  onChange: (industries: string[]) => void;
}

const industriesList = ["Technology", "Healthcare", "Retail", "Manufacturing", "Finance"];

const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  selectedIndustries,
  onChange,
}) => {
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      onChange(selectedIndustries.filter((i) => i !== industry));
    } else {
      onChange([...selectedIndustries, industry]);
    }
  };

  return (
    <div>
      <h3>Industry Preference</h3>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {industriesList.map((industry) => (
          <button
            key={industry}
            onClick={() => toggleIndustry(industry)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: selectedIndustries.includes(industry)
                ? "2px solid green"
                : "1px solid gray",
              backgroundColor: selectedIndustries.includes(industry) ? "#E6FFE6" : "white",
            }}
          >
            {industry}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IndustrySelector;
