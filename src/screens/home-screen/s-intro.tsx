import { img } from "assets";
import { sstyled, Toasty, TouchableWeb, Txt } from "components";
import { useAppContext } from "engines";
import React from "react";
import { Animated, ImageStyle, View, ViewStyle } from "react-native";
import * as Animatable from "react-native-animatable";
import FA5 from "react-native-vector-icons/FontAwesome5";
import { Navigation } from "screens";
import {
  IPSCR,
  LANG,
  moderateScale,
  spacing,
  THEME,
  use18,
  useDimension,
} from "utils";

interface d$_Intro extends IPSCR {
  scrollToWork(): void;
  scrollToExp(): void;
}
export function S_Intro(props: d$_Intro) {
  const { scrollToWork, scrollToExp } = props;
  const { C, dark, setTheme } = useAppContext();
  const { HEIGHT } = useDimension("window");
  const [_color, setColor] = React.useState(C.text);
  const [_underline, setUnderline] = React.useState<"none" | "underline">(
    "none"
  );

  return (
    <View
      style={{
        height: HEIGHT,
        justifyContent: "center",
      }}
    >
      <NiAvatar />
      <SS.CtnrIntro animation="fadeIn" delay={1000}>
        <TouchableWeb
          onMouseEnter={() => {
            setColor(C.dim);
            setUnderline("underline");
          }}
          onMouseLeave={() => {
            setColor(C.text);
            setUnderline("none");
          }}
        >
          <Txt.H6
            onPress={() => {
              setTheme(dark ? THEME.LIGHT : THEME.DARK);
            }}
          >
            {use18("intro-1")} {"👋"}{" "}
          </Txt.H6>

          <Txt.S1 style={{ color: _color }} adjustsFontSizeToFit={true}>
            {use18("intro-2")}{" "}
            <SS.TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={scrollToWork}
            >
              {use18("intro-3")}
            </SS.TxtLink>{" "}
            {use18("intro-4")}{" "}
            <SS.TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={scrollToExp}
            >
              {use18("intro-5")}
            </SS.TxtLink>{" "}
            {"\n"}
            {use18("intro-6")}{" "}
            <SS.TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={() => Navigation.navigate("About")}
            >
              {use18("intro-7")}
            </SS.TxtLink>{" "}
            {use18("intro-8")}{" "}
            <SS.TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={() => Navigation.navigate("About")}
            >
              {use18("intro-9")}
            </SS.TxtLink>
          </Txt.S1>
        </TouchableWeb>
      </SS.CtnrIntro>
    </View>
  );
}

const NiAvatar = () => {
  const { WIDTH } = useDimension();
  const { dark } = useAppContext();
  //   const refShades = React.useRef<Animatable.View>();
  //   React.useEffect(
  //     function movingShades() {
  //       dark ? refShades.current.bounce(500) : refShades.current.fadeOut(500);
  //     },
  //     [dark]
  //   );

  const [] = React.useState<"Let's hi-five!" | "Noice">("Let's hi-five!");
  return (
    <SS.Ctnr>
      <SS.Avatar source={img.khoi} />
      <$_FlagRing />
    </SS.Ctnr>
  );
};

/**
 * Can't use IconOooh here as createAnimatedComponent(_) requires class <_>
 */
const NiStar = Animated.createAnimatedComponent(FA5);

const $_FlagRing = () => {
  const { C, setI18N } = useAppContext();
  const animated = React.useRef(new Animated.Value(1)).current;
  const rotate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-180deg"],
  });

  const starColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [C.hazardYellow, C.text01],
  });

  const starSize = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [moderateScale(10), moderateScale(10) * 0.9],
  });
  const shieldSize = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1 * 0.8],
  });

  const flagColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [C.errorRed, C.infoBlue],
  });

  const rotateOpposit = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  function rotatee() {
    animated._value == 1 &&
      (Toasty.show("Chuyển sang tiếng Việt...", {
        type: "loading",
        duration: 1000,
      }),
      Animated.spring(animated, {
        toValue: 0,
        tension: 2,
        friction: 10,
        useNativeDriver: true,
      }).start(() => {
        setI18N(LANG.VI);
      }));

    animated._value == 0 &&
      (Toasty.show("Change to English...", { type: "loading", duration: 1000 }),
      Animated.spring(animated, {
        toValue: 1,
        tension: 2,
        friction: 10,
        useNativeDriver: true,
      }).start(() => {
        setI18N(LANG.EN);
      }));
  }

  const transform = [{ rotate: rotate }];
  const transform1 = [{ rotate: rotateOpposit, scale: starSize }];
  return (
    <Animated.View
      style={[SS.S.CTNR_FLAG, { transform: [{ rotate: "-90deg" }] }]}
    >
      <Animated.View
        style={[
          {
            transform: [{ rotate: "90deg" }],
            backgroundColor: C.errorRed,
            ...SS.S.FLAG_BCKGRD,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              transform: [{ scale: shieldSize }],
              backgroundColor: flagColor,
              ...SS.S.FLAG_BCKGRD,
            },
          ]}
        >
          <NiStar
            name="star"
            color={starColor}
            size={moderateScale(10)}
            onPress={() => rotatee()}
            solid
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const SS = {
  Ctnr: sstyled(View)(() => ({
    width: moderateScale(100),
    height: moderateScale(100),
    paddingHorizontal: spacing(6),
  })),
  CtnrIntro: sstyled(Animatable.View)((p) => ({
    paddingHorizontal: spacing(6),
    paddingRight: p.WIDTH < 1000 ? spacing(6) : spacing(9),
  })),
  Avatar: sstyled(Animatable.Image)(() => ({
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: 200,
    transform: [{ rotate: "-10deg" }],
  })),
  TxtLink: sstyled(Txt.S1)({
    // fontSize: 29,
    fontWeight: "500",
    fontStyle: "italic",
  }),

  S: {
    CTNR_FLAG: {
      // borderWidth: 1,
      marginLeft: spacing(6),
      position: "absolute",
      padding: moderateScale(5),
      top: moderateScale(0),
      left: moderateScale(0),
      width: moderateScale(100),
      height: moderateScale(100), // this is the diameter of circle
    } as ViewStyle,
    FLAG_BCKGRD: {
      width: moderateScale(20),
      height: moderateScale(20),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
    } as ViewStyle,
    CTNR_SHADES: {
      top: moderateScale(22.5),
      left: moderateScale(65.3), //118
      width: moderateScale(40),
      height: moderateScale(40),
      transform: [{ rotate: "-10deg" }],
    } as ImageStyle,
  },
};
