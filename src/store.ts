import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./features/exampleFeature/slice";

// Change to email store
export const store = configureStore({
  reducer: {
    exampleFeature: exampleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
