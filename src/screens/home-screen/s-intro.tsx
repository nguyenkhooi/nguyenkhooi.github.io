import { Avatar, Layout, Tooltip } from "@ui-kitten/components";
import { IconOooh, img } from "assets";
import { Buttoon, sstyled, TouchableWeb, Txt } from "components";
import { useAppContext } from "engines";
import * as React from "react";
import {
  Animated,
  View,
  StyleSheet,
  createA,
  ViewStyle,
  ImageStyle,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Navigation } from "screens";
import { IPSCR, moderateScale, spacing, THEME, use18, useDimension } from "utils";

interface d$_Intro extends IPSCR {
  scrollToWork(): void;
  scrollToExp(): void;
}
export function S_Intro(props: d$_Intro) {
  const { scrollToWork, scrollToExp } = props;
  const { C, dark, setTheme } = useAppContext();
  const { HEIGHT, WIDTH } = useDimension("window");
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
      <Animatable.View
        animation="fadeIn"
        delay={1000}
        style={{
          paddingHorizontal: spacing(6),
          paddingRight: WIDTH < 1000 ? spacing(6) : spacing(9),
        }}
      >
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
            {use18("intro-1")} {dark ? "🕶️" : "👋"}{" "}
          </Txt.H6>

          <Txt.S1 style={{ color: _color }} adjustsFontSizeToFit={true}>
            {use18("intro-2")}
            <TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={scrollToWork}
            >
              {" "}
              {use18("intro-3")}{" "}
            </TxtLink>
            {use18("intro-4")}
            <TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={scrollToExp}
            >
              {" "}
              {use18("intro-5")}{" "}
            </TxtLink>
            {"\n"}
            {use18("intro-6")}
            <TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={() => Navigation.navigate("About")}
            >
              {" "}
              {use18("intro-7")}
            </TxtLink>{" "}
            {use18("intro-8")}
            <TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={() => Navigation.navigate("About")}
            >
              {" "}
              {use18("intro-9")}
            </TxtLink>
          </Txt.S1>
        </TouchableWeb>
      </Animatable.View>
    </View>
  );
}

const TxtLink = sstyled(Txt.S1)({
  // fontSize: 29,
  fontWeight: "500",
  fontStyle: "italic",
});

const NiAvatar = (props) => {
  const { WIDTH } = useDimension();
  const { dark, C, setI18N } = useAppContext();
  const refShades = React.useRef<Animatable.View>();
  React.useEffect(
    function movingShades() {
      dark ? refShades.current.bounce(500) : refShades.current.bounceOutUp(500);
    },
    [dark]
  );

  const [tooltip, setTooltip] = React.useState<"Let's hi-five!" | "Noice">(
    "Let's hi-five!"
  );
  return (
    <SS.Ctnr>
      <SS.Avatar style={{}} source={img.khoi} />
      <$_FlagRing />
      {WIDTH > 600 && (
        <Animatable.Image
          ref={refShades}
          useNativeDriver={true}
          easing={"ease-out-cubic"}
          style={{
            position: "absolute",
            ...SS.S.CTNR_SHADES,
          }}
          source={img.shades}
        />
      )}
    </SS.Ctnr>
  );
};

/**
 * Can't use IconOooh here as createAnimatedComponent(_) requires class <_>
 */
const NiStar = Animated.createAnimatedComponent(FontAwesome5Icon);

const $_FlagRing = (props) => {
  const { C, setI18N } = useAppContext();
  const animated = React.useRef(new Animated.Value(0)).current;
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
    outputRange: [moderateScale(10), moderateScale(10) * 0.6],
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
      Animated.spring(animated, {
        toValue: 0,
        tension: 2,
        friction: 10,
        useNativeDriver: true,
      }).start(() => setI18N("vi"));

    animated._value == 0 &&
      Animated.spring(animated, {
        toValue: 1,
        tension: 2,
        friction: 10,
        useNativeDriver: true,
      }).start(()=> setI18N("en"));
  }

  const transform = [{ rotate: rotate }];
  const transform1 = [{ rotate: rotateOpposit }];
  return (
    <Animated.View style={[SS.S.CTNR_FLAG, { transform }]}>
      <Animated.View
        style={[
          {
            transform: transform1,
            backgroundColor: flagColor,
            ...SS.S.FLAG_BCKGRD,
          },
        ]}
      >
        <NiStar
          name="star"
          color={starColor}
          size={starSize}
          onPress={() => rotatee()}
          solid
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ctnrFlag: {},
});

const SS = {
  Ctnr: sstyled(View)((p) => ({
    width: moderateScale(100),
    height: moderateScale(100),
    paddingHorizontal: spacing(6),
  })),
  Avatar: sstyled(Avatar)((p) => ({
    width: moderateScale(100),
    height: moderateScale(100),
    // transform: [{ rotate: "-10deg" }],
  })),

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
    } as ImageStyle,
  },
};
