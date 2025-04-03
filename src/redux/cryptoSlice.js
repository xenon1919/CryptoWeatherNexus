import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCryptoPrices } from "../utils/api";
import { showNotification } from "../utils/notifications"; // Import notifications

const loadFavorites = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cryptoFavorites")) || [];
  }
  return [];
};

export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
  return await getCryptoPrices();
});

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: [],
    loading: false,
    favorites: loadFavorites(),
    error: null,
  },
  reducers: {
    toggleFavoriteCrypto: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((fav) => fav !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem("cryptoFavorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.loading = false;

        // Check for price fluctuations beyond ±5%
        action.payload.forEach((crypto) => {
          const existingCrypto = state.data.find((c) => c.id === crypto.id);
          if (existingCrypto) {
            const priceChange =
              ((crypto.current_price - existingCrypto.current_price) /
                existingCrypto.current_price) *
              100;
            if (Math.abs(priceChange) >= 5) {
              showNotification(
                `🚀 ${crypto.name} Alert!`,
                `Price changed by ${priceChange.toFixed(2)}%`
              );
            }
          }
        });

        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleFavoriteCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;
