import { sstyled, Txt } from "components";
import React from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { spacing, use18 } from "utils";
import * as Animatable from "react-native-animatable";

// const { height, width } = Dimensions.get("window");

interface PageProps {
  index: number;
  translateY: Animated.SharedValue<number>;
  title: string;
}

export function Page({ index, translateY, title }: PageProps) {
  const { width, height } = useWindowDimensions();
  const SIZE = 200;

  const inputRange = [
    (-index - 3) * height,
    index * height,
    (index + 3) * height,
  ];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateY.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ scale }],
      width: SIZE,
      height: SIZE,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const _translateY = interpolate(
      translateY.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateY.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY: _translateY }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256, 0.${index + 2})`, width, height },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[styles.textContainer, rTextStyle]}>
        <A.Label style={{ color: "white" }}>{use18(title)}</A.Label>
      </Animated.View>
    </View>
  );
}

const A = {
  Sctnr: sstyled(ScrollView)((p) => ({
    backgroundColor: "background",
    paddingTop: spacing(5),
  })),
  CtnrImg: sstyled(Animatable.View)((p) => ({
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "surface",
  })),
  CtnrLabel: sstyled(Animatable.View)(() => ({
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  })),
  CtnrLoading: sstyled(View)((p) => ({
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "background",
  })),
  //*----Txt-SECTION ----------
  Headline: sstyled(Txt.H4)((p) => ({
    // fontSize: 26,
    color: "text",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: spacing(2),
    paddingHorizontal: spacing(6),
  })),
  Label: sstyled(Txt.H1xl)((p) => ({
    fontSize: [30, 30, 35, 42, 45],
    textAlign: "center",
    marginHorizontal: [2, 2, 5, 8, 10],
  })),
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    backgroundColor: "rgba(0, 0, 256, 0.4)",
  },
  text: {
    textAlign: "center",
    fontSize: 42,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  textContainer: { position: "absolute" },
});
