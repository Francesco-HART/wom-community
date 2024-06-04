import {
  AuthFixture,
  createAuthFixture,
} from "@/lib/auth/_tests_/auth.fixture";
import { LoyaltyFixture, createLoyaltyFixture } from "./loyalty.fixture";
import { stateBuilderProvider } from "@/lib/state-builder";

describe("test", () => {
  let loyaltyFixture: LoyaltyFixture;
  let authFixture: AuthFixture;

  beforeEach(() => {
    const testStateBuilder = stateBuilderProvider();
    loyaltyFixture = createLoyaltyFixture(testStateBuilder);
    authFixture = createAuthFixture(testStateBuilder);
  });

  it("should return 1", async () => {
    authFixture.givenAuthUserShouldBe({ phoneNumber: "0101010101" });
    loyaltyFixture.givenLoyaltyCardsExists([
      {
        id: "1",
        ofUser: {
          phoneNumber: "0101010101",
        },
        ofCompany: "Birdy",
        createAt: "2023-05-16T12:06:00.000Z",
        companyLogo: "https://picsum.photos/200?random=pierre",
      },
    ]);
    const promiseLoyalty = loyaltyFixture.whenFetchLoyaltyCards();
    loyaltyFixture.thenUserLoyaltyCardsLoading({ name: "0101010101" });
    await promiseLoyalty;
    loyaltyFixture.thenLoyaltiesShouldBe([
      {
        id: "1",
        ofUser: {
          phoneNumber: "0101010101",
        },
        ofCompany: "Birdy",
        createAt: "2023-05-16T12:06:00.000Z",
        companyLogo: "https://picsum.photos/200?random=pierre",
      },
    ]);
  });
});
