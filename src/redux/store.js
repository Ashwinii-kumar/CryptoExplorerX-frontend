import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import WatchlistSlice  from "./WatclistSlice";
import RateSlice from "./RateSlice";


export const store=configureStore({
    reducer:{
        user:UserSlice,
        watchlist:WatchlistSlice,
        rate:RateSlice,
    },
    devTools: import.meta.env.MODE !== 'production',
});