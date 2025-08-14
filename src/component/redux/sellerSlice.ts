
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Seller } from "../../model/Seller";
import { generateRandomInteger } from "../constants/constants";

interface SellerState {
  currentSeller: Seller;
  allOnboardedSellers: Seller[];
}

const initialState: SellerState = {
  currentSeller: {
    id: -1,
    name: "",
    description: "",
    reasonForSelling: "",
    industries: [],
    revenueRange: [0, 0],
    profitMargin: [0, 0],
    employeeCount: 0,
    location: "",
    expectedDealSize: [0, 0],
  },
  allOnboardedSellers: [],
};

const sellersSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    updateCurrentSellerField<K extends keyof Seller>(
      state: { currentSeller: { [x: string]: string | number | string[] | [number, number]; }; },
      action: PayloadAction<{ field: K; value: Seller[K] }>
    ) {
      state.currentSeller[action.payload.field] = action.payload.value;
    },
    completeSellerOnboarding(state) {
      state.currentSeller.id = generateRandomInteger(1, 10000000);
      state.allOnboardedSellers.push({ ...state.currentSeller });
      state.currentSeller = { ...initialState.currentSeller };
    },
  },
});

export const { updateCurrentSellerField, completeSellerOnboarding } = sellersSlice.actions;
export default sellersSlice.reducer;
