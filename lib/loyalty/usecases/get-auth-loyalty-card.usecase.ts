import { selectAuthUser } from "@/lib/auth/reducer";
import { createAsyncAppThunk } from "@/lib/create-app-thunk";
import { createAction } from "@reduxjs/toolkit";

export const authLoyaltyCardsPendings = createAction<{
  authId: string;
}>("loyalties/authloyaltiesPending");

export const getAuthLoyaltyCards = createAsyncAppThunk(
  "loyalty/getAuthLoyaltyCards",
  async (_, { extra: { loyaltyGateway }, dispatch, getState }) => {
    const authUser = selectAuthUser(getState());
    dispatch(
      authLoyaltyCardsPendings({
        authId: authUser.phoneNumber,
      })
    );
    const loyaltiesCards = await loyaltyGateway.getAuthLoyalties(
      authUser.phoneNumber
    );
    return { loyaltyCards: [...loyaltiesCards], authUser: authUser };
  }
);
