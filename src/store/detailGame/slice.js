import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gameDetailsUrl, gameScreenshotUrl } from "../../popularGameApi";

export const detailGame = createAsyncThunk(
    "detailGame",
    async (id) => {
        const resDetail = await fetch(gameDetailsUrl(id))
        const dataDetail = await resDetail.json()
        const resScreen = await fetch(gameScreenshotUrl(id))
        const dataScreen = await resScreen.json()


        return {dataDetail, dataScreen}
    }
  );

const initialState = {
   details: {platforms: []},
   screen: {results: []},
   isLoading: true,
   error: null,
  };

  const detailGameSlice = createSlice({
    name: "detailGame",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(detailGame.pending, (state, action) => {
        state.isLoading = true
      });
      builder.addCase(detailGame.fulfilled, (state, action) => {
        const {dataDetail, dataScreen} = action.payload
        state.details = dataDetail
        state.screen = dataScreen
        state.isLoading = false;
      
      
      });
      builder.addCase(detailGame.rejected, (state, action) => {
        state.error = true;
        state.isLoading = false;
      });
    },
  });
  
  export default detailGameSlice.reducer;
  