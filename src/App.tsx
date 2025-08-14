import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/home/NavBar";
import BuyerOnboarding from "./component/onboarding/BuyerOnboarding";
import SellerOnboarding from "./component/onboarding/SellerOnboarding";
import BuyersList from "./component/listing/BuyersList";
import SellerList from "./component/listing/SellerList";
import SwipeFeed from "./component/matching/SwipeFeed";
import MatchOutcomeFormWrapper from "./component/outcome/MatchOutcomeFormWrapper";
import AllMatches from "./component/outcome/AllMatches";

const App: React.FC = () => (
  <Router>
    <Navbar />
    <div style={{ padding: "1rem" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/buyer-onboarding" />} />
        <Route path="/buyer-onboarding" element={<BuyerOnboarding />} />
        <Route path="/seller-onboarding" element={<SellerOnboarding />} />
        <Route path="/buyers" element={<BuyersList />} />
        <Route path="/sellers" element={<SellerList />} />
        <Route path="/feed" element={<SwipeFeed />} />
        <Route path="/all-matches" element={<AllMatches />} />
        <Route path="/match-form/:matchId" element={<MatchOutcomeFormWrapper />} />
      </Routes>
    </div>
  </Router>
);

export default App;
