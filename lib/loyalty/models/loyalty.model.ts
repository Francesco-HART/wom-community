import { createEntityAdapter } from "@reduxjs/toolkit";

export type Loyalty = {
  id: string;
  ofUser: {
    phoneNumber: string;
  };
  ofCompany: string;
  createAt: string;
  companyLogo: string;
  visits: string[];
};

export const loyaltyAdapter = createEntityAdapter<Loyalty>({});
