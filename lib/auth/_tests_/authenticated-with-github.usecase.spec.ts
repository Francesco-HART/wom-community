import { stateBuilder } from "@/lib/state-builder";
import { FakeAuthGateway } from "../infra/fake-auth.gateway";
import { AuthUser } from "../models/auth.model";
import { createTestStore } from "@/lib/create-store";
import { authenticateWithGithub } from "../usecases/authenticate-with-github.usecase";

describe("AuthenticatedWithGithub", () => {
  const fakeAuthGateway = new FakeAuthGateway();
  const store = createTestStore({ authGateway: fakeAuthGateway });

  it("Alice should be autheticated", async () => {
    givenAuthUserShouldBeAuthenticatedWithGithub({
      id: "1",
      phoneNumber: "1234567890",
      offers: [],
    });
    await whenAuthenticatedWithGithub();
    thenShouldBeAuthenticated({
      phoneNumber: "1234567890",
      id: "1",
      offers: [],
    });
  });

  const givenAuthUserShouldBeAuthenticatedWithGithub = (authUser: AuthUser) => {
    fakeAuthGateway.willSucceedForGithubAuthForUser = authUser;
  };

  const whenAuthenticatedWithGithub = async () => {
    await store.dispatch(authenticateWithGithub());
  };

  const thenShouldBeAuthenticated = (authUser: AuthUser) => {
    const expectedState = stateBuilder()
      .withAuthUser({
        phoneNumber: authUser.phoneNumber,
        id: authUser.id,
        offers: [],
      })
      .build();

    expect(store.getState()).toEqual(expectedState);
  };
});
