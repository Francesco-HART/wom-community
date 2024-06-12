import { selectAuthUser } from "@/lib/auth/reducer";
import { RootState } from "@/lib/create-store";
import { selectUserLoyaltyCardByCardId } from "@/lib/loyalty/slices/loyalty.slice";

export enum CardDetailsViewModelType {
  UserNoAuth = "UserNoAuth",
  CardDoseNotExist = "CardDoseNotExist",
  CardSuccess = "CardSuccess",
}

export const useCardDetailsViewModel =
  ({ loyaltyCardID }: { loyaltyCardID: string }) =>
  (state: RootState) => {
    const authUser = selectAuthUser(state);
    const card = selectUserLoyaltyCardByCardId(state, loyaltyCardID);

    if (card)
      return {
        type: CardDetailsViewModelType.CardSuccess,
        loyaltyCard: {
          id: card.id,
          companyName: card.ofCompany,
          createAt: card.createAt,
          companyLogo: card.companyLogo,
        },
      };

    if (authUser.phoneNumber)
      return {
        type: CardDetailsViewModelType.CardDoseNotExist,
      };

    return {
      type: CardDetailsViewModelType.UserNoAuth,
    };
  };
