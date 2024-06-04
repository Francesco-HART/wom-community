import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { RootState, rootReducer } from "./create-store";
import { Loyalty, loyaltyAdapter } from "./loyalty/models/loyalty.model";

const initialState = rootReducer(undefined, createAction("init")());

const withLoyaltyCards = createAction<Loyalty[]>("loyalty/withLoyaltyCards");

const withAuthUser = createAction<{ phoneNumber: string }>("auth/withAuthUser");
const withLoadingAuthLoyaltyCards = createAction<{ userId: string }>(
  "loyalty/auth/loading"
);
const withNotLoadingAuthLoyaltyCards = createAction<{ userId: string }>(
  "loyalty/notLoadingAuthLoyaltyCards"
);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(withLoyaltyCards, (state, action) => {
      loyaltyAdapter.addMany(state.loyalty.loyalties, action.payload);
    })
    .addCase(withAuthUser, (state, action) => {
      state.auth = action.payload;
    })
    .addCase(withLoadingAuthLoyaltyCards, (state, action) => {
      state.loyalty.loyalties.loadingCardsByUser[action.payload.userId] = true;
    })
    .addCase(withNotLoadingAuthLoyaltyCards, (state, action) => {
      state.loyalty.loyalties.loadingCardsByUser[action.payload.userId] = false;
    });
});

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <P>(actionCreator: ActionCreatorWithPayload<P>) =>
    (payload: P) => {
      return stateBuilder(reducer(baseState, actionCreator(payload)));
    };

  return {
    withLoyaltyCards: reduce(withLoyaltyCards),
    withAuthUser: reduce(withAuthUser),
    withLoadingAuthLoyaltyCards: reduce(withLoadingAuthLoyaltyCards),
    withNotLoadingAuthLoyaltyCards: reduce(withNotLoadingAuthLoyaltyCards),
    build(): RootState {
      return baseState;
    },
  };
};

export const stateBuilderProvider = () => {
  let builder = stateBuilder();
  return {
    getState() {
      return builder.build();
    },
    setState(updateFn: (_builder: StateBuilder) => StateBuilder) {
      builder = updateFn(builder);
    },
  };
};

export type StateBuilder = ReturnType<typeof stateBuilder>;
export type StateBuilderProvider = ReturnType<typeof stateBuilderProvider>;
