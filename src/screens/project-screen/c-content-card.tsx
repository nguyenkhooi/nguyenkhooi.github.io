import { sstyled, Txt } from "components";
import { useBreakpointIndex } from "dripsy";
import React from "react";
import { ImageStyle, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import Image from "react-native-scalable-image";
import { spacing, useDimension } from "utils";

export function C_ContentCard(props: {
  text: string;
  imageIndex: number;
  onImagePress?(): void;
}) {
  const { text, imageIndex, onImagePress } = props;
  const { WIDTH } = useDimension();

  // const imageWidth: number = height * 0.4 - 20;
  const imageWidth: number = WIDTH < 1000 ? WIDTH * 0.8 : WIDTH * 0.3;
  const breakpoint = useBreakpointIndex();
  const imageProp = { width: imageWidth };
  // const isContentImg = startsWith("https://", text);
  const isContentImg = text.includes("https");
  switch (isContentImg) {
    case true:
      return (
        <SS.Ctnr
          style={{ transform: [{ scale: breakpoint <= 2 ? 1 : 0.7 }] }}
          onPress={onImagePress}
          activeOpacity={0.9}
        >
          {imageIndex == 0 ? (
            <Image
              source={{ uri: text }}
              {...imageProp}
              key={imageIndex}
              style={SS.S.IMG_CTNR}
            />
          ) : (
            <SS.CtnrImg animation={"zoomIn"} delay={100 * imageIndex}>
              <Image source={{ uri: text }} {...imageProp} key={imageIndex} />
            </SS.CtnrImg>
          )}
        </SS.Ctnr>
      );
      break;
    case false:
      return (
        <SS.CtnrLabel animation={"fadeInUp"} delay={100 * imageIndex}>
          <SS.Label
            chieuRong={imageWidth}
            adjustsFontSizeToFit
            key={imageIndex}
          >
            {text}
          </SS.Label>
        </SS.CtnrLabel>
      );
      break;
  }
}

export const SS = {
  Ctnr: sstyled(TouchableOpacity)({
    // marginLeft: ["0%", "5%", "10%"],
    // marginRight: ["0%", "5%", "10%"],
    // backgroundColor: "blue",
    marginBottom: spacing(3),
  }),
  CtnrImg: sstyled(Animatable.View)((p) => ({
    // margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "surface",
  })),
  CtnrLabel: sstyled(Animatable.View)(() => ({
    // margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  })),

  Label: sstyled(Txt.P2)((p) => ({ width: p.chieuRong, textAlign: "center" })),
  S: {
    IMG_CTNR: {
      // margin: 10,
      borderRadius: 10,
      overflow: "hidden",
    } as ImageStyle,
  },
};
