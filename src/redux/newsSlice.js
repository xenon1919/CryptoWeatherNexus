import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews } from "../utils/api";

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  return await getNews();
});

const newsSlice = createSlice({
  name: "news",
  initialState: { articles: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      });
  },
});

export default newsSlice.reducer;
