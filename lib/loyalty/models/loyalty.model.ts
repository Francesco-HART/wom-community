import { createEntityAdapter } from "@reduxjs/toolkit";

export type Loyalty = {
  id: string;
  ofUser: {
    phoneNumber: string;
    id: string;
  };
  ofCompany: string;
  createAt: string;
  companyLogo: string;
  visits: string[];
  bearings: string[];
};

export const loyaltyAdapter = createEntityAdapter<Loyalty>({});
