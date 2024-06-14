import { selectAuthUser } from "@/lib/auth/reducer";
import { RootState } from "@/lib/create-store";
import { Bearing } from "@/lib/loyalty/models/bearing.model";
import { Offer } from "@/lib/loyalty/models/offer.model";
import {
  selectLoyaltyBearings,
  selectLoyaltyBearingsLoading,
} from "@/lib/loyalty/slices/bearing.slice";
import { selectUserLoyaltyCardByCardId } from "@/lib/loyalty/slices/loyalty.slice";
import {
  selectIsUserOffersLoading,
  selectAuthUserOffers,
} from "@/lib/loyalty/slices/offer.slice";

export enum CardDetailsViewModelType {
  UserNoAuth = "UserNoAuth",
  CardDoseNotExist = "CardDoseNotExist",
  CardSuccess = "CardSuccess",
  BearingsLoading = "BearingsLoading",
  OffersAndBearingsLoading = "OffersAndBearingsLoading",
  OffersLoading = "OffersLoading",
}

export type CardDetailsViewModel =
  | {
      type: CardDetailsViewModelType.UserNoAuth;
    }
  | {
      type: CardDetailsViewModelType.CardDoseNotExist;
    }
  | {
      type: CardDetailsViewModelType.CardSuccess;
      loyaltyCard: {
        id: string;
        companyName: string;
        createAt: string;
        companyLogo: string;
        offers: Offer[];
        bearings: Bearing[];
      };
    }
  | {
      type: CardDetailsViewModelType.BearingsLoading;
      loyaltyCard: {
        id: string;
        companyName: string;
        createAt: string;
        companyLogo: string;
        offers: Offer[];
      };
    }
  | {
      type: CardDetailsViewModelType.OffersAndBearingsLoading;
      loyaltyCard: {
        id: string;
        companyName: string;
        createAt: string;
        companyLogo: string;
      };
    }
  | {
      type: CardDetailsViewModelType.OffersLoading;
      loyaltyCard: {
        id: string;
        companyName: string;
        createAt: string;
        companyLogo: string;
        bearings: Bearing[];
      };
    };

export const useCardDetailsViewModel =
  ({ loyaltyCardID }: { loyaltyCardID: string }) =>
  (state: RootState): CardDetailsViewModel => {
    const authUser = selectAuthUser(state);
    const card = selectUserLoyaltyCardByCardId(state, loyaltyCardID);
    const isBearingsLoading = selectLoyaltyBearingsLoading(
      state,
      loyaltyCardID
    );
    const bearings = selectLoyaltyBearings(state, loyaltyCardID);
    const offers = selectAuthUserOffers(state);
    const isOffersLoading = selectIsUserOffersLoading(state, {
      userID: authUser.id,
    });

    if (!authUser.id) return { type: CardDetailsViewModelType.UserNoAuth };

    if (!card) return { type: CardDetailsViewModelType.CardDoseNotExist };

    if (isBearingsLoading && isOffersLoading)
      return {
        type: CardDetailsViewModelType.OffersAndBearingsLoading,
        loyaltyCard: {
          id: card.id,
          companyName: card.ofCompany,
          createAt: card.createAt,
          companyLogo: card.companyLogo,
        },
      };

    if (isOffersLoading)
      return {
        type: CardDetailsViewModelType.OffersLoading,
        loyaltyCard: {
          id: card.id,
          companyName: card.ofCompany,
          createAt: card.createAt,
          companyLogo: card.companyLogo,
          bearings,
        },
      };

    if (isBearingsLoading)
      return {
        type: CardDetailsViewModelType.BearingsLoading,
        loyaltyCard: {
          id: card.id,
          companyName: card.ofCompany,
          createAt: card.createAt,
          companyLogo: card.companyLogo,
          offers,
        },
      };

    return {
      type: CardDetailsViewModelType.CardSuccess,
      loyaltyCard: {
        id: card.id,
        companyName: card.ofCompany,
        createAt: card.createAt,
        companyLogo: card.companyLogo,
        offers,
        bearings,
      },
    };
  };
