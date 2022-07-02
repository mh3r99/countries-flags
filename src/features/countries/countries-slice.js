import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // loading | received | rejected
  error: null,
  list: [],
};

export const loadCountries = createAsyncThunk(
  "@@countries/load-countries",
  async (_, { extra: { client, api } }) => {
    return client.get(api.ALL_COUNTRIES);
  }
);

const countriesSlice = createSlice({
  name: "@@countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state, action) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.error = action.payload || action.meta.error;
        state.status = "rejected";
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.status = "received";
      });
  },
});

export const countriesReducer = countriesSlice.reducer;

// Selectors
export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectAllCountries = (state) => state.countries.list;
export const selectVisibleCountries = (state, { search = "", region = "" }) => {
  return state.countries.list.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) &&
      country.region.includes(region)
  );
};
