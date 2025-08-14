import React from "react";
import type { Buyer } from "../../model/Buyer";
import "../../style/BuyerList.css";

interface BuyerCardProps {
  idx: number
  buyer: Buyer;
}

const BuyerCard: React.FC<BuyerCardProps> = ({
  buyer,
  idx
}) => {
  return (
    <div key={idx} className="buyer-card">
      <div className="buyer-header">
        <div className="buyer-avatar">{buyer.name?.charAt(0) || "B"}</div>
        <div>
          <h3 className="buyer-name">{buyer.name}</h3>
          <p className="buyer-detail">
            <strong>Location:</strong> {buyer.location}
          </p>
        </div>
      </div>

      <p className="buyer-detail">{buyer.description}</p>
      <p className="buyer-detail">
        <strong>Goals:</strong> {buyer.goals.join(", ")}
      </p>
      <p className="buyer-detail">
        <strong>Industries:</strong> {buyer.industries.join(", ")}
      </p>
      <p className="buyer-detail">
        <strong>Deal Size:</strong> ${buyer.dealSize.toLocaleString()}
      </p>

      <div className="buyer-tags">
        {buyer.goals.map((goal, i) => (
          <span key={i} className="tag">
            {goal}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BuyerCard;
