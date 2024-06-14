import { stateBuilderProvider } from "@/lib/state-builder";
import { LoyaltyFixture, createLoyaltyFixture } from "./loyalty.fixture";
import {
  AuthFixture,
  createAuthFixture,
} from "@/lib/auth/_tests_/auth.fixture";

describe("Get event offers", () => {
  let fixture: LoyaltyFixture;
  let authFixture: AuthFixture;

  beforeEach(() => {
    const stateBuilder = stateBuilderProvider();
    authFixture = createAuthFixture(stateBuilder);
    fixture = createLoyaltyFixture(stateBuilder);
  });

  it("Should get event offers", async () => {
    authFixture.givenAuthUserShouldBe({
      id: "1",
      offers: [],
      phoneNumber: "01010101",
    });

    fixture.givenOffersExists(
      [
        {
          id: "1",
          name: "string",
          image: "string",
        },
      ],
      "1"
    );

    const getEventOffersPromise = fixture.whenGetAuthEventOffers();
    fixture.thenAuthOffersLoading({ authID: "1" });

    await getEventOffersPromise;

    fixture.thenOffersShouldBe({
      offers: [
        {
          id: "1",
          name: "string",
          image: "string",
        },
      ],
    });
  });
});
