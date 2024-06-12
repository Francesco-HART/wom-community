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
      },
    });
  });
});
