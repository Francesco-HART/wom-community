import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import { RootState, rootReducer } from "./create-store";
import { Loyalty, loyaltyAdapter } from "./loyalty/models/loyalty.model";
import { Visit, visitAdapter } from "./loyalty/models/visit.model";
import { Bearing, bearingAdapter } from "./loyalty/models/bearing.model";

const initialState = rootReducer(undefined, createAction("init")());

const withLoyaltyCards = createAction<Loyalty[]>("loyalty/withLoyaltyCards");

const withAuthUser = createAction<{ phoneNumber: string }>("auth/withAuthUser");
const withLoadingAuthLoyaltyCards = createAction<{ userId: string }>(
  "loyalty/auth/loading"
);
const withNotLoadingAuthLoyaltyCards = createAction<{ userId: string }>(
  "loyalty/notLoadingAuthLoyaltyCards"
);
const withBearings = createAction<Bearing[]>("loyalty/bearings/getBearings");

const withVisits = createAction<Visit[]>("loyalty/withVisits");

const withNotLoadingBearingForLoyalty = createAction<{ loyaltyID: string }>(
  "loyalty/bearings/bearingsNotdLoading"
);

const withLoadingBearingForLoyalty = createAction<{ loyaltyID: string }>(
  "loyalty/bearings/bearingsLoading"
);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(withLoyaltyCards, (state, action) => {
      loyaltyAdapter.upsertMany(state.loyalty.loyalties, action.payload);
    })
    .addCase(withAuthUser, (state, action) => {
      state.auth = action.payload;
    })
    .addCase(withLoadingAuthLoyaltyCards, (state, action) => {
      state.loyalty.loyalties.loadingCardsByUser[action.payload.userId] = true;
    })
    .addCase(withNotLoadingAuthLoyaltyCards, (state, action) => {
      state.loyalty.loyalties.loadingCardsByUser[action.payload.userId] = false;
    })
    .addCase(withVisits, (state, action) => {
      visitAdapter.addMany(state.loyalty.visit, action.payload);
    })
    .addCase(withBearings, (state, action) => {
      bearingAdapter.addMany(state.loyalty.bearings, action.payload);
    })
    .addCase(withNotLoadingBearingForLoyalty, (state, action) => {
      state.loyalty.bearings.loadingBearingByLoyalty[action.payload.loyaltyID] =
        false;
    })
    .addCase(withLoadingBearingForLoyalty, (state, action) => {
      state.loyalty.bearings.loadingBearingByLoyalty[action.payload.loyaltyID] =
        true;
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
    withVisits: reduce(withVisits),
    withBearings: reduce(withBearings),
    withNotLoadingBearingForLoyalty: reduce(withNotLoadingBearingForLoyalty),
    withLoadingBearingForLoyalty: reduce(withLoadingBearingForLoyalty),
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
