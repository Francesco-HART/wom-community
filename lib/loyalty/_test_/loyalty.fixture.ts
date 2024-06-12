import { AppStore, createTestStore } from "@/lib/create-store";
import { StateBuilderProvider, stateBuilder } from "@/lib/state-builder";
import { Loyalty } from "../models/loyalty.model";
import { FakeLoyaltyGateway } from "../infra/fake-loyalty.gateway";
import { getAuthLoyaltyCards } from "../usecases/get-auth-loyalty-card.usecase";
import { selectIsUserCardsLoading } from "../slices/loyalty.slice";
import { selectAuthUser } from "@/lib/auth/reducer";
import { GetLoyalty } from "../models/loyalty.gateway";
import { Visit } from "../models/visit.model";
import { loyaltyBuilder } from "./loyalty.builder";
import { Bearing } from "../models/bearing.model";
import { getLoyaltyBearings } from "../usecases/get-loyalty-bearings.usecase";
import { FakeBearingGateway } from "../infra/fake-bearing.gateway";
import { selectLoyaltyBearingsLoading } from "../slices/bearing.slice";

export type LoyaltyFixture = ReturnType<typeof createLoyaltyFixture>;

export const createLoyaltyFixture = (
  testStateBuilder: StateBuilderProvider
) => {
  const loyaltyGateway = new FakeLoyaltyGateway();
  const bearingGateway = new FakeBearingGateway();

  let store: AppStore;

  return {
    defaultLoyaltyOne: loyaltyBuilder({
      id: "1",
      ofUser: {
        phoneNumber: "0101010101",
      },
      ofCompany: "Birdy",
      createAt: "2023-05-16T12:06:00.000Z",
      companyLogo: "https://picsum.photos/200?random=pierre",
      visits: [],
      bearings: [],
    }),
    givenLoyaltyCardsExists(loyalties: GetLoyalty[]) {
      loyaltyGateway.add(loyalties);
    },
    givenLoyaltiesOnStore(
      loyalties: Loyalty[],
      authUser: { phoneNumber: string }
    ) {
      testStateBuilder.setState((builder) =>
        builder
          .withLoyaltyCards(loyalties)
          .withNotLoadingAuthLoyaltyCards({ userId: authUser.phoneNumber })
      );
    },
    givenBearingsExists(bearings: Bearing[]) {
      bearingGateway.add(bearings);
    },
    async whenFetchLoyaltyCards() {
      store = createTestStore({ loyaltyGateway }, testStateBuilder.getState());
      await store.dispatch(getAuthLoyaltyCards());
    },
    async whenFetchLoyaltyCardBearings({ loyaltyID }: { loyaltyID: string }) {
      store = createTestStore({ bearingGateway }, testStateBuilder.getState());
      await store.dispatch(getLoyaltyBearings({ loyaltyID }));
    },
    thenUserLoyaltyCardsLoading({ name }: { name: string }) {
      const isUserLoyaltyCardsLoadings = selectIsUserCardsLoading(
        store.getState(),
        name
      );
      expect(isUserLoyaltyCardsLoadings).toBe(true);
    },

    thenLoyaltyCardBearingsLoading({ loyaltyID }: { loyaltyID: string }) {
      const isLoyaltyCardBearingsLoadings = selectLoyaltyBearingsLoading(
        store.getState(),
        loyaltyID
      );
      expect(isLoyaltyCardBearingsLoadings).toBe(true);
    },

    thenLoyaltiesShouldBe({
      loyalties,
      visits = [],
      bearings = [],
    }: {
      loyalties: Loyalty[];
      visits?: Visit[];
      bearings?: Bearing[];
    }) {
      const auth = selectAuthUser(store.getState());
      const expectState = stateBuilder(testStateBuilder.getState())
        .withLoyaltyCards(loyalties)
        .withNotLoadingAuthLoyaltyCards({ userId: auth.phoneNumber })
        .withBearings(bearings)
        .withVisits(visits)
        .build();

      expect(expectState).toEqual(store.getState());
    },

    thenLoyaltyShouldBe({
      loyalty,
      bearings,
    }: {
      loyalty: Loyalty;
      bearings: Bearing[];
    }) {
      const expectState = stateBuilder(testStateBuilder.getState())
        .withLoyaltyCards([
          {
            id: loyalty.id,
            ofUser: loyalty.ofUser,
            ofCompany: loyalty.ofCompany,
            createAt: loyalty.createAt,
            companyLogo: loyalty.companyLogo,
            visits: loyalty.visits,
            bearings: bearings.map((b) => b.id),
          },
        ])
        .withBearings(bearings)
        .withNotLoadingBearingForLoyalty({ loyaltyID: loyalty.id })
        .build();

      expect(store.getState()).toEqual(expectState);
    },
  };
};
