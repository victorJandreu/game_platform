import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { popularGamesUrl } from "../../popularGameApi";

export const popularGameFetch = createAsyncThunk(
  "popularGameFetch",
  async () => {
    const res = await fetch(popularGamesUrl());
    return res.json();
  }
);

const initialState = {
  popular: [],
  newGame: [],
  upComing: [],
  isLoading: false,
  error: null,
};

const popularGameSlice = createSlice({
  name: "popularGame",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(popularGameFetch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(popularGameFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.popular = action.payload.results;
    });
    builder.addCase(popularGameFetch.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
    });
  },
});

export default popularGameSlice.reducer;
