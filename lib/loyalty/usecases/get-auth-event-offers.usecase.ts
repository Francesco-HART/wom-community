import { selectAuthUser } from "@/lib/auth/reducer";
import { createAsyncAppThunk } from "@/lib/create-app-thunk";
import { createAction } from "@reduxjs/toolkit";

export const getAuthOffersPending = createAction<{ authID: string }>(
  "auth/offers/getAuthOffersPending"
);

export const getAuthOffersSuccess = createAction<{ authID: string }>(
  "auth/offers/getAuthOffersPending"
);

export const getAuthEventOffers = createAsyncAppThunk(
  "offers/getAuthEventOffers",
  async (_, { extra: { offerGateway }, dispatch, getState }) => {
    const auth = selectAuthUser(getState());
    dispatch(getAuthOffersPending({ authID: auth.id }));
    const offers = await offerGateway.getEventOffersByConsumerID(auth.id);
    dispatch(getAuthOffersSuccess({ authID: auth.id }));
    return { offers, ofUser: auth.id };
  }
);
