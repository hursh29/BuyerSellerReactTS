import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { swipe, type SwipeDirection } from "../redux/matchSlice";
import type { RootState } from "../redux/store";
import SellerCard from "./SellerCard";
import BuyerCard from "./BuyerCard";
import type { Seller } from "../../model/Seller";
import type { Buyer } from "../../model/Buyer";
import "../../style/SwipeFeed.css";
import MatchModal from "./matchModal";
import { createMatch } from "../redux/matchOutcomeSlice";

const selectUnswipedProfiles = (
  state: RootState,
  currentUserId: number,
  role: "buyer" | "seller"
) => {
  const allProfiles =
    role === "buyer"
      ? state.sellers.allOnboardedSellers
      : state.buyers.allOnboardedBuyers;

  const swipedIds =
    state.matches.swipesByUser[currentUserId]?.map((s) => s.targetId) || [];

  return allProfiles.filter((p) => !swipedIds.includes(p.id));
};

const evaluateMatch = (
  state: RootState,
  targetId: number,
  currentUserId: number
): boolean => {
  const swipes = state.matches.swipesByUser[targetId] || [];
  return swipes.some(
    (s) => s.targetId === currentUserId && s.direction === "accept"
  );
};

const SwipeFeed: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.appMode.mode);
  const matchState = useSelector((state: RootState) => state.matches);

  const currentLoggedInUser =
    mode == "buyer"
      ? useSelector(
          (state: RootState) => state.buyers.allOnboardedBuyers?.[0] || null
        )
      : useSelector(
          (state: RootState) => state.sellers.allOnboardedSellers?.[0] || null
        );

  const currentUserId = currentLoggedInUser?.id;
  // If no user → matchmaking cannot be done
  if (!currentLoggedInUser) {
    return (
      <p className="empty-feed">
        ⚠ No current user found. Matchmaking cannot be done.
      </p>
    );
  }

  const profiles = useSelector((state: RootState) =>
    selectUnswipedProfiles(state, currentUserId, mode)
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProfile = useMemo(
    () => profiles[currentIndex] || null,
    [profiles, currentIndex]
  );

  const goNext = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<Buyer | Seller | null>(
    null
  );

  const handleSwipe = (targetId: number, direction: SwipeDirection) => {
    dispatch(swipe({ currentUserId, targetId, direction }));

    const targetHasAccepted = evaluateMatch(
      { matches: matchState } as RootState,
      currentProfile.id,
      currentUserId
    );

    if (targetHasAccepted) {
      setMatchedProfile(currentProfile);
      setShowMatchModal(true);
      dispatch(
        createMatch({
          buyerId: mode === "buyer" ? currentUserId : targetId,
          sellerId: mode == "buyer" ? targetId : currentUserId,
        })
      );

      setTimeout(() => {
        setShowMatchModal(false);
        if (currentIndex < profiles.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 4000);
    }
  };

  useEffect(() => {
    console.log("*********", showMatchModal);
    console.log(currentProfile, profiles[currentIndex]);
  }, [showMatchModal]);

  if (!currentProfile) {
    return <p className="empty-feed">No more profiles left to review!</p>;
  }

  return (
    <div className="swipe-feed">
      {/* ✅ Show current user info */}
      <h3>
        You are: {currentLoggedInUser.name} ({mode})
      </h3>
      <h2>{mode === "seller" ? "Buyer Feed" : "Seller Feed"}</h2>

      <div className="profile-card">
        {mode === "seller" ? (
          <BuyerCard
            buyer={currentProfile as Buyer}
            onAccept={() => handleSwipe(currentProfile.id, "accept")}
            onReject={() => handleSwipe(currentProfile.id, "reject")}
            onViewProfile={() => console.log("View Buyer Profile")}
          />
        ) : (
          <SellerCard
            seller={currentProfile as Seller}
            onAccept={() => handleSwipe(currentProfile.id, "accept")}
            onReject={() => handleSwipe(currentProfile.id, "reject")}
            onViewProfile={() => console.log("View Seller Profile")}
          />
        )}
      </div>

      <div className="nav-buttons">
        <button onClick={goPrev} disabled={currentIndex === 0}>
          ⬅ Prev
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === profiles.length - 1}
        >
          Next ➡
        </button>
      </div>

      <div className="action-buttons">
        <button
          className="reject-btn"
          onClick={() => handleSwipe(currentProfile.id, "reject")}
          // disabled={currentIndex === profiles.length - 1}
        >
          ❌ Reject
        </button>
        <button
          className="accept-btn"
          onClick={() => handleSwipe(currentProfile.id, "accept")}
          // disabled={currentIndex === profiles.length - 1}
        >
          ✅ Accept
        </button>
      </div>
      {showMatchModal && (
        <MatchModal
          profile={matchedProfile}
          onClose={() => setShowMatchModal(false)}
        />
      )}
    </div>
  );
};

export default SwipeFeed;
