import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import cryptoReducer from "./cryptoSlice";
import newsReducer from "./newsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
  },
});
