import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Buyer } from "../../model/Buyer";

interface BuyersState {
  currentBuyer: Buyer;
  allOnboardedBuyers: Buyer[];
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
    updateCurrentBuyerField: <K extends keyof Buyer>(
      state: any,
      action: PayloadAction<{ field: K; value: Buyer[K] }>
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
