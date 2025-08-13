// store.ts
import { configureStore } from "@reduxjs/toolkit";
import buyersReducer from "./buyerSlice";
import sellersReducer from "./sellerSlice";

export const store = configureStore({
  reducer: {
    buyers: buyersReducer,
    sellers: sellersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
