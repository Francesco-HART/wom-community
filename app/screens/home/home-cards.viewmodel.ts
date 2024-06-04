import TimeAgo, { LocaleData } from "javascript-time-ago";

import { selectAuthUser } from "@/lib/auth/reducer";
import { RootState } from "@/lib/create-store";
import {
  selectIsUserCardsLoading,
  selectUserLoyaltyCards,
} from "@/lib/loyalty/slices/loyalty.slice";

export enum HomeCardsViewModelType {
  NoLoyaltyCard = "NoLoyaltyCard",
  Loading = "Loading",
  Success = "Success",
}

export const useHomeCardsViewModel =
  ({
    now,
    local,
    localString,
  }: {
    now: string;
    local: LocaleData;
    localString: string;
  }) =>
  (state: RootState) => {
    TimeAgo.addDefaultLocale(local);
    const timeAgo = new TimeAgo(localString);
    const authUser = selectAuthUser(state);
    const isAuthLoyaltyCardsLoading = selectIsUserCardsLoading(
      state,
      authUser.phoneNumber
    );
    const authLoyaltyCards = selectUserLoyaltyCards(
      state,
      authUser.phoneNumber
    );
    if (authLoyaltyCards.length > 0)
      return {
        type: HomeCardsViewModelType.Success,
        cards: authLoyaltyCards.map((card) => {
          return {
            id: card.id,
            companyName: card.ofCompany,
            createAt: timeAgo.format(new Date(card.createAt), "round", {
              now: new Date(now).getTime(),
            }),
            companyLogo: card.companyLogo,
          };
        }),
      };
    return {
      type: isAuthLoyaltyCardsLoading
        ? HomeCardsViewModelType.Loading
        : HomeCardsViewModelType.NoLoyaltyCard,
    };
  };
