import { stateBuilder } from "@/lib/state-builder";
import { FakeAuthGateway } from "../infra/fake-auth.gateway";
import { AuthUser } from "../models/auth.model";
import { createStore, createTestStore } from "@/lib/create-store";
import { authenticateWithGoogle } from "../usecases/authenticate-with-google.usecase";

describe("AuthenticatedWithGoogle", () => {
  const fakeAuthGateway = new FakeAuthGateway();
  const store = createTestStore({ authGateway: fakeAuthGateway });

  it("Alice should be autheticated", async () => {
    givenAuthUserShouldBeAuthenticatedWithGoogle({
      id: "1",
      phoneNumber: "1234567890",
    });
    await whenAuthenticatedWithGoogle();
    thenShouldBeAuthenticated({
      phoneNumber: "1234567890",
      id: "1",
    });
  });

  const givenAuthUserShouldBeAuthenticatedWithGoogle = (authUser: AuthUser) => {
    fakeAuthGateway.willSucceedForGoogleAuthForUser = authUser;
  };

  const whenAuthenticatedWithGoogle = async () => {
    await store.dispatch(authenticateWithGoogle());
  };

  const thenShouldBeAuthenticated = (authUser: AuthUser) => {
    const expectedState = stateBuilder()
      .withAuthUser({ phoneNumber: authUser.phoneNumber })
      .build();

    expect(store.getState()).toEqual(expectedState);
  };
});
