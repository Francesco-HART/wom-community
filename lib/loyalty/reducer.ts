import { combineReducers } from "@reduxjs/toolkit";
import { loyaltySlice } from "./slices/loyalty.slice";

export const reducer = combineReducers({
  [loyaltySlice.name]: loyaltySlice.reducer,
});
