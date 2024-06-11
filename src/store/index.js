import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./popularGame/slice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
