import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const BuyersList: React.FC = () => {
  const buyers = useSelector((state: RootState) => state.buyers.allOnboardedBuyers);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>All Buyers</h2>
      {buyers.length === 0 ? (
        <p>No buyers onboarded yet.</p>
      ) : (
        buyers.map((buyer, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "6px",
              marginBottom: "0.5rem",
            }}
          >
            <h3>{buyer.name}</h3>
            <p>{buyer.description}</p>
            <p><strong>Goals:</strong> {buyer.goals.join(", ")}</p>
            <p><strong>Industries:</strong> {buyer.industries.join(", ")}</p>
            <p><strong>Deal Size:</strong> ${buyer.dealSize.toLocaleString()}</p>
            <p><strong>Location:</strong> {buyer.location}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BuyersList;
