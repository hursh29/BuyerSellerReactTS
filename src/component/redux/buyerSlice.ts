// buyersSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BuyerOnboardingData } from "../../model/BuyerOnboardingData";

interface BuyersState {
  currentBuyer: BuyerOnboardingData;
  allOnboardedBuyers: BuyerOnboardingData[];
}

const initialState: BuyersState = {
  currentBuyer: {
    name: "",
    description: "",
    goals: [],
    industries: [],
    dealSize: 0,
    location: "",
  },
  allOnboardedBuyers: [],
};

const buyersSlice = createSlice({
  name: "buyers",
  initialState,
  reducers: {
    updateCurrentBuyerField: <K extends keyof BuyerOnboardingData>(
      state: any,
      action: PayloadAction<{ field: K; value: BuyerOnboardingData[K] }>
    ) => {
      state.currentBuyer[action.payload.field] = action.payload.value;
    },
    completeOnboarding: (state) => {
      state.allOnboardedBuyers.push({ ...state.currentBuyer });
      state.currentBuyer = initialState.currentBuyer; // reset form
    },
  },
});

export const { updateCurrentBuyerField, completeOnboarding } = buyersSlice.actions;
export default buyersSlice.reducer;
