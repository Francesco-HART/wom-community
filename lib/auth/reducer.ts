import { createReducer } from "@reduxjs/toolkit";
import { RootState } from "../create-store";

export type Auth = {
  phoneNumber: string;
};
export const reducer = createReducer<Auth>(
  {
    phoneNumber: "",
  },
  (builder) => {}
);

export const selectAuthUser = (state: RootState) => state.auth;
