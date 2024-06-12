import { EntityState, createSlice } from "@reduxjs/toolkit";
import { Loyalty, loyaltyAdapter } from "../models/loyalty.model";
import {
  authLoyaltyCardsPendings,
  getAuthLoyaltyCards,
} from "../usecases/get-auth-loyalty-card.usecase";
import { RootState } from "@/lib/create-store";
import { loyaltyBuilder } from "../_test_/loyalty.builder";
import { getLoyaltyBearings } from "../usecases/get-loyalty-bearings.usecase";

export type LoyaltySliceState = EntityState<Loyalty, "loyalty"> & {
  loadingCardsByUser: { [userId: string]: boolean };
};

export const loyaltySlice = createSlice({
  name: "loyalties",
  initialState: loyaltyAdapter.getInitialState({
    loadingCardsByUser: {},
  }) as LoyaltySliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthLoyaltyCards.fulfilled, (state, action) => {
      loyaltyAdapter.addMany(
        state,
        action.payload.loyaltyCards.map((loyalty) =>
          loyaltyBuilder({
            id: loyalty.id,
            ofUser: {
              phoneNumber: loyalty.phoneNumber,
            },
            ofCompany: loyalty.companyName,
            createAt: loyalty.createAt,
            companyLogo: loyalty.companyLogo,
            visits: loyalty.visits.map((visit) => visit.id),
          })
        )
      );

      state.loadingCardsByUser[action.payload.authUser.phoneNumber] = false;
    });
    builder.addCase(authLoyaltyCardsPendings, (state, action) => {
      state.loadingCardsByUser[action.payload.authId] = true;
    });
    builder.addCase(getLoyaltyBearings.fulfilled, (state, action) => {
      const loyaltyID = action.meta.arg.loyaltyID;
      loyaltyAdapter.updateOne(state, {
        id: loyaltyID,
        changes: { bearings: action.payload.map((b) => b.id) },
      });
    });
  },
});

export const selectIsUserCardsLoading = (state: RootState, userId: string) =>
  state.loyalty.loyalties.loadingCardsByUser[userId] ?? false;

export const selectUserLoyaltyCards = (state: RootState, userId: string) =>
  loyaltyAdapter
    .getSelectors()
    .selectAll(state.loyalty.loyalties)
    .filter((loyalty) => loyalty.ofUser.phoneNumber === userId);

export const selectUserLoyaltyCardByCardId = (
  state: RootState,
  cardID: string
) =>
  loyaltyAdapter
    .getSelectors()
    .selectAll(state.loyalty.loyalties)
    .find((loyalty) => loyalty.id === cardID);
