import { img } from "assets";
import { Buttoon, sstyled, TouchableWeb, Txt } from "components";
import { fn, useAppContext } from "engines";
import React from "react";
import { Image, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { IPSCR, moderateScale, spacing, use18, useDimension } from "utils";

interface d$_Intro extends IPSCR {
  scrollToWork(): void;
  scrollToExp(): void;
}
export function S_Contact(props: d$_Intro) {
  const { scrollToWork, scrollToExp } = props;
  const { C, dark, setTheme } = useAppContext();
  const { HEIGHT } = useDimension("window");
  const [visible, setVisible] = React.useState(false);
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
      <SS.CtnrContact animation="fadeIn" delay={1000}>
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
          <Txt.H6 style={{ textAlign: "center" }}>
            {use18("Noice! Let's connect")}
          </Txt.H6>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Buttoon
              appearance="ghost"
              compact
              size="giant"
              style={{ borderRadius: 100 }}
              icon={{ name: visible ? "email" : null, color: C.errorRed }}
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
              icon={{ name: visible ? "linkedin" : null, color: C.infoBlue }}
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
          style={{ width: 714 * 0.5, height: 288 * 0.5 }}
        />
      </SS.CtnrContact>
    </View>
  );
}

const SS = {
  Ctnr: sstyled(View)(() => ({
    width: moderateScale(100),
    height: moderateScale(100),
    paddingHorizontal: spacing(6),
  })),
  CtnrContact: sstyled(Animatable.View)((p) => ({
    paddingHorizontal: spacing(6),
    alignItems: "center",
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
};
