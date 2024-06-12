import { EntityState, createSlice } from "@reduxjs/toolkit";
import { Bearing, bearingAdapter } from "../models/bearing.model";
import { getLoyaltyBearings } from "../usecases/get-loyalty-bearings.usecase";
import { RootState } from "@/lib/create-store";

type BearingSliceState = EntityState<Bearing, "bearing"> & {
  loadingBearingByLoyalty: { [loyaltyId: string]: boolean };
};

export const bearingSlice = createSlice({
  name: "bearings",
  initialState: bearingAdapter.getInitialState({
    loadingBearingByLoyalty: {},
  }) as BearingSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoyaltyBearings.pending, (state, action) => {
      state.loadingBearingByLoyalty[action.meta.arg.loyaltyID] = true;
    });
    builder.addCase(getLoyaltyBearings.fulfilled, (state, action) => {
      bearingAdapter.addMany(state, action.payload);
      state.loadingBearingByLoyalty[action.meta.arg.loyaltyID] = false;
    });
  },
});

export const selectLoyaltyBearingsLoading = (
  state: RootState,
  loyaltyID: string
) => state.loyalty.bearings.loadingBearingByLoyalty[loyaltyID] ?? false;
