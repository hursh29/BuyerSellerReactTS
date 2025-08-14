// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";

import buyersReducer from "./buyerSlice";
import sellersReducer from "./sellerSlice";
import matchReducer from "./matchSlice";
import appModeReducer from "./appModeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["buyers", "sellers", "matches", "appMode"], // slices to persist
};

const rootReducer = combineReducers({
  buyers: buyersReducer,
  sellers: sellersReducer,
  matches: matchReducer,
  appMode: appModeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
