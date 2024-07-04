import { Children, ReactElement, createContext, useContext } from "react";
import React from "react";

export type HomeActions = {
  pressLoyaltyCard: (_: string) => void;
};

const HomeContext = createContext<HomeActions>({} as HomeActions);

export const useHomeActions = () => useContext(HomeContext);

export const HomeProviderContext = ({
  pressLoyaltyCard,
  children,
}: HomeActions & { children: ReactElement }) => {
  return (
    <HomeContext.Provider value={{ pressLoyaltyCard }}>
      {children}
    </HomeContext.Provider>
  );
};
