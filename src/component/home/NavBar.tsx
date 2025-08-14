import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { toggleMode } from "../redux/appModeSlice";
import "../../style/NavBar.css"

const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.appMode.mode);

  const handleToggleMode = () => {
  const newMode = mode === "buyer" ? "seller" : "buyer";
  dispatch(toggleMode());

  // Wait until after dispatch for navigation (sync enough for Redux)
  navigate(`/${newMode}-onboarding`);
};

  const navLinks =
    mode === "buyer"
      ? [
          { path: "/buyer-onboarding", label: "Onboarding" },
          { path: "/sellers", label: "Seller List" },
          { path: "/feed", label: "Feed" },
          { path: "/all-matches", label: "All Matches"}
        ]
      : [
          { path: "/seller-onboarding", label: "Onboarding" },
          { path: "/buyers", label: "Buyer List" },
          { path: "/feed", label: "Feed" },
          { path: "/all-matches", label: "All Matches"}
        ];

  const linkClass = (path: string) =>
    `nav-link ${location.pathname === path ? "active" : ""}`;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">BusinessMatch</h2>
      </div>

      <div className="nav-center">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className={linkClass(link.path)}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="nav-right">
        <span className="mode-label">
          Mode: <strong>{mode.toUpperCase()}</strong>
        </span>
        <button className="mode-toggle" onClick={handleToggleMode}>
          Switch to {mode === "buyer" ? "Seller" : "Buyer"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
