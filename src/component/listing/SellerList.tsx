import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const SellerList: React.FC = () => {
  const sellers = useSelector((state: RootState) => state.sellers.allOnboardedSellers);

  if (!sellers.length) {
    return <p>No sellers onboarded yet.</p>;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
      {sellers.map((seller, idx) => (
        <div
          key={idx}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            background: "#fff",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{seller.businessName}</h3>
          <p><strong>Industry:</strong> {seller.industries.join(", ")}</p>
          <p><strong>Revenue:</strong> ${seller.revenueRange[0].toLocaleString()} - ${seller.revenueRange[1].toLocaleString()}</p>
          <p><strong>Profit Margin:</strong> {seller.profitMargin[0]}% - {seller.profitMargin[1]}%</p>
          <p><strong>Employees:</strong> {seller.employeeCount}</p>
          <p><strong>Location:</strong> {seller.location}</p>
          <p><strong>Expected Deal Size:</strong> ${seller.expectedDealSize[0].toLocaleString()} - ${seller.expectedDealSize[1].toLocaleString()}</p>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <button style={{ padding: "0.5rem 1rem", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px" }}>
              Accept
            </button>
            <button style={{ padding: "0.5rem 1rem", background: "#F44336", color: "#fff", border: "none", borderRadius: "4px" }}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerList;
