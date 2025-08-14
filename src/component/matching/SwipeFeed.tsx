// components/SwipeFeed.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { swipe } from "../redux/matchSlice";
import type { RootState } from "../redux/store";
import SellerCard from "./SellerCard";
import type { Seller } from "../../model/Seller";
import type { Buyer } from "../../model/Buyer";
import BuyerCard from "./BuyerCard";

interface SwipeFeedProps {
  currentUserId: number;
}

const selectUnswipedProfiles = (
  state: RootState,
  currentUserId: number,
  role: "buyer" | "seller"
) => {
  const allProfiles =
    role === "buyer" ? state.sellers.allOnboardedSellers : state.buyers.allOnboardedBuyers;

  const swipedIds =
    state.matches.swipesByUser[currentUserId]?.map(s => s.targetId) || [];

  return allProfiles.filter(p => !swipedIds.includes(p.id));
};


const SwipeFeed: React.FC<SwipeFeedProps> = ({ currentUserId }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.appMode.mode);
  const profiles = useSelector((state: RootState) =>
    selectUnswipedProfiles(state, currentUserId, mode)
  );

  const handleSwipe = (targetId: number, direction: "accept" | "reject") => {
    dispatch(swipe({ currentUserId, targetId, direction }));
  };

  if (profiles.length === 0) {
    return <p>No more profiles left to review!</p>;
  }

  return (
    <div>
      <h2>{mode === "seller" ? "Buyer Feed" : "Seller Feed"}</h2>
      {profiles.map(profile =>
        mode === "seller" ? (
          <BuyerCard
            key={profile.id}
            buyer={profile as Buyer}
            onAccept={() => handleSwipe(profile.id, "accept")}
            onReject={() => handleSwipe(profile.id, "reject")}
            onViewProfile={() => console.log("show modal")}
          />
        ) : (
          <SellerCard
            key={profile.id}
            seller={profile as Seller}
            onAccept={() => handleSwipe(profile.id, "accept")}
            onReject={() => handleSwipe(profile.id, "reject")}
            onViewProfile={() => console.log("show modal")}
          />
        )
      )}
    </div>
  );
};

export default SwipeFeed;
