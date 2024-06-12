import { createEntityAdapter } from "@reduxjs/toolkit";

export type Visit = {
  id: string;
  loyaltyID: string;
  companyID: string;
  createAt: string;
  depenses: number;
};

export const visitAdapter = createEntityAdapter<Visit>({});
