// components/SellerCard.tsx
import React, { useState } from "react";
import type { Seller } from "../../model/Seller";

interface SellerCardProps {
  seller: Seller;
  onAccept?: () => void;
  onReject?: () => void;
  onViewProfile?: () => void;
}

const SellerCard: React.FC<SellerCardProps> = ({
  seller,
  onAccept,
  onReject,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card">
      <h3>{seller.businessName}</h3>
      <p>{seller.description}</p>
      <p>
        <strong>Industry:</strong> {seller.industries}
      </p>
      <p>
        <strong>Location:</strong> {seller.location}
      </p>
      <p>
        <strong>Revenue:</strong> ${seller.revenueRange[0]}M - $
        {seller.revenueRange[1]}M
      </p>

      {showDetails && (
        <div className="details">
          <p>
            <strong>Profit Margin:</strong> {seller.profitMargin}%
          </p>
          <p>
            <strong>Employees:</strong> {seller.employeeCount}
          </p>
          <p>
            <strong>Expected Deal Size:</strong> ${seller.expectedDealSize[0]}M
            - ${seller.expectedDealSize[1]}M
          </p>
        </div>
      )}
    </div>
  );
};

export default SellerCard;
