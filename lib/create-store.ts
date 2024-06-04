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

export type Dependencies = {
  loyaltyGateway: LoyaltyGateway;
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
  { loyaltyGateway = new FakeLoyaltyGateway() }: Partial<Dependencies> = {},
  preloadedState?: Partial<RootState>
) => {
  return createStore(
    {
      loyaltyGateway,
    },
    preloadedState
  );
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>;
