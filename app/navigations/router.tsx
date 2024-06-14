import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import AuthLoyaltyCardDetail from "../screens/home/details/AuthLoyaltyCardDetail";

export const createNavigator = (
  createNavigatorFn = createNativeStackNavigator
) => {
  const Stack = createNavigatorFn<RootStackParamList>();
  return Stack;
};

export const AppNavigator = ({ router }: { router: AppRouter }) => {
  return (
    <NavigationContainer>
      <router.Navigator initialRouteName="Home">
        <router.Screen name="Home" component={HomeScreen} />
        <router.Screen name="Details" component={AuthLoyaltyCardDetail} />
      </router.Navigator>
    </NavigationContainer>
  );
};

export type RootStackParamList = {
  Home: undefined;
  Details: { loyaltyID: string };
};

export type AppRouter = ReturnType<typeof createNavigator>;

export enum NavigationRoute {
  HOME = "Home",
  DETAILS = "Details",
}
