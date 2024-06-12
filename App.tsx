import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { AppProvider } from "./app/Provider";
import { createStore, createTestStore } from "@/lib/create-store";
import { createNavigator } from "./app/navigations/router";
import { stateBuilder } from "./lib/state-builder";
import { FakeLoyaltyGateway } from "./lib/loyalty/infra/fake-loyalty.gateway";
import { loyaltyBuilder } from "./lib/loyalty/_test_/loyalty.builder";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({});
  const state = stateBuilder()
    .withLoyaltyCards([
      loyaltyBuilder({
        id: "1",
        ofUser: {
          phoneNumber: "0101010101",
        },
        ofCompany: "Birdy",
        createAt: "2023-05-16T12:06:00.000Z",
        companyLogo: "https://picsum.photos/200?random=pierre",
      }),
    ])
    .withAuthUser({
      phoneNumber: "0101010101",
    })
    .build();

  const router = createNavigator();
  const store = createTestStore(
    {
      loyaltyGateway: new FakeLoyaltyGateway(100),
    },
    state
  );

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <AppProvider store={store} router={router} />;
}
