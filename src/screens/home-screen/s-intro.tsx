import { img } from "assets";
import { sstyled, Toasty, TouchableWeb, Txt } from "components";
import { useSx, View as Dripview } from "dripsy";
import { useAppContext } from "engines";
import { LinkURL } from "engines/functions/web-functions";
import { View as Motiview } from "moti";
import React, { useReducer } from "react";
import {
  Animated,
  Image,
  ImageStyle,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import FA5 from "react-native-vector-icons/FontAwesome5";
import { Navigation } from "screens";
import {
  dColors,
  IPSCR,
  LANG,
  moderateScale,
  spacing,
  THEME,
  use18,
  useDimension,
} from "utils";
import { Text } from "dripsy";
interface d$_Intro extends IPSCR {
  scrollToWork(): void;
  scrollToExp(): void;
}

export function S_Intro(props: d$_Intro) {
  const { scrollToWork, scrollToExp } = props;
  const { C, dark, setTheme } = useAppContext();
  const { HEIGHT, WIDTH } = useDimension("window");
  const [_color, setColor] = React.useState(C.grey600);

  const [dak, setDak] = React.useState<boolean>(false);

  return (
    <View
      style={{
        height: HEIGHT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <NiAvatar />
      <A.CtnrIntro
        WIDTH={WIDTH}
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
          <Txt.H5
            onPress={() => {
              setTheme(dark ? THEME.LIGHT : THEME.DARK);
            }}
            style={{ textAlign: "center" }}
          >
            {use18("intro-1")} {"👋"}{" "}
          </Txt.H5>
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
      </A.CtnrIntro>
    </View>
  );
}

const TxtLink = (params: TextProps & { parentColor: string }) => {
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

  //#region [REANI]
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
      style={[rStyle, sx({ ...stylePreset, ...styleObject })]}
    />
  );
};

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
    <A.Ctnr
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "timing",
      }}
    >
      <A.Avatar source={dark ? img.khoi : img.khoi3d} />
      <$_FlagRing />
    </A.Ctnr>
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
    <Dripview
      as={Reanimated.View}
      style={[
        {
          // marginLeft: spacing(6),
          position: "absolute",
          padding: 1,
          bottom: 0,
          left: 0,
          width: 2,
          height: 2,
        },
        { transform: [{ rotate: "-90deg" }] },
      ]}
    >
      <Animated.View
        style={[
          {
            transform: [{ rotate: "90deg" }],
            backgroundColor: C.errorRed,
            ...A.S.FLAG_BCKGRD,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              transform: [{ scale: shieldSize }],
              backgroundColor: flagColor,
              ...A.S.FLAG_BCKGRD,
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
    </Dripview>
  );
};

const A = {
  Ctnr: sstyled(Motiview)(() => ({
    // width: 5,
    // height: 5,
    // paddingHorizontal: spacing(6),
  })),
  CtnrIntro: sstyled(Motiview)((p) => ({
    alignItems: "center",
    marginHorizontal: ["3%", "3%", "9%", "18%", "18%"],
    // paddingRight: p.WIDTH < 1000 ? spacing(6) : spacing(9),
  })),
  Avatar: sstyled(Image)({
    width: 6,
    height: 6,
    borderRadius: 200,
  }),
  TxtLink: sstyled(Txt.S1)({
    // fontSize: 29,
    fontWeight: "500",
    color: "grey600",
    // fontStyle: "italic",
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
