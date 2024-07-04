import {
  AuthFixture,
  createAuthFixture,
} from "@/lib/auth/_tests_/auth.fixture";
import { LoyaltyFixture, createLoyaltyFixture } from "./loyalty.fixture";
import { stateBuilderProvider } from "@/lib/state-builder";
import { loyaltyBuilder } from "./loyalty.builder";
import { visitBuilder } from "./visit.builder";

describe("Get loyalty usecase", () => {
  let loyaltyFixture: LoyaltyFixture;
  let authFixture: AuthFixture;

  beforeEach(() => {
    const testStateBuilder = stateBuilderProvider();
    loyaltyFixture = createLoyaltyFixture(testStateBuilder);
    authFixture = createAuthFixture(testStateBuilder);
  });

  it("should return a loyalty", async () => {
    authFixture.givenAuthUserShouldBe({
      id: "1",
      offers: [],
      phoneNumber: "0101010101",
    });
    loyaltyFixture.givenLoyaltyCardsExists([
      {
        id: "1",
        phoneNumber: "0101010101",
        companyName: "Birdy",
        createAt: "2023-05-16T12:06:00.000Z",
        companyLogo: "https://picsum.photos/200?random=pierre",
        companyId: "1",
        visits: [
          visitBuilder({
            id: "1",
            loyaltyID: "1",
            companyID: "1",
            createAt: "2023-05-16T12:06:00.000Z",
            depenses: 100,
          }),
        ],
      },
    ]);
    const promiseLoyalty = loyaltyFixture.whenFetchLoyaltyCards();
    loyaltyFixture.thenUserLoyaltyCardsLoading({ name: "0101010101" });
    await promiseLoyalty;
    loyaltyFixture.thenLoyaltiesShouldBe({
      loyalties: [
        loyaltyBuilder({
          id: "1",
          ofUser: {
            id: "1",
            phoneNumber: "0101010101",
          },
          ofCompany: "Birdy",
          createAt: "2023-05-16T12:06:00.000Z",
          companyLogo: "https://picsum.photos/200?random=pierre",
          visits: ["1"],
        }),
      ],
      visits: [
        visitBuilder({
          id: "1",
          loyaltyID: "1",
          companyID: "1",
          createAt: "2023-05-16T12:06:00.000Z",
          depenses: 100,
        }),
      ],
    });
  });
});
