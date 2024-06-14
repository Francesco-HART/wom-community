import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "../create-store";
import { authenticateWithGoogle } from "./usecases/authenticate-with-google.usecase";
import { authenticateWithGithub } from "./usecases/authenticate-with-github.usecase";
import { AuthUser } from "./models/auth.model";
import { getAuthEventOffers } from "../loyalty/usecases/get-auth-event-offers.usecase";

export const reducer = createReducer<AuthUser>(
  {
    id: "",
    phoneNumber: "",
    offers: [],
  },
  (builder) => {
    builder.addCase(getAuthEventOffers.fulfilled, (state, action) => {
      state.offers = action.payload.offers.map((o) => o.id);
    });
    builder.addMatcher(
      isAnyOf(
        authenticateWithGoogle.fulfilled,
        authenticateWithGithub.fulfilled
      ),
      (_, action) => action.payload
    );
  }
);

export const selectAuthUser = (state: RootState) => state.auth;
export const selectIsAuthUserAuthenticated = (state: RootState) =>
  state.auth.phoneNumber !== "";
