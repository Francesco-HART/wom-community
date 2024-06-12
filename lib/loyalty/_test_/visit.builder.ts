import { Visit } from "../models/visit.model";

export const visitBuilder = ({
  id = "",
  loyaltyID = "",
  companyID = "",
  createAt = "",
  depenses = 0,
}: Partial<Visit> = {}): Visit => {
  return {
    id,
    loyaltyID,
    companyID,
    createAt,
    depenses,
  };
};
