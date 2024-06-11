import React, { ReactNode } from "react";
import { Text, View, Image } from "react-native";
import { useSelector } from "react-redux";
import {
  HomeCardsViewModelType,
  HomeViewModel,
  useHomeCardsViewModel,
} from "./home-cards.viewmodel";
import { exhaustiveGuard } from "@/app/exaustive-guard";
import { SearchCardsBard } from "./components/SearchCardsBar";
import en from "javascript-time-ago/locale/en";
import { useSearchCardsBar } from "./use-search-cards-bar.hook";

const getNow = () => new Date().toISOString();

const updateUI = (homeViewModel: HomeViewModel): ReactNode => {
  switch (homeViewModel.type) {
    case HomeCardsViewModelType.NoLoyaltyCard:
      return <Text>No loyalty cards</Text>;
    case HomeCardsViewModelType.Loading:
      return <Text>Loading...</Text>;
    case HomeCardsViewModelType.Success:
      const { setByName, filterCardsByName, byName } = useSearchCardsBar();
      return (
        <View>
          <SearchCardsBard onChange={setByName} />
          {filterCardsByName(byName, homeViewModel.cards).map((card) => {
            return (
              <View>
                <Image
                  key={card.id + "logo"}
                  source={{ uri: card.companyLogo }}
                />
                <Text key={card.id + "date"}>{card.createAt}</Text>
                <Text key={card.id + "r"}>{card.companyName}</Text>
              </View>
            );
          })}
        </View>
      );
    default:
      return exhaustiveGuard(homeViewModel);
  }
};

export default function HomeScreen() {
  const viewModel = useSelector(
    useHomeCardsViewModel({
      now: getNow(),
      local: en,
      localString: "en",
    })
  );

  return <View>{updateUI(viewModel)}</View>;
}
