import React from "react";
import type { Seller } from "../../model/Seller";
import "../../style/SellerList.css";

interface SellerCardProps {
  seller: Seller;
  idx: number;
}

const SellerCard: React.FC<SellerCardProps> = ({ seller, idx }) => {

  return (
    <div key={idx} className="seller-card">
      <div className="seller-header">
        <div className="seller-avatar">{seller.name?.charAt(0) || "S"}</div>
        <div>
          <h3 className="seller-name">{seller.name}</h3>
          <p className="seller-detail">
            <strong>Location:</strong> {seller.location}
          </p>
        </div>
      </div>

      <p className="seller-detail">
        <strong>Industry:</strong> {seller.industries.join(", ")}
      </p>
      <p className="seller-detail">
        <strong>Revenue:</strong> ${seller.revenueRange[0].toLocaleString()} - $
        {seller.revenueRange[1].toLocaleString()}
      </p>
      <p className="seller-detail">
        <strong>Profit Margin:</strong> {seller.profitMargin[0]}% -{" "}
        {seller.profitMargin[1]}%
      </p>
      <p className="seller-detail">
        <strong>Employees:</strong> {seller.employeeCount}
      </p>
      <p className="seller-detail">
        <strong>Expected Deal Size:</strong> $
        {seller.expectedDealSize[0].toLocaleString()} - $
        {seller.expectedDealSize[1].toLocaleString()}
      </p>

      <div className="seller-tags">
        {seller.industries.map((industry, i) => (
          <span key={i} className="tag">
            {industry}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SellerCard;
