import { createEntityAdapter } from "@reduxjs/toolkit";

export type Bearing = {
  id: string;
  points: number;
  loyaltyID: string;
  offers: [
    {
      name: string;
      image: string;
    }
  ];
  color: string;
};

export const bearingAdapter = createEntityAdapter<Bearing>({});
