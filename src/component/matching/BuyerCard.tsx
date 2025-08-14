import React, { useState } from "react";
import type { Buyer } from "../../model/Buyer";


interface BuyerCardProps {
  buyer: Buyer;
  onAccept: () => void;
  onReject: () => void;
  onViewProfile?: () => void;
}

const BuyerCard: React.FC<BuyerCardProps> = ({
  buyer,
  onAccept,
  onReject,
  onViewProfile,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card">
      <h3>{buyer.name}</h3>
      <p>{buyer.description}</p>
      <p>
        <strong>Industry:</strong> {buyer.industries}
      </p>
      <p>
        <strong>Location:</strong> {buyer.location}
      </p>
      <p>
        <strong>Deal Size:</strong> ${buyer.dealSize}
      </p>

      {showDetails && (
        <div className="details">
          <h4>Goals</h4>
          <ul>
            {buyer.goals.map((goal, idx) => (
              <li key={idx}>{goal}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="actions">
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "View Details"}
        </button>
        <button className="accept" onClick={onAccept}>
          ✅ Accept
        </button>
        <button className="reject" onClick={onReject}>
          ❌ Reject
        </button>
      </div>
    </div>
  );
};

export default BuyerCard;
