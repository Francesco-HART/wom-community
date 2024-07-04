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
import { FakeOfferGateway } from "./lib/loyalty/infra/fake-offer.gateway";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({});
  const state = stateBuilder()
    .withAuthUser({
      id: "1",
      offers: [],
      phoneNumber: "0101010101",
    })
    .build();
  const loyaltyGateway = new FakeLoyaltyGateway(500);
  loyaltyGateway.add([
    {
      id: "1",
      phoneNumber: "0101010101",
      visits: [],
      companyName: "Birdy",
      companyId: "1",
      createAt: "2023-05-16T12:06:00.000Z",
      companyLogo: "https://picsum.photos/200?random",
    },
    {
      id: "2",
      phoneNumber: "0101010101",
      visits: [],
      companyName: "Birdy",
      companyId: "1",
      createAt: "2023-05-16T12:06:00.000Z",
      companyLogo: "https://picsum.photos/200?random",
    },
    {
      id: "3",
      phoneNumber: "0101010101",
      visits: [],
      companyName: "Birdy",
      companyId: "1",
      createAt: "2023-05-16T12:06:00.000Z",
      companyLogo: "https://picsum.photos/200?random",
    },
    {
      id: "4",
      phoneNumber: "0101010101",
      visits: [],
      companyName: "Birdy",
      companyId: "1",
      createAt: "2023-05-16T12:06:00.000Z",
      companyLogo: "https://picsum.photos/200?random",
    },
  ]);

  const offerGateway = new FakeOfferGateway(5000);
  offerGateway.add(
    [
      {
        name: "Burger",
        id: "1",
        image: "https://picsum.photos/200?random=pierre",
      },
    ],
    "1"
  );

  const router = createNavigator();
  const store = createTestStore(
    {
      loyaltyGateway: loyaltyGateway,
      offerGateway: offerGateway,
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
