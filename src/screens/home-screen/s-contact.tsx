import { img } from "assets";
import { Buttoon, sstyled, TouchableWeb, Txt } from "components";
import { fn, useAppContext } from "engines";
import React from "react";
import { Image, useWindowDimensions, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { spacing, use18, useDimension } from "utils";
import { version } from "../../../package.json";

interface d$_Intro {
  scrollY: Animated.SharedValue<number>;
  index: number;
  distanceScrolled: number;
  dataName: "Exp" | "Work";
}
export function S_Contact(props: d$_Intro) {
  const { distanceScrolled, index, scrollY } = props;
  const { C, dark, setTheme } = useAppContext();
  const { height } = useWindowDimensions();
  const [visible, setVisible] = React.useState(false);
  const [_underline, setUnderline] = React.useState<"none" | "underline">(
    "none"
  );

  //#region [reani]

  const rCtnrStyle = useAnimatedStyle(() => {
    const _inputRange = [-index * height * 0.1, distanceScrolled];
    return {
      justifyContent: "center",
      alignItems: "center",
      opacity: interpolate(
        scrollY.value,
        _inputRange,
        [0, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            _inputRange,
            [0, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  //#endregion

  return (
    <Animated.View style={rCtnrStyle}>
      <A.CtnrContact animation="fadeIn" delay={1000}>
        <TouchableWeb
          style={{ justifyContent: "flex-start" }}
          onMouseEnter={() => {
            setVisible(true);
            setUnderline("underline");
          }}
          onMouseLeave={() => {
            setVisible(false);
            setUnderline("none");
          }}
        >
          <Txt.H6 style={{ textAlign: "center", color: C["color-basic-1100"] }}>
            {use18("contact-title")}
          </Txt.H6>
          <View
          // style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Buttoon
              appearance="ghost"
              compact
              size="giant"
              style={{ borderRadius: 100 }}
              icon={{
                name: "email",
                color: visible ? C.errorRed : C.primary,
              }}
              onPress={() => {
                fn.web.LinkURL(
                  `mailto:drkhoi16@gmail.com?subject=Hi Khoi&body=`,
                  true
                );
              }}
            >
              drkhoi16atgmail
            </Buttoon>
            <Buttoon
              appearance="ghost"
              compact
              icon={{
                name: "linkedin",
                color: visible ? C.infoBlue : C.primary,
              }}
              size="giant"
              style={{ borderRadius: 100 }}
              onPress={() => {
                fn.web.LinkURL(`https://www.linkedin.com/in/ktran5`, true);
              }}
            >
              linkedinatktran5
            </Buttoon>
          </View>
        </TouchableWeb>
        <Image
          source={img.nguyenkhoi}
          style={{
            width: 714 * 0.5,
            height: 288 * 0.5,
            borderRadius: 10,
            overflow: "hidden",
            opacity: 1,
          }}
        />
      </A.CtnrContact>
      <Txt.C2
        style={{
          color: C.grey500,
          marginVertical: spacing(5),
          fontSize: 12,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        <Txt.C2
          style={{ color: C.grey500, fontSize: 12, fontWeight: "700" }}
          onPress={() =>
            fn.web.LinkURL(
              "https://github.com/nguyenkhooi/nguyenkhooi.github.io",
              true
            )
          }
        >
          {use18("Proudly created with") + " ❤️, "}
        </Txt.C2>
        <Txt.C2
          style={{ color: C.grey500, fontSize: 12, fontWeight: "700" }}
          onPress={() =>
            fn.web.LinkURL(
              "https://akveo.github.io/react-native-ui-kitten/",
              true
            )
          }
        >
          {use18("ui kitten") + "😸, "}
        </Txt.C2>
        {use18("and yup") + ", "}
        <Txt.C2
          style={{ color: C.grey500, fontSize: 12, fontWeight: "700" }}
          onPress={() =>
            fn.web.LinkURL(
              "http://necolas.github.io/react-native-web/docs/?path=/docs/overview-getting-started--page",
              true
            )
          }
        >
          {use18("react native web") + "⚛️🕸️. "}
        </Txt.C2>
        {"\n Version: " + version}
      </Txt.C2>
      {/* <Txt.C2
        style={{
          color: C.grey500,
          textDecorationLine: "underline",
          fontSize: 12,
          fontWeight: "700",
        }}
        onPress={() => Toasty.show("Yessir!", { type: "normal" })}
      >
        {use18("Wait, really?")}
      </Txt.C2> */}
    </Animated.View>
  );
}

const A = {
  CtnrContact: sstyled(Animatable.View)((p) => ({
    padding: spacing(6),
    alignItems: "center",
    backgroundColor: "color-basic-200",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "dim",
  })),
};
