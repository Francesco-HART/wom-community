import { GetLoyalty, LoyaltyGateway } from "../models/loyalty.gateway";
import { Loyalty } from "../models/loyalty.model";

export class FakeLoyaltyGateway implements LoyaltyGateway {
  loyalties = new Map<string, GetLoyalty>();

  add(loyalties: Loyalty[]) {
    loyalties.forEach((loyalty) => {
      this.loyalties.set(loyalty.id, {
        id: loyalty.id,
        phoneNumber: loyalty.ofUser.phoneNumber,
        companyId: loyalty.ofCompany,
        createAt: loyalty.createAt,
        companyLogo: loyalty.companyLogo,
      });
    });
  }
  async getAuthLoyalties(phoneNumber: string): Promise<GetLoyalty[]> {
    return Array.from(this.loyalties.values()).filter(
      (loyalty) => loyalty.phoneNumber === phoneNumber
    );
  }
}
