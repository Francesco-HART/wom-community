import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "../create-store";
import { authenticateWithGoogle } from "./usecases/authenticate-with-google.usecase";
import { authenticateWithGithub } from "./usecases/authenticate-with-github.usecase";

export type Auth = {
  phoneNumber: string;
};
export const reducer = createReducer<Auth>(
  {
    phoneNumber: "",
  },
  (builder) => {
    builder.addMatcher(
      isAnyOf(
        authenticateWithGoogle.fulfilled,
        authenticateWithGithub.fulfilled
      ),
      (state, action) => {
        state.phoneNumber = action.payload.phoneNumber;
      }
    );
  }
);

export const selectAuthUser = (state: RootState) => state.auth;
export const selectIsAuthUserAuthenticated = (state: RootState) =>
  state.auth.phoneNumber !== "";
