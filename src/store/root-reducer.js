import { themeReducer } from "./theme/theme-reducer";

const { combineReducers } = require("redux");

export const rootReducer = combineReducers({
  theme: themeReducer,
});
