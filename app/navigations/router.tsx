import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";

export const createNavigator = (
  createNavigatorFn = createNativeStackNavigator
) => {
  const Stack = createNavigatorFn();
  return Stack;
};

export const AppNavigator = ({ router }: { router: AppRouter }) => {
  return (
    <NavigationContainer>
      <router.Navigator>
        <router.Screen name="Home" component={HomeScreen} />
      </router.Navigator>
    </NavigationContainer>
  );
};

export type AppRouter = ReturnType<typeof createNavigator>;
