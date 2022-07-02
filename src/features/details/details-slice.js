import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCountry: null,
  status: "idle", // loading | received | rejected
  error: null,
  neighbors: [],
};

export const loadCountryByName = createAsyncThunk(
  "@@details/load-country-by-name",

  (name, { extra: { client, api } }) => {
    return client.get(api.searchByCountry(name));
  }
);

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = "received";
        state.currentCountry = action.payload.data[0];
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectDetails = (state) => state.details;
export const selectNeighbors = (state) => state.details.neighbors;
