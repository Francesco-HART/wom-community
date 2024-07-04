import { createStore, createTestStore } from "@/lib/create-store";
import {
  CardDetailsViewModelType,
  useCardDetailsViewModel,
} from "../home/details/card-details.viewmodel";
import { stateBuilder } from "@/lib/state-builder";
import { loyaltyBuilder } from "@/lib/loyalty/_test_/loyalty.builder";

describe("Card details view model state", () => {
  it("Card dose not exist on state", () => {
    const store = createTestStore();

    const cardDetailsViewModel = useCardDetailsViewModel({
      loyaltyCardID: "1",
    })(store.getState());

    expect(cardDetailsViewModel).toEqual({
      type: CardDetailsViewModelType.UserNoAuth,
    });
  });

  it("Cards dose not exist for this auth user", () => {
    const state = stateBuilder()
      .withAuthUser({
        phoneNumber: "0101010101",
        id: "1",
        offers: [],
      })
      .build();
    const store = createTestStore({}, state);

    const cardDetailsViewModel = useCardDetailsViewModel({
      loyaltyCardID: "1",
    })(store.getState());

    expect(cardDetailsViewModel).toEqual({
      type: CardDetailsViewModelType.CardDoseNotExist,
    });
  });

  it("Auth user have card", () => {
    const state = stateBuilder()
      .withAuthUser({
        phoneNumber: "0101010101",
        id: "1",
        offers: ["1"],
      })
      .withLoyaltyCards([
        loyaltyBuilder({
          id: "1",
          ofUser: {
            phoneNumber: "0101010101",
          },
          ofCompany: "Birdy",
          createAt: "2023-05-16T12:06:00.000Z",
          companyLogo: "https://picsum.photos/200?random=pierre",
          bearings: ["1"],
        }),
      ])
      .withOffers([
        {
          name: "fake",
          id: "1",
          image: "https://picsum.photos/200?random=jack",
        },
      ])
      .withBearings([
        {
          id: "1",
          points: 1,
          loyaltyID: "1",
          offers: [
            {
              name: "Tarte tatin",
              image: "https://picsum.photos/200?random=francesco",
            },
          ],
          color: "#FF5733",
        },
      ])
      .build();
    const store = createTestStore({}, state);

    const cardDetailsViewModel = useCardDetailsViewModel({
      loyaltyCardID: "1",
    })(store.getState());

    expect(cardDetailsViewModel).toEqual({
      type: CardDetailsViewModelType.CardSuccess,
      loyaltyCard: {
        id: "1",
        companyName: "Birdy",
        createAt: "2023-05-16T12:06:00.000Z",
        companyLogo: "https://picsum.photos/200?random=pierre",
        offers: [
          {
            name: "fake",
            id: "1",
            image: "https://picsum.photos/200?random=jack",
          },
        ],
        bearings: [
          {
            id: "1",
            points: 1,
            loyaltyID: "1",
            offers: [
              {
                name: "Tarte tatin",
                image: "https://picsum.photos/200?random=francesco",
              },
            ],
            color: "#FF5733",
          },
        ],
      },
    });
  });

  it("Auth loyalty card bearings loading", () => {
    const state = stateBuilder()
      .withAuthUser({
        phoneNumber: "0101010101",
        id: "1",
        offers: ["1"],
      })
      .withOffers([
        {
          name: "fake",
          id: "1",
          image: "https://picsum.photos/200?random=jack",
        },
      ])
      .withLoyaltyCards([
        loyaltyBuilder({
          id: "1",
          ofUser: {
            phoneNumber: "0101010101",
          },
          ofCompany: "Birdy",
          createAt: "2023-05-16T12:06:00.000Z",
          companyLogo: "https://picsum.photos/200?random=paul",
        }),
      ])
      .withLoadingBearingForLoyalty({
        loyaltyID: "1",
      })
      .build();
    const store = createTestStore({}, state);

    const cardDetailsViewModel = useCardDetailsViewModel({
      loyaltyCardID: "1",
    })(store.getState());

    expect(cardDetailsViewModel).toEqual({
      type: CardDetailsViewModelType.BearingsLoading,
      loyaltyCard: {
        id: "1",
        companyName: "Birdy",
        createAt: "2023-05-16T12:06:00.000Z",
        companyLogo: "https://picsum.photos/200?random=paul",
        offers: [
          {
            name: "fake",
            id: "1",
            image: "https://picsum.photos/200?random=jack",
          },
        ],
      },
    });
  });

  it("Offers loading", () => {
    const state = stateBuilder()
      .withAuthUser({
        phoneNumber: "0101010101",
        id: "1",
        offers: [],
      })
      .withLoyaltyCards([
        loyaltyBuilder({
          id: "1",
          ofUser: {
            phoneNumber: "0101010101",
          },
          ofCompany: "Birdy",
          createAt: "2023-05-16T12:06:00.000Z",
          companyLogo: "https://picsum.photos/200?random=pierre",
          bearings: ["1"],
        }),
      ])
      .withLoadingOffersForAuthUser({
        authID: "1",
      })
      .withBearings([
        {
          id: "1",
          points: 1,
          loyaltyID: "1",

          offers: [
            {
              name: "Tarte tatin",
              image: "https://picsum.photos/200?random=francesco",
            },
          ],
          color: "#FF5733",
        },
      ])
      .build();
    const store = createTestStore({}, state);

    const cardDetailsViewModel = useCardDetailsViewModel({
      loyaltyCardID: "1",
    })(store.getState());

    expect(cardDetailsViewModel).toEqual({
      type: CardDetailsViewModelType.OffersLoading,
      loyaltyCard: {
        id: "1",
        companyName: "Birdy",
        createAt: "2023-05-16T12:06:00.000Z",
        companyLogo: "https://picsum.photos/200?random=pierre",
        bearings: [
          {
            id: "1",
            points: 1,
            loyaltyID: "1",
            offers: [
              {
                name: "Tarte tatin",
                image: "https://picsum.photos/200?random=francesco",
              },
            ],
            color: "#FF5733",
          },
        ],
      },
    });
  });

  it("Auth loyalty card bearings and offers load both", () => {
    const state = stateBuilder()
      .withAuthUser({
        phoneNumber: "0101010101",
        id: "1",
        offers: [],
      })
      .withLoyaltyCards([
        loyaltyBuilder({
          id: "1",
          ofUser: {
            phoneNumber: "0101010101",
          },
          ofCompany: "Birdy",
          createAt: "2023-05-16T12:06:00.000Z",
          companyLogo: "https://picsum.photos/200?random=pierre",
        }),
      ])
      .withLoadingOffersForAuthUser({
        authID: "1",
      })
      .withLoadingBearingForLoyalty({
        loyaltyID: "1",
      })
      .build();
    const store = createTestStore({}, state);

    const cardDetailsViewModel = useCardDetailsViewModel({
      loyaltyCardID: "1",
    })(store.getState());

    expect(cardDetailsViewModel).toEqual({
      type: CardDetailsViewModelType.OffersAndBearingsLoading,
      loyaltyCard: {
        id: "1",
        companyName: "Birdy",
        createAt: "2023-05-16T12:06:00.000Z",
        companyLogo: "https://picsum.photos/200?random=pierre",
      },
    });
  });
});
