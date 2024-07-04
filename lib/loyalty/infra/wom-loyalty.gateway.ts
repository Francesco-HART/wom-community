import { GetLoyalty, LoyaltyGateway } from "../models/loyalty.gateway";

export class WomLoyaltyGateway implements LoyaltyGateway {
  apiUrl: string;
  constructor() {
    this.apiUrl =
      process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000/api";
  }
  async getAuthLoyalties(phoneNumber: string): Promise<GetLoyalty[]> {
    throw new Error("Impossible de trouver les cartes");
  }
}
