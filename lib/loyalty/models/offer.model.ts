import { createEntityAdapter } from "@reduxjs/toolkit";

export type Offer = {
  id: string;
  name: string;
  image: string;
};

export const offerAdapter = createEntityAdapter<Offer>();
