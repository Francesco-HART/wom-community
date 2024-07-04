import React, { ReactNode, useEffect } from "react";
import { Text, View, Image, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeCardsViewModelType,
  HomeViewModel,
  useHomeCardsViewModel,
} from "./home-cards.viewmodel";
import { exhaustiveGuard } from "@/app/exaustive-guard";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigations/router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppDispatch } from "@/lib/create-store";
import { getAuthLoyaltyCards } from "@/lib/loyalty/usecases/get-auth-loyalty-card.usecase";
import { LoyaltyCardsScrollView } from "./components/LoyaltyCardsScrollView";
import en from "javascript-time-ago/locale/en";
import { HomeProviderContext } from "./home.context";

const getNow = () => new Date().toISOString();

const updateUI = (
  homeViewModel: HomeViewModel,
  action: (_: string) => void
): ReactNode => {
  switch (homeViewModel.type) {
    case HomeCardsViewModelType.NoLoyaltyCard:
      return (
        <View>
          <Text>No loyalty cards</Text>
        </View>
      );
    case HomeCardsViewModelType.Loading:
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    case HomeCardsViewModelType.Success:
      return (
        <View>
          <LoyaltyCardsScrollView loyaltyCards={homeViewModel.cards} />
        </View>
      );
    default:
      return exhaustiveGuard(homeViewModel);
  }
};

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Details">>();
  const dispatch = useDispatch<AppDispatch>();
  const focusOnTransitionEnd = () => {
    return navigation.addListener("transitionEnd", () => {
      dispatch(getAuthLoyaltyCards());
    });
  };

  useEffect(() => {
    return focusOnTransitionEnd();
  }, [focusOnTransitionEnd]);

  const viewModel = useSelector(
    useHomeCardsViewModel({
      now: getNow(),
      local: en,
      localString: "en",
    })
  );
  const pressLoyaltyCard = (loyaltyID: string) =>
    navigation.navigate("Details", {
      loyaltyID,
    });

  return (
    <HomeProviderContext pressLoyaltyCard={pressLoyaltyCard}>
      <View>{updateUI(viewModel, pressLoyaltyCard)}</View>
    </HomeProviderContext>
  );
}
