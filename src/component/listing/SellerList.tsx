import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import SellerCard from "../matching/SellerCard";

const SellerList: React.FC = () => {
  const sellers = useSelector(
    (state: RootState) => state.sellers.allOnboardedSellers
  );

  if (!sellers.length) {
    return <p className="no-sellers">🚀 No sellers onboarded yet.</p>;
  }

  return (
    <div className="seller-list-container">
      <div className="seller-grid">
        {sellers.map((seller, idx) => (
          <SellerCard seller={seller} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default SellerList;
