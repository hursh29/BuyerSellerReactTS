import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import type { MatchOutcome } from "../redux/matchOutcomeSlice";
import "../../style/AllMatches.css";

const AllMatches: React.FC = () => {
  const matchOutcomes = useSelector(
    (state: RootState) => state.matchOutcomes.matchOutcomes
  );
  const state = useSelector((state: RootState) => state);

  const renderMatchCard = (matchOutcome: MatchOutcome) => {
    const seller = state.sellers.allOnboardedSellers.find(
      (seller) => Number(seller.id) === Number(matchOutcome.sellerId)
    );
    const buyer = state.buyers.allOnboardedBuyers.find(
      (buyer) => Number(buyer.id) === Number(matchOutcome.buyerId)
    );

    return (
      <div className="match-card" key={matchOutcome.id}>
        <div className="match-card-header">
          <span className="match-card-title">Match #{matchOutcome.id}</span>
          <span className={`status-badge ${matchOutcome.status.toLowerCase()}`}>
            {matchOutcome.status}
          </span>
        </div>

        <div className="match-details">
          <div className="detail-card">
            <h4>Buyer</h4>
            <p>
              <strong>ID:</strong> {buyer?.id}
            </p>
            <p>
              <strong>Name:</strong> {buyer?.name}
            </p>
            <p>
              <strong>Location:</strong> {buyer?.location}
            </p>
          </div>

          <div className="detail-card">
            <h4>Seller</h4>
            <p>
              <strong>ID:</strong> {seller?.id}
            </p>
            <p>
              <strong>Name:</strong> {seller?.name}
            </p>
            <p>
              <strong>Location:</strong> {seller?.location}
            </p>
          </div>
        </div>

        <Link target="_blank" className="match-card-link" to={`/match-form/${matchOutcome.id}`}>
          View / Continue Form
        </Link>
      </div>
    );
  };

  return (
    <div className="all-matches-container">
      <h2>All Matches</h2>
      {matchOutcomes.length > 0 ? (
        matchOutcomes.map((m) => renderMatchCard(m))
      ) : (
        <p className="no-matches">No matches yet.</p>
      )}
    </div>
  );
};

export default AllMatches;
