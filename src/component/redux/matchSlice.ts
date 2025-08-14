// store/matchSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SwipeDirection = "accept" | "reject";

interface SwipeRecord {
  targetId: number; // id of the buyer or seller being swiped on
  direction: SwipeDirection;
  timestamp: number;
}

interface MatchState {
  swipesByUser: Record<string, SwipeRecord[]>; // key = currentUserId
}

const initialState: MatchState = {
  swipesByUser: {},
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    swipe: (
      state,
      action: PayloadAction<{
        currentUserId: number;
        targetId: number;
        direction: SwipeDirection;
      }>
    ) => {
      const { currentUserId, targetId, direction } = action.payload;
      if (!state.swipesByUser[currentUserId]) {
        state.swipesByUser[currentUserId] = [];
      }
      console.log("came here", currentUserId, targetId, direction);
      // Prevent duplicate swipes for same target
      const alreadySwiped = state.swipesByUser[currentUserId].some(
        s => s.targetId === targetId
      );
      if (!alreadySwiped) {
        state.swipesByUser[currentUserId].push({
          targetId,
          direction,
          timestamp: Date.now(),
        });
      }
    },
  },
});

export const { swipe } = matchSlice.actions;
export default matchSlice.reducer;
