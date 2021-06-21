import { useAppContext } from "engines";
import React from "react";
import { ScrollViewProps, ViewProps } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { themeDark, themeLight } from "utils";

export const Vue = React.forwardRef<any, P>((props, ref) => {
  const { C, dark, setTheme } = useAppContext();

  const progress = useDerivedValue(() => {
    return dark ? withTiming(1) : withTiming(0);
  }, [dark]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [themeLight.background, themeDark.background]
    );

    return { backgroundColor };
  });

  return <Animated.View ref={ref} {...props} style={[rStyle, props.style]} />;
});

interface P extends ViewProps {}
