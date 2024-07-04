import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolation,
} from "react-native-reanimated";
import { Text, View, Dimensions } from "react-native";
import Button from "../../../components/button/Button";
import Card from "../../../components/cards/Card";
import type { SharedValue } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import React from "react";
import { useHomeActions } from "../home.context";

type CardProps = {
  index: number;
  color: string;
  card: {
    id: string;
    companyName: string;
    createAt: string;
    companyLogo: string;
  };
  scrollOffset: SharedValue<number>;
};

const { width: WindowWidth } = Dimensions.get("window");

export const CARD_WIDTH = WindowWidth / 2;
export const CARD_HEIGHT = (CARD_WIDTH / 3) * 5;

export const LoyaltyCard: React.FC<CardProps> = ({
  index,
  color,
  scrollOffset,
  card,
}) => {
  const inputRange = [
    (index - 3) * CARD_WIDTH,
    (index - 2) * CARD_WIDTH,
    (index - 1) * CARD_WIDTH,
    index * CARD_WIDTH,
    (index + 1) * CARD_WIDTH,
    (index + 2) * CARD_WIDTH,
    (index + 3) * CARD_WIDTH,
  ];

  const rStyle = useAnimatedStyle(() => {
    const scaleOutputRange = [0.75, 0.8, 0.8, 1, 0.8, 0.8, 0.75];
    const scale = interpolate(
      scrollOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolation.CLAMP
    );

    const rotateOutputRange = [
      -Math.PI / 5,
      -Math.PI / 10,
      -Math.PI / 20,
      0,
      Math.PI / 20,
      Math.PI / 10,
      Math.PI / 5,
    ];
    const rotate = interpolate(
      scrollOffset.value,
      inputRange,
      rotateOutputRange,
      Extrapolation.CLAMP
    );

    const translateXOutputRange = [
      -CARD_WIDTH * 0.3,
      -CARD_WIDTH * 0.25,
      -CARD_WIDTH * 0.2,
      0,
      CARD_WIDTH * 0.2,
      CARD_WIDTH * 0.25,
      CARD_WIDTH * 0.3,
    ];
    const translateX = interpolate(
      scrollOffset.value,
      inputRange,
      translateXOutputRange,
      Extrapolation.CLAMP
    );

    const translateYOutputRange = [
      -CARD_HEIGHT * 0.05,
      -CARD_HEIGHT * 0.025,
      -CARD_HEIGHT * 0.04,
      0,
      -CARD_HEIGHT * 0.04,
      -CARD_HEIGHT * 0.025,
      -CARD_HEIGHT * 0.02,
    ];
    const translateY = interpolate(
      scrollOffset.value,
      inputRange,
      translateYOutputRange,
      Extrapolation.CLAMP
    );

    const zIndexOutputRange = [100, 200, 300, 400, 300, 200, 100];
    const zIndex = interpolate(
      scrollOffset.value,
      inputRange,
      zIndexOutputRange
      // Extrapolation.CLAMP,
      // Why do we need to clamp the output range?
      // Try to add the clamp and see what happens while scrolling (till the last card)
      // hint: look the last card while scrolling slowly
    );

    const perspectiveRotateY = interpolate(
      scrollOffset.value, // The current scroll offset value
      [
        (index - 3) * CARD_WIDTH,
        (index - 2) * CARD_WIDTH,
        (index - 1) * CARD_WIDTH,
        (index - 0.5) * CARD_WIDTH, // Detailed control over the swap between cards
        index * CARD_WIDTH,
        (index + 0.5) * CARD_WIDTH, // Detailed control over the swap between cards
        (index + 1) * CARD_WIDTH,
        (index + 2) * CARD_WIDTH,
        (index + 3) * CARD_WIDTH,
      ],
      [
        -Math.PI / 10,
        -Math.PI / 10,
        -Math.PI / 20,
        -Math.PI / 5,
        0,
        Math.PI / 5,
        Math.PI / 20,
        Math.PI / 10,
        Math.PI / 10,
      ],
      Extrapolation.CLAMP
    );

    const additionalTranslateX = interpolate(
      scrollOffset.value, // The current scroll offset value
      [
        (index - 3) * CARD_WIDTH,
        (index - 2) * CARD_WIDTH,
        (index - 1) * CARD_WIDTH,
        (index - 0.5) * CARD_WIDTH, // Detailed control over the swap between cards
        index * CARD_WIDTH,
        (index + 0.5) * CARD_WIDTH, // Detailed control over the swap between cards
        (index + 1) * CARD_WIDTH,
        (index + 2) * CARD_WIDTH,
        (index + 3) * CARD_WIDTH,
      ],
      // While swapping we push the card to the left or to the right to avoid the overlap
      // Try to replace -CARD_WIDTH / 2.8 with 0 and see what happens
      [0, 0, 0, -CARD_WIDTH / 2.8, 0, CARD_WIDTH / 2.8, 0, 0, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX },
        { translateY },
        { translateX: additionalTranslateX },
        { scale },
        { rotate: `${rotate}rad` },
        {
          perspective: 500,
        },
        {
          rotateY: `${perspectiveRotateY}rad`,
        },
      ],
      zIndex,
    };
  }, []);

  const homeActions = useHomeActions();

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: (WindowWidth - CARD_WIDTH) / 2,
          height: CARD_HEIGHT,
          width: CARD_WIDTH,
          borderRadius: 20,
          borderCurve: "continuous",
          backgroundColor: color,

          shadowColor: "rgba(0, 0, 0, 0.3)",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.2,
          shadowRadius: 20,
        },
        rStyle,
      ]}
    >
      <View className="flex-1 items-center justify-center ">
        <Card className="p-3 flex-1 primary">
          <Card.Header className="justify-between">
            <Text className="text-neutral-500 dark:text-neutral-400">
              {"itemDetails.quantity.name"}
            </Text>
            <Button
              variant="link"
              onPress={() => homeActions.pressLoyaltyCard(card.id)}
            >
              <Button.Icon>
                <Feather name="edit" />
              </Button.Icon>
              <Button.Text>{"itemDetails.quantity.edit"}</Button.Text>
            </Button>
          </Card.Header>
          <Text className="dark:text-white">{card.createAt}</Text>
        </Card>
      </View>
    </Animated.View>
  );
};
