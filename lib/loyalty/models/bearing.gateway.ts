import { Bearing } from "./bearing.model";

export interface BearingGateway {
  getBearingsByLoyaltyID(loyaltyID: string): Promise<Bearing[]>;
}
