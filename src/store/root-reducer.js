import { combineReducers } from "redux";
import { countriesReducer } from "./countries/countries-reducer";
import { controlsReducer } from "./controls/controls-reducer";
import { detailsReducer } from "./details/details-reducer";

export const rootReducer = combineReducers({
  countries: countriesReducer,
  controls: controlsReducer,
  details: detailsReducer,
});
