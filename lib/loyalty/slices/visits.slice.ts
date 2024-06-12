import { EntityState, createSlice } from "@reduxjs/toolkit";
import { Visit, visitAdapter } from "../models/visit.model";
import { getAuthLoyaltyCards } from "../usecases/get-auth-loyalty-card.usecase";

export type VisitSliceState = EntityState<Visit, "visit">;

export const visitSlice = createSlice({
  name: "visit",
  initialState: visitAdapter.getInitialState({}) as VisitSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthLoyaltyCards.fulfilled, (state, action) => {
      const visits = action.payload.loyaltyCards.flatMap((loyalty) => {
        return loyalty.visits.map((visit) => ({
          id: visit.id,
          loyaltyID: loyalty.id,
          companyID: loyalty.companyId,
          createAt: visit.createAt,
          depenses: visit.depenses,
        }));
      });

      visitAdapter.addMany(state, visits);
    });
  },
});
