import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import React from "react";

import { CARD_HEIGHT, CARD_WIDTH, LoyaltyCard } from "./LoyaltyCard";

type Props = {
  loyaltyCards: {
    id: string;
    companyName: string;
    createAt: string;
    companyLogo: string;
  }[];
};

export const LoyaltyCardsScrollView = ({ loyaltyCards }: Props) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const rListViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: scrollOffset.value,
        },
      ],
    };
  }, []);

  const VerticalListPadding = 25;

  return (
    <View>
      <StatusBar style="light" />
      <View
        style={{
          marginBottom: CARD_HEIGHT,
        }}
      >
        {/*
         * The beauty of this approach is that we're not coordinating custom gesture detectors.
         * Instead we're using just one ScrollView with paging enabled.
         * This way we can leverage infinite potential cards with a single ScrollView.
         */}
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={CARD_WIDTH}
          disableIntervalMomentum
          pagingEnabled
          decelerationRate="fast"
          style={{
            maxHeight: CARD_HEIGHT + VerticalListPadding * 2,
            position: "absolute",
          }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            height: CARD_HEIGHT + VerticalListPadding * 2,
            paddingHorizontal: CARD_WIDTH,
          }}
        >
          {loyaltyCards.map((_, i) => {
            return (
              <View
                key={i}
                style={{
                  height: CARD_HEIGHT,
                  width: CARD_WIDTH,
                  //IMPORTANT: This is the key to the magic 🪄
                  // backgroundColor: "red",
                  // borderColor: "white",
                  // borderWidth: 1,
                }}
              />
            );
          })}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: VerticalListPadding,
                bottom: VerticalListPadding,
                left: 0,
                right: 0,
              },
              rListViewStyle,
            ]}
          >
            {loyaltyCards.map((card, i) => {
              return (
                <LoyaltyCard
                  scrollOffset={scrollOffset}
                  index={i}
                  color={`red`}
                  card={card}
                  key={i}
                />
              );
            })}
          </Animated.View>
        </Animated.ScrollView>
      </View>
    </View>
  );
};
