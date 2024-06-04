import { AppStore, createTestStore } from "@/lib/create-store";
import { StateBuilderProvider, stateBuilder } from "@/lib/state-builder";
import { Loyalty } from "../models/loyalty.model";
import { FakeLoyaltyGateway } from "../infra/fake-loyalty.gateway";
import { getAuthLoyaltyCards } from "../usecases/get-auth-loyalty-card.usecase";
import { selectIsUserCardsLoading } from "../slices/loyalty.slice";
import { selectAuthUser } from "@/lib/auth/reducer";

export type LoyaltyFixture = ReturnType<typeof createLoyaltyFixture>;

export const createLoyaltyFixture = (
  testStateBuilder: StateBuilderProvider
) => {
  const loyaltyGateway = new FakeLoyaltyGateway();

  let store: AppStore;

  return {
    givenLoyaltyCardsExists(loyalties: Loyalty[]) {
      loyaltyGateway.add(loyalties);
    },
    async whenFetchLoyaltyCards() {
      store = createTestStore({ loyaltyGateway }, testStateBuilder.getState());
      await store.dispatch(getAuthLoyaltyCards());
    },
    thenUserLoyaltyCardsLoading({ name }: { name: string }) {
      const isUserLoyaltyCardsLoadings = selectIsUserCardsLoading(
        store.getState(),
        name
      );
      expect(isUserLoyaltyCardsLoadings).toBe(true);
    },
    thenLoyaltiesShouldBe(loyalties: Loyalty[]) {
      const auth = selectAuthUser(store.getState());
      const expectState = stateBuilder(testStateBuilder.getState())
        .withLoyaltyCards(loyalties)
        .withNotLoadingAuthLoyaltyCards({ userId: auth.phoneNumber })
        .build();

      expect(expectState).toEqual(store.getState());
    },
  };
};
