import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  popularGamesUrl,
  upcomingGameUrl,
  newGameUrl,
  searchGameUrl
} from "../../popularGameApi";

async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { error: `Error: ${response.status}` };
    }
    return { response };
  } catch (error) {
    return { error: 'Error fetching data' };
  }
}

export const popularGameFetch = createAsyncThunk(
  "popularGameFetch",
  async (apiKeys, { rejectWithValue }) => {
    try {
      const [result1, result2, result3] = await Promise.all([
        safeFetch(popularGamesUrl()),
        safeFetch(upcomingGameUrl()),
        safeFetch(newGameUrl())
      ]);

      if (result1.error) {
        throw new Error(result1.error);
      }
      if (result2.error) {
        throw new Error(result2.error);
      }
      if (result3.error) {
        throw new Error(result3.error);
      }

      const dataPopu = await result1.response.json();
      const dataUpcoming = await result2.response.json();
      const dataNew = await result3.response.json();

      return { popu: dataPopu, neww: dataNew, up: dataUpcoming };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchGameFetch = createAsyncThunk(
  "searchGameFetch",
  async (game_name) => {
    const result = await safeFetch(searchGameUrl(game_name));
    if (result.error) {
      throw new Error(result.error);
    }
    const data = await result.response.json();
    return data;
  }
);

const initialState = {
  popular: [],
  newGame: [],
  upComing: [],
  search: [],
  isLoading: false,
  error: null,
};

const popularGameSlice = createSlice({
  name: "popularGame",
  initialState,
  reducers: {
    clear: (state, action) => {
      state.search = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(popularGameFetch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(popularGameFetch.fulfilled, (state, action) => {
      const { popu, neww, up } = action.payload;
      state.isLoading = false;
      state.popular = popu.results;
      state.newGame = neww.results;
      state.upComing = up.results;
    });
    builder.addCase(popularGameFetch.rejected, (state, action) => {
      state.error = true 
      state.isLoading = false;
    });
    builder.addCase(searchGameFetch.fulfilled, (state, action) => {
      console.log(action.payload.results);
      state.search = action.payload.results;
    });
  },
});

export const { clear } = popularGameSlice.actions;

export default popularGameSlice.reducer;
