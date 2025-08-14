import React from "react";
import "../../style/MatchModal.css";

interface MatchModalProps {
  profile: any;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ profile, onClose }) => {
  console.log(profile);
  return (
    <div className="match-modal-overlay" onClick={onClose}>
      <div className="match-modal">
        <h2>🎉 It's a Match!</h2>
        <p>You and {profile.name} liked each other.</p>
      </div>
    </div>
  );
};

export default MatchModal;
