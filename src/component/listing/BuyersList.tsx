import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import BuyerCard from "../matching/BuyerCard";

const BuyersList: React.FC = () => {
  const buyers = useSelector(
    (state: RootState) => state.buyers.allOnboardedBuyers
  );

  if (!buyers.length) {
    return <p className="no-buyers">🤝 No buyers onboarded yet.</p>;
  }

  return (
    <div className="buyers-list-container">
      <div className="buyers-grid">
        {buyers.map((buyer, idx) => (
          <BuyerCard idx={idx} buyer={buyer} />
        ))}
      </div>
    </div>
  );
};

export default BuyersList;
