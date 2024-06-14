import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./popularGame/slice";
import detailGameReducer from "./detailGame/slice"

export const store = configureStore({
  reducer: {
    game: gameReducer,
    detailGame: detailGameReducer
  },
});
