import { stateBuilderProvider } from "@/lib/state-builder";
import { loyaltyBuilder } from "./loyalty.builder";
import { LoyaltyFixture, createLoyaltyFixture } from "./loyalty.fixture";

describe("Get Loyalty bearing", () => {
  let fixture: LoyaltyFixture;

  beforeEach(() => {
    let testStateBuilder = stateBuilderProvider();
    fixture = createLoyaltyFixture(testStateBuilder);
  });
  it("Should return loyalty bearings", async () => {
    fixture.givenBearingsExists([
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
    ]);
    fixture.givenLoyaltiesOnStore(
      [fixture.defaultLoyaltyOne],
      fixture.defaultLoyaltyOne.ofUser
    );

    const fetchedBearings = fixture.whenFetchLoyaltyCardBearings({
      loyaltyID: "1",
    });

    fixture.thenLoyaltyCardBearingsLoading({ loyaltyID: "1" });

    await fetchedBearings;

    fixture.thenLoyaltyShouldBe({
      loyalty: fixture.defaultLoyaltyOne,
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
    });
  });
});
