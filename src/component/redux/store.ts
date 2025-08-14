// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import buyersReducer from "./buyerSlice";
import sellersReducer from "./sellerSlice";
import matchReducer from "./matchSlice";
import appModeReducer from "./appModeSlice";
import matchOutcomesReducer from "./matchOutcomeSlice";

// Slice-specific configs
const buyersPersistConfig = {
  key: "buyers",
  storage,
};

const sellersPersistConfig = {
  key: "sellers",
  storage,
};

const matchesPersistConfig = {
  key: "matches",
  storage,
};

const appModePersistConfig = {
  key: "appMode",
  storage,
};

const matchOutcomesPersistConfig = {
  key: "matchOutcomes",
  storage,
}

// Combine persisted slices
const rootReducer = combineReducers({
  buyers: persistReducer(buyersPersistConfig, buyersReducer),
  sellers: persistReducer(sellersPersistConfig, sellersReducer),
  matches: persistReducer(matchesPersistConfig, matchReducer),
  appMode: persistReducer(appModePersistConfig, appModeReducer),
  matchOutcomes: persistReducer(matchOutcomesPersistConfig, matchOutcomesReducer, )
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
