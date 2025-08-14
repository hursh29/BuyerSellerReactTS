import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AppModeState {
  mode: "buyer" | "seller";
}

const initialState: AppModeState = {
  mode: "buyer",
};

const appModeSlice = createSlice({
  name: "appMode",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<"buyer" | "seller">) {
      state.mode = action.payload;
    },
    toggleMode(state) {
      state.mode = state.mode === "buyer" ? "seller" : "buyer";
    },
  },
});

export const { setMode, toggleMode } = appModeSlice.actions;
export default appModeSlice.reducer;
