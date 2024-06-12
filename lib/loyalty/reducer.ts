import { combineReducers } from "@reduxjs/toolkit";
import { loyaltySlice } from "./slices/loyalty.slice";
import { visitSlice } from "./slices/visits.slice";
import { bearingSlice } from "./slices/bearing.slice";

export const reducer = combineReducers({
  [loyaltySlice.name]: loyaltySlice.reducer,
  [visitSlice.name]: visitSlice.reducer,
  [bearingSlice.name]: bearingSlice.reducer,
});
