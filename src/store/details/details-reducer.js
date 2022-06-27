import { SET_COUNTRY, SET_ERROR, SET_LOADING } from "./details-actions";

const initialState = {
  currentCountry: "",
  status: "idle", // loading | received | rejected
  error: null,
};

export const detailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COUNTRY:
      return {
        ...state,
        status: "received",
        currentCountry: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        error: null,
        status: "loading",
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
        status: "rejected",
      };
    default:
      return state;
  }
};
