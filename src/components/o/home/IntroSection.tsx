import { M, sstyled, TouchableWeb, Txt } from "components";
import { useSx } from "dripsy";
import { useAppContext } from "engines";
import { LinkURL } from "engines/functions/web-functions";
import { View as MotiView } from "moti";
import React from "react";
import { TextProps, TextStyle, useWindowDimensions } from "react-native";
import Reanimated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { Navigation } from "screens";
import { THEME, use18 } from "utils";
import { Text } from "dripsy";

interface d$_Intro {
  scrollY: Reanimated.SharedValue<number>;
  scrollToWork(): void;
  scrollToExp(): void;
}

export function IntroSection(props: d$_Intro) {
  const { scrollToWork, scrollToExp, scrollY } = props;
  const { C, dark, setTheme } = useAppContext();
  const [_color, setColor] = React.useState(C.grey600);

  const [dak, setDak] = React.useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const SIZE = 200;

  //#region [reani]
  const inputRange = [(-0 - 3) * height, 0 * height, (0 + 3) * height];
  const rCtnrAvatarStyle = useAnimatedStyle(() => {
    const transY = interpolate(
      scrollY.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY: transY }],
    };
  });
  const rCtnrIntroStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [-height * 3, 0, height * 0.4],
        [0, 1, 0],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-height * 3, 0, height * 3],
            [-height * 0.5, 0, height * 0.5],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  //#endregion

  return (
    <A.Ctnr height={height}>
      <M.ABigAvatar />
      <A.CtnrIntro
        from={{
          opacity: 0,
          // scale: 0.5,
        }}
        animate={{
          opacity: 1,
          // scale: 1,
        }}
        transition={{
          type: "timing",
          delay: 600,
        }}
      >
        <Reanimated.View style={[rCtnrIntroStyle]}>
          <Txt.H5
            onPress={() => {
              setTheme(dark ? THEME.LIGHT : THEME.DARK);
            }}
            style={{ textAlign: "center" }}
          >
            {use18("intro-1")} {"👋"}{" "}
          </Txt.H5>
          <TouchableWeb
            onMouseEnter={() => {
              setColor(C.dim);
              setDak(true);
            }}
            onMouseLeave={() => {
              setColor(C.grey600);
              setDak(false);
            }}
          >
            <Txt.S1
              style={{ color: _color, fontWeight: "500", textAlign: "center" }}
              adjustsFontSizeToFit={true}
            >
              {use18("intro-2")}{" "}
              <TxtLink parentColor={_color} onPress={scrollToWork}>
                {use18("intro-3")}
              </TxtLink>{" "}
              {use18("intro-4")}{" "}
              <TxtLink parentColor={_color} onPress={scrollToExp}>
                {use18("intro-5")}
              </TxtLink>{" "}
              {"\n"}
              {use18("intro-6")}{" "}
              <TxtLink
                parentColor={_color}
                onPress={() =>
                  LinkURL("https://www.instagram.com/nguyenkhooi/?hl=en", true)
                }
              >
                {use18("intro-7")}
              </TxtLink>{" "}
              {use18("intro-8")}{" "}
              <TxtLink
                parentColor={_color}
                onPress={() => Navigation.navigate("About")}
              >
                {use18("intro-9")}
              </TxtLink>
            </Txt.S1>
          </TouchableWeb>
        </Reanimated.View>
      </A.CtnrIntro>
    </A.Ctnr>
  );
}

const TxtLink = (
  params: TextProps & { parentColor: string; children: string }
) => {
  const { parentColor, style } = params;
  const { C } = useAppContext();
  const sx = useSx();

  //* Since dripsy export style in [], must convert it into Object before insert into rStyle
  let styleObject = Array.isArray(style)
    ? style?.reduce((r, c) => Object.assign(r, c), {})
    : style;
  /**
   * Style Preset for this component
   */
  let stylePreset = { fontSize: 5 };

  //#region [reani]
  const progress = useDerivedValue(() => {
    return parentColor == C.dim ? withTiming(1) : withTiming(0);
  }, [parentColor]);

  const rStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      textDecorationLine: "underline",
      color: interpolateColor(progress.value, [0, 1], [C.grey600, C.text]),
      ...styleObject,
    };
  });
  //#endregion

  return (
    <Text
      as={Reanimated.Text}
      {...params}
      style={[
        rStyle,
        sx({ ...stylePreset, ...styleObject, fontSize: [3, 4, 5] }),
      ]}
    />
  );
};

const A = {
  Ctnr: sstyled(MotiView)((p: { height: number }) => ({
    height: p.height,
    justifyContent: "center",
    alignItems: "center",
  })),
  CtnrIntro: sstyled(MotiView)({
    alignItems: "center",
    marginHorizontal: ["3%", "3%", "9%", "18%", "18%"],
    // paddingRight: p.WIDTH < 1000 ? spacing(6) : spacing(9),
  }),
};
