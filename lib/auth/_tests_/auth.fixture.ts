import { StateBuilderProvider } from "@/lib/state-builder";

export type AuthFixture = ReturnType<typeof createAuthFixture>;

export const createAuthFixture = (
  testStateBuilderProvider: StateBuilderProvider
) => {
  //   const authGateway = new FakeAuthGateway();
  return {
    givenAuthUserShouldBe({
      phoneNumber,
      id,
      offers = [],
    }: {
      phoneNumber: string;
      id: string;
      offers: string[];
    }) {
      testStateBuilderProvider.setState((stateBuilder) =>
        stateBuilder.withAuthUser({ phoneNumber, id, offers })
      );
    },
  };
};
