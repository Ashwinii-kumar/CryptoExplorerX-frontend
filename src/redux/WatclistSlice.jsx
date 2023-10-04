import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchWatchlistData=createAsyncThunk(
//     "watchlist/fetchWatchlistData",
//     async()=>{
//         try {
//             const options=
//             const response=await FaRegArrowAltCircleRight("",options);
//         } catch (error) {

//         }
//     }
// )

const initialState = {
  coins: [],
};

export const WatchlistSlice = createSlice({
  name: "watchlist",
  initialState: initialState,
  reducers: {
    setWatchlist: (state, action) => {
      state.coins = action.payload;
    },
    addToWatchList: (state, action) => {
      state.coins = [...state.coins, action.payload];
    },
    deleteFromWatchlist: (state, action) => {
      state.coins = state.coins.filter((item) => item._id !== action.payload);
    },
    getWatchlist: (state, action) => {
      state.coins;
    },
  },
});

export const {
  setWatchlist,
  addToWatchList,
  deleteFromWatchlist,
  getWatchlist,
} = WatchlistSlice.actions;

export default WatchlistSlice.reducer;
