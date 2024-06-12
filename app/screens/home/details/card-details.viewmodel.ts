import { selectAuthUser } from "@/lib/auth/reducer";
import { RootState } from "@/lib/create-store";
import {
  selectLoyaltyBearings,
  selectLoyaltyBearingsLoading,
} from "@/lib/loyalty/slices/bearing.slice";
import { selectUserLoyaltyCardByCardId } from "@/lib/loyalty/slices/loyalty.slice";

export enum CardDetailsViewModelType {
  UserNoAuth = "UserNoAuth",
  CardDoseNotExist = "CardDoseNotExist",
  CardSuccess = "CardSuccess",
  BearingsLoading = "BearingsLoading",
}

export const useCardDetailsViewModel =
  ({ loyaltyCardID }: { loyaltyCardID: string }) =>
  (state: RootState) => {
    const authUser = selectAuthUser(state);
    const card = selectUserLoyaltyCardByCardId(state, loyaltyCardID);
    const isBearingsLoading = selectLoyaltyBearingsLoading(
      state,
      loyaltyCardID
    );

    if (card) {
      if (isBearingsLoading)
        return {
          type: CardDetailsViewModelType.BearingsLoading,
          loyaltyCard: {
            id: card.id,
            companyName: card.ofCompany,
            createAt: card.createAt,
            companyLogo: card.companyLogo,
          },
        };
      const loyaltyCardBearings = selectLoyaltyBearings(state, loyaltyCardID);
      return {
        type: CardDetailsViewModelType.CardSuccess,
        loyaltyCard: {
          id: card.id,
          companyName: card.ofCompany,
          createAt: card.createAt,
          companyLogo: card.companyLogo,
          bearings: loyaltyCardBearings,
        },
      };
    }

    if (authUser.phoneNumber)
      return {
        type: CardDetailsViewModelType.CardDoseNotExist,
      };

    return {
      type: CardDetailsViewModelType.UserNoAuth,
    };
  };
