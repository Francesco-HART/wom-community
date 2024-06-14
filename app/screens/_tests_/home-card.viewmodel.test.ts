import { createTestStore } from "@/lib/create-store";
import {
  HomeCardsViewModelType,
  useHomeCardsViewModel,
} from "../home/home-cards.viewmodel";
import { stateBuilder } from "@/lib/state-builder";
import en from "javascript-time-ago/locale/en";

const getNow = () => "2023-06-16T12:06:00.000Z";

describe("Home cards screen view model", () => {
  it("There is no card in the store", () => {
    const store = createTestStore();

    const homeViewModel = useHomeCardsViewModel({
      now: getNow(),
      local: en,
      localString: "en",
    })(store.getState());

    expect(homeViewModel).toEqual({
      type: HomeCardsViewModelType.NoLoyaltyCard,
    });
  });

  it("Auth cards loading", () => {
    const initialState = stateBuilder()
      .withAuthUser({
        id: "1",
        offers: [],
        phoneNumber: "01010101",
      })
      .withLoadingAuthLoyaltyCards({
        userId: "01010101",
      })
      .build();

    const store = createTestStore({}, initialState);

    const homeViewModel = useHomeCardsViewModel({
      now: getNow(),
      local: en,
      localString: "en",
    })(store.getState());

    expect(homeViewModel).toEqual({
      type: HomeCardsViewModelType.Loading,
    });
  });

  it("Auth have loyalty cards", () => {
    const initialState = stateBuilder()
      .withLoyaltyCards([
        {
          id: "1",
          ofUser: {
            phoneNumber: "other-user",
          },
          ofCompany: "Birdy",
          createAt: "2023-05-16T12:06:00.000Z",
          companyLogo: "https://picsum.photos/200?random=pierre",
          visits: [],
          bearings: [],
        },
        {
          id: "3",
          ofUser: {
            phoneNumber: "01010101",
          },
          ofCompany: "Birdy",
          createAt: "2023-05-16T12:06:00.000Z",
          companyLogo: "https://picsum.photos/200?random=pierre",
          visits: [],
          bearings: [],
        },
      ])
      .withAuthUser({
        id: "1",
        offers: [],
        phoneNumber: "01010101",
      })
      .withNotLoadingAuthLoyaltyCards({
        userId: "01010101",
      })
      .build();

    const store = createTestStore({}, initialState);

    const homeViewModel = useHomeCardsViewModel({
      now: getNow(),
      local: en,
      localString: "en",
    })(store.getState());

    expect(homeViewModel).toEqual({
      type: HomeCardsViewModelType.Success,
      cards: [
        {
          id: "3",
          companyName: "Birdy",
          createAt: "1 month ago",
          companyLogo: "https://picsum.photos/200?random=pierre",
        },
      ],
    });
  });
});
