import { GetLoyalty, LoyaltyGateway } from "../models/loyalty.gateway";

export class FakeLoyaltyGateway implements LoyaltyGateway {
  constructor(private delay: number = 0) {}
  loyalties = new Map<string, GetLoyalty>();

  add(loyalties: GetLoyalty[]) {
    loyalties.forEach((loyalty) => {
      this.loyalties.set(loyalty.id, {
        id: loyalty.id,
        phoneNumber: loyalty.phoneNumber,
        companyId: loyalty.companyId,
        createAt: loyalty.createAt,
        companyLogo: loyalty.companyLogo,
        companyName: loyalty.companyName,
        visits: loyalty.visits,
      });
    });
  }
  async getAuthLoyalties(phoneNumber: string): Promise<GetLoyalty[]> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));
    return Array.from(this.loyalties.values()).filter(
      (loyalty) => loyalty.phoneNumber === phoneNumber
    );
  }
}
