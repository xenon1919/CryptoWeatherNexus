import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather } from "../utils/api";
import { showNotification } from "../utils/notifications"; // Import notifications

const loadFavorites = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("weatherFavorites")) || [];
  }
  return [];
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const data = await getWeather(city);
    return {
      city: data?.location?.name,
      temp: data?.current?.temp_c,
      humidity: data?.current?.humidity,
      condition: data?.current?.condition?.text,
      alert: data?.alerts || null, // Simulated weather alerts
    };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: [],
    status: "idle",
    favorites: loadFavorites(),
    alerts: [],
    error: null,
  },
  reducers: {
    toggleFavoriteWeather: (state, action) => {
      const city = action.payload;
      if (state.favorites.includes(city)) {
        state.favorites = state.favorites.filter((fav) => fav !== city);
      } else {
        state.favorites.push(city);
      }
      localStorage.setItem("weatherFavorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);

        // Show notification if a new weather alert is received
        if (action.payload.alert) {
          showNotification(
            `🌩️ Weather Alert for ${action.payload.city}`,
            action.payload.alert
          );
          state.alerts.push(action.payload.alert);
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch weather data";
      });
  },
});

export const { toggleFavoriteWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
