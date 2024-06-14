import {
  AnyAction,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { LoyaltyGateway } from "./loyalty/models/loyalty.gateway";
import { reducer as loyaltyReducer } from "./loyalty/reducer";
import { reducer as authReducer } from "./auth/reducer";
import { FakeLoyaltyGateway } from "./loyalty/infra/fake-loyalty.gateway";
import { AuthGateway } from "./auth/models/auth.gateway";
import { FakeAuthGateway } from "./auth/infra/fake-auth.gateway";
import { BearingGateway } from "./loyalty/models/bearing.gateway";
import { FakeBearingGateway } from "./loyalty/infra/fake-bearing.gateway";
import { OfferGateway } from "./loyalty/models/offer.gateway";
import { FakeOfferGateway } from "./loyalty/infra/fake-offer.gateway";

export type Dependencies = {
  loyaltyGateway: LoyaltyGateway;
  authGateway: AuthGateway;
  bearingGateway: BearingGateway;
  offerGateway: OfferGateway;
};

export const rootReducer = combineReducers({
  loyalty: loyaltyReducer,
  auth: authReducer,
});

export const createStore = (
  dependencies: Dependencies,
  preloadedState?: Partial<RootState>
) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
    preloadedState,
  });

  return store;
};

export const createTestStore = (
  {
    loyaltyGateway = new FakeLoyaltyGateway(),
    authGateway = new FakeAuthGateway(),
    bearingGateway = new FakeBearingGateway(),
    offerGateway = new FakeOfferGateway(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<RootState>
) => {
  return createStore(
    {
      loyaltyGateway,
      authGateway,
      bearingGateway,
      offerGateway,
    },
    preloadedState
  );
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
