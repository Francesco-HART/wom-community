import { Visit } from "./visit.model";

export type GetLoyalty = {
  id: string;
  phoneNumber: string;
  companyId: string;
  createAt: string;
  companyLogo: string;
  companyName: string;
  visits: Visit[];
};

export interface LoyaltyGateway {
  getAuthLoyalties(phoneNumber: string): Promise<GetLoyalty[]>;
}
