import { StateBuilderProvider } from "@/lib/state-builder";

export type AuthFixture = ReturnType<typeof createAuthFixture>;

export const createAuthFixture = (
  testStateBuilderProvider: StateBuilderProvider
) => {
  //   const authGateway = new FakeAuthGateway();
  return {
    givenAuthUserShouldBe({ phoneNumber }: { phoneNumber: string }) {
      testStateBuilderProvider.setState((stateBuilder) =>
        stateBuilder.withAuthUser({ phoneNumber })
      );
    },
  };
};
