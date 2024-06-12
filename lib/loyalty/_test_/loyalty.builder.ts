import { Loyalty } from "../models/loyalty.model";

export const loyaltyBuilder = ({
  id = "",
  ofUser = { phoneNumber: "" },
  ofCompany = "",
  createAt = "",
  companyLogo = "",
  visits = [],
}: Partial<Loyalty> = {}): Loyalty => {
  return {
    id,
    ofUser,
    ofCompany,
    createAt,
    companyLogo,
    visits,
  };
};
