import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    padding: "0.5rem 1rem",
    textDecoration: "none",
    color: location.pathname === path ? "#fff" : "#333",
    background: location.pathname === path ? "#4CAF50" : "transparent",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  });

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        background: "#f4f4f4",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Link to="/buyer-onboarding" style={linkStyle("/buyer-onboarding")}>
        Buyer Onboarding
      </Link>
      <Link to="/seller-onboarding" style={linkStyle("/seller-onboarding")}>
        Seller Onboarding
      </Link>
      <Link to="/buyers" style={linkStyle("/buyers")}>
        Buyer List
      </Link>
      <Link to="/sellers" style={linkStyle("/sellers")}>
        Seller List
      </Link>
    </nav>
  );
};

export default Navbar;
