export type GetLoyalty = {
  id: string;
  phoneNumber: string;
  companyId: string;
  createAt: string;
  companyLogo: string;
};

export interface LoyaltyGateway {
  getAuthLoyalties(phoneNumber: string): Promise<GetLoyalty[]>;
}
