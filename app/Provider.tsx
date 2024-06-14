import { AppStore } from "@/lib/create-store";
import { View, useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { AppNavigator, AppRouter } from "./navigations/router";

export const AppProvider = ({
  store,
  router,
}: {
  store: AppStore;
  router: AppRouter;
}) => {
  return (
    <Provider store={store}>
      <AppNavigator router={router} />
    </Provider>
  );
};
