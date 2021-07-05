import { AnimatePresence } from "framer-motion";
import React, { useReducer } from "react";
import {
  StyleSheet,
  Image,
  Animated,
  ImageStyle,
  ViewStyle,
} from "react-native";
import { View as MotiView } from "moti";
import { sstyled, Toasty } from "components";
import { img } from "assets";
import { useAppContext } from "engines";
import { moderateScale, LANG, spacing, THEME } from "utils";
import { View as Dripview } from "dripsy";
import Reanimated from "react-native-reanimated";
import FA5 from "react-native-vector-icons/FontAwesome5";

function Shape({ uri }: { uri: string }) {
  const { dark } = useAppContext();
  return (
    <MotiView
      from={{
        opacity: 1,
        scale: 1,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.3,
      }}
    >
      <A.Avatar source={uri} />
      <$_FlagRing />
    </MotiView>
  );
}

export function ABigAvatar() {
  const { dark } = useAppContext();
  return (
    <MotiView
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
        duration: 400,
      }}
    >
      <AnimatePresence exitBeforeEnter>
        {dark && <Shape uri={img.khoi} key="hotpink" />}
        {!dark && <Shape uri={img.khoi3d} key="cyan" />}
      </AnimatePresence>
    </MotiView>
  );
}

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

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#9c1aff",
  },
});

const A = {
  Avatar: sstyled(Image)({
    width: [5, 5, 6],
    height: [5, 5, 6],
    borderRadius: 200,
    backgroundColor: "background",
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
