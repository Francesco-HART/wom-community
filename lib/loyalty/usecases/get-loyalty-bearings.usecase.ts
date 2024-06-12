import { createAsyncAppThunk } from "@/lib/create-app-thunk";

export const getLoyaltyBearings = createAsyncAppThunk(
  "loyalty/bearings/getBearings",
  async (
    { loyaltyID }: { loyaltyID: string },
    { extra: { bearingGateway }, dispatch, getState }
  ) => {
    const bearings = await bearingGateway.getBearingsByLoyaltyID(loyaltyID);

    return bearings;
  }
);
