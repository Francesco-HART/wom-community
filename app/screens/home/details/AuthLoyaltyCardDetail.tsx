import { RootStackParamList } from "@/app/navigations/router";
import { AppDispatch } from "@/lib/create-store";
import { getAuthEventOffers } from "@/lib/loyalty/usecases/get-auth-event-offers.usecase";
import { getLoyaltyBearings } from "@/lib/loyalty/usecases/get-loyalty-bearings.usecase";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Button, Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  CardDetailsViewModel,
  CardDetailsViewModelType,
  useCardDetailsViewModel,
} from "./card-details.viewmodel";
import { exhaustiveGuard } from "@/app/exaustive-guard";

const updateUI = (viewModel: CardDetailsViewModel) => {
  switch (viewModel.type) {
    case CardDetailsViewModelType.UserNoAuth:
      return (
        <View>
          <Text>No Auth</Text>
        </View>
      );
    case CardDetailsViewModelType.CardDoseNotExist:
      return (
        <View>
          <Text>Card not found</Text>
        </View>
      );
    case CardDetailsViewModelType.BearingsLoading:
      return (
        <View>
          <Text>Bearings loadings</Text>
          <Text>{viewModel.loyaltyCard.companyName}</Text>
          <Text>{viewModel.loyaltyCard.createAt}</Text>
          <Image
            style={{
              width: 300,
              height: 300,
            }}
            source={{ uri: viewModel.loyaltyCard.companyLogo }}
          />
        </View>
      );
    case CardDetailsViewModelType.OffersLoading:
      return (
        <View>
          <Text>Offers loadings</Text>
          <Text>{viewModel.loyaltyCard.companyName}</Text>
          <Text>{viewModel.loyaltyCard.createAt}</Text>
          <Image
            style={{
              width: 300,
              height: 300,
            }}
            source={{ uri: viewModel.loyaltyCard.companyLogo }}
          />
        </View>
      );
    case CardDetailsViewModelType.OffersAndBearingsLoading:
      return (
        <View>
          <Text>All loadings</Text>
          <Text>{viewModel.loyaltyCard.companyName}</Text>
          <Text>{viewModel.loyaltyCard.createAt}</Text>
          <Image
            style={{
              width: 300,
              height: 300,
            }}
            source={{ uri: viewModel.loyaltyCard.companyLogo }}
          />
        </View>
      );
    case CardDetailsViewModelType.CardSuccess:
      return (
        <View>
          <Text>{viewModel.loyaltyCard.companyName}</Text>
          <Text>{viewModel.loyaltyCard.createAt}</Text>
          <Image
            style={{
              width: 300,
              height: 300,
            }}
            source={{ uri: viewModel.loyaltyCard.companyLogo }}
          />
          {viewModel.loyaltyCard.offers.map((o) => (
            <View>
              <Text>Offer : {o.name}</Text>
              <Image
                style={{
                  width: 300,
                  height: 30,
                }}
                source={{ uri: o.image }}
              />
            </View>
          ))}
          {viewModel.loyaltyCard.bearings.map((b) => (
            <Text>Bearing : {b.points}</Text>
          ))}
        </View>
      );
    default:
      return exhaustiveGuard(viewModel);
  }
};

export default function AuthLoyaltyCardDetail() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Details">>();
  const dispatch = useDispatch<AppDispatch>();
  const loyaltyID = route.params.loyaltyID;
  const focusOnTransitionStart = () => {
    return navigation.addListener("transitionEnd", () => {
      dispatch(getAuthEventOffers());
      dispatch(
        getLoyaltyBearings({
          loyaltyID,
        })
      );
    });
  };

  useEffect(() => {
    return focusOnTransitionStart();
  }, [focusOnTransitionStart]);

  const detailsViewModel = useSelector(
    useCardDetailsViewModel({ loyaltyCardID: loyaltyID })
  );

  return (
    <View>
      <Text>Details {loyaltyID}</Text>
      {updateUI(detailsViewModel)}
    </View>
  );
}
