import { useAppContext } from "engines";
import React from "react";
import { ScrollViewProps, ViewStyle } from "react-native";
import { ScrollView, useSx } from "dripsy";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { themeDark, themeLight } from "utils";

/**
 * ### A reanimated ScrollView, with smooth theme colors change
 *  - If apply backgroundColor, put it in the inline style
 *  ----
 *  @version 21.06.21
 *  -  *Build product*
 *  @author  K
 *
 **/
export const ScrollVue = React.forwardRef<any, P>((props, ref) => {
  const { style } = props;
  const { dark } = useAppContext();
  const sx = useSx();

  //* Since dripsy export style in [], must convert it into Object before insert into rStyle
  let styleObject = Array.isArray(style)
    ? style?.reduce((r, c) => Object.assign(r, c), {})
    : style;

  const progress = useDerivedValue(() => {
    return dark ? withTiming(1) : withTiming(0);
  }, [dark]);
  const rStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [themeLight.background, themeDark.background]
      ),
      ...styleObject,
    };
  });

  return (
    <ScrollView
      as={Animated.ScrollView}
      ref={ref}
      {...props}
      style={[rStyle, sx({ ...styleObject })]}
    />
  );
});

interface P extends ScrollViewProps {}
