// matchSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { generateRandomInteger } from "../constants/constants";

interface MatchOutcomeDetails {
  quantity: string;
  deliveryTime: string;
  budgetRange: string;
  verificationDoc: string;
  gstin: string;
  logisticsMethod: string;
  pickupPoint: string;
}

export interface MatchOutcome {
  id: number;
  buyerId: number;
  sellerId: number;
  status: "pending_buyer" | "pending_seller" | "completed";
  buyerForm?: MatchOutcomeDetails;
  sellerForm?: MatchOutcomeDetails;
}

interface MatchState {
  matchOutcomes: MatchOutcome[];
}

const initialState: MatchState = {
  matchOutcomes: [],
};

export const matchOutcomes = createSlice({
  name: "matchOutcomes",
  initialState,
  reducers: {
    createMatch: (state, action: PayloadAction<{ buyerId: number; sellerId: number }>) => {
      state.matchOutcomes.push({
        id: generateRandomInteger(1, 2000000),
        buyerId: action.payload.buyerId,
        sellerId: action.payload.sellerId,
        status: "pending_buyer",
      });
    },
    submitBuyerForm: (state, action: PayloadAction<{ matchId: number; data: MatchOutcomeDetails }>) => {
      const match = state.matchOutcomes.find(m => m.id === action.payload.matchId);
      if (match) {
        match.buyerForm = action.payload.data;
        match.status = "pending_seller";
      }
    },
    submitSellerForm: (state, action: PayloadAction<{ matchId: number; data: MatchOutcomeDetails }>) => {
      const match = state.matchOutcomes.find(m => m.id === action.payload.matchId);
      if (match) {
        match.sellerForm = action.payload.data;
        match.status = "completed";
      }
    },
  },
});

export const { createMatch, submitBuyerForm, submitSellerForm } = matchOutcomes.actions;
export default matchOutcomes.reducer;
