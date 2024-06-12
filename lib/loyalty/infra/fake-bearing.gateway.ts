import { BearingGateway } from "../models/bearing.gateway";
import { Bearing } from "../models/bearing.model";

export class FakeBearingGateway implements BearingGateway {
  constructor(private readonly delay = 0) {}

  bearings = new Map<string, Bearing>();

  add(fakeBearings: Bearing[]) {
    fakeBearings.forEach((b) => this.bearings.set(b.id, b));
  }

  getBearingsByLoyaltyID(loyaltyID: string): Promise<Bearing[]> {
    return new Promise((resolve, reject) =>
      resolve(Array.from(this.bearings.values()).filter((b) => b.loyaltyID))
    );
  }
}
