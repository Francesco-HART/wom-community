import { EntityState, createSlice } from "@reduxjs/toolkit";
import { Offer, offerAdapter } from "../models/offer.model";
import {
  getAuthEventOffers,
  getAuthOffersPending,
} from "../usecases/get-auth-event-offers.usecase";
import { RootState } from "@/lib/create-store";
import { selectAuthUser } from "@/lib/auth/reducer";

export type OfferSliceState = EntityState<Offer, "offer"> & {
  loadingOffersByUser: { [userID: string]: boolean };
};

export const offerSlice = createSlice({
  name: "offers",
  initialState: offerAdapter.getInitialState({
    loadingOffersByUser: {},
  }) as OfferSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthOffersPending, (state, action) => {
      state.loadingOffersByUser[action.payload.authID] = true;
    });
    builder.addCase(getAuthEventOffers.fulfilled, (state, action) => {
      const offers = action.payload.offers;
      offerAdapter.addMany(
        state,
        offers.map((o) => {
          return {
            name: o.name,
            id: o.id,
            image: o.image,
          };
        })
      );
      state.loadingOffersByUser[action.payload.ofUser] = false;
    });
  },
});

export const selectIsUserOffersLoading = (
  state: RootState,
  { userID }: { userID: string }
) => state.loyalty.offers.loadingOffersByUser[userID] ?? false;

export const selectAuthUserOffers = (state: RootState) => {
  const authUser = selectAuthUser(state);
  const authUserOffersIDs = authUser.offers;

  return authUserOffersIDs
    .map((id) =>
      offerAdapter.getSelectors().selectById(state.loyalty.offers, id)
    )
    .filter(Boolean);
};

export const selectIsAuthOffersLoading = (state: RootState) =>
  state.loyalty.offers.loadingOffersByUser[selectAuthUser(state).id] ?? false;
