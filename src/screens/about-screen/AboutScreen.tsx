import { sstyled, Txt } from "components";
import { useAppContext, useSheets } from "engines";
import * as R from "ramda";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageStyle,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import { ScrollView } from "react-native-gesture-handler";
import RNMasonryScroll from "react-native-masonry-scrollview";
import Image from "react-native-scalable-image";
import { spacing, use18, useDimension } from "utils";
import ImageViewer from "react-native-image-zoom-viewer";
import { Navigation } from "screens/_navigation";

export default function AboutScreen(props) {
  const { C } = useAppContext();
  const { WIDTH } = useDimension();
  const [screenShown, showScreen] = useState(false);
  const { data } = useSheets(0, "About");
  const headline = data[0]?.headline;
  const [_contents, setContents] = React.useState([""]);
  const [_imgContents, setImgContents] = React.useState([""]);

  React.useEffect(
    function sortContents() {
      const dbContents = [
        data[0]?.body00,
        data[0]?.image00,
        data[0]?.body01,
        data[0]?.image01,
        data[0]?.body02,
        data[0]?.image02,
        data[0]?.body03,
        data[0]?.image03,
        data[0]?.body04,
        data[0]?.image04,
        data[0]?.body05,
        data[0]?.image05,
        data[0]?.body06,
        data[0]?.image06,
        data[0]?.body07,
        data[0]?.image07,
        data[0]?.body08,
        data[0]?.image08,
        data[0]?.body09,
        data[0]?.image09,
        data[0]?.body10,
        data[0]?.image10,
      ];
      const newContents = R.reject(
        (content) => !content || content == "",
        dbContents
      );
      const imgContents = R.filter(
        (content: string) => content.includes("http"),
        newContents
      ).reduce((a, c) => [...a, { url: c }], []);
      setContents(newContents);
      setImgContents(imgContents);
      global.setTimeout(() => {
        showScreen(true);
        // console.log("data: ", imgContents);
      }, 1000);
    },
    [data]
  );

  return screenShown ? (
    <SS.Sctnr
      horizontal
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Animatable.View
        animation="fadeIn"
        style={{ width: WIDTH * 0.95, alignItems: "center" }}
      >
        <SS.Headline
          onPress={() =>
            Navigation.navigate("Gallery", {
              images: _imgContents,
              imgIndex: 3,
            })
          }
          {...props}
        >
          {use18(headline)}
        </SS.Headline>
        <Animatable.Text
          style={{ color: C.grey600 }}
          animation="pulse"
          iterationCount="infinite"
        >
          {use18("Let's scroll") + " ⟶"}
        </Animatable.Text>
      </Animatable.View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <RNMasonryScroll
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          columns={WIDTH < 1000 ? 1 : 3}
          evenColumnStyle={{}}
          oddColumnStyle={{ marginLeft: 60 }}
          horizontal={true}
        >
          {_contents.map((image, imageIndex) => {
            return (
              <C_ContentCard
                key={imageIndex}
                text={image}
                imageIndex={imageIndex}
                onImagePress={() => {
                  let imgIndex = R.findIndex(R.propEq("url", image))(
                    _imgContents
                  );
                  // console.log("img index: ", imgIndex);
                  Navigation.navigate("Gallery", {
                    images: _imgContents,
                    imgIndex,
                  });
                }}
              />
            );
          })}
        </RNMasonryScroll>
      </View>
    </SS.Sctnr>
  ) : (
    <SS.CtnrLoading>
      <ActivityIndicator size="large" color={C.primary} />
    </SS.CtnrLoading>
  );
}

const C_ContentCard = (props: {
  text: string;
  imageIndex: number;
  onImagePress?(): void;
}) => {
  const { text, imageIndex, onImagePress } = props;
  const { WIDTH } = useDimension();

  // const imageWidth: number = height * 0.4 - 20;
  const imageWidth: number = WIDTH < 1000 ? WIDTH * 0.8 : WIDTH * 0.3;

  const imageProp = { height: imageWidth };
  // const isContentImg = startsWith("https://", text);
  const isContentImg = text.includes("https");
  switch (isContentImg) {
    case true:
      return (
        <TouchableOpacity onPress={onImagePress}>
          {imageIndex == 0 ? (
            <Image
              source={{ uri: text }}
              {...imageProp}
              key={imageIndex}
              style={SS.S.IMG_CTNR}
            />
          ) : (
            <SS.CtnrImg animation={"fadeIn"} delay={100 * imageIndex}>
              <Image source={{ uri: text }} {...imageProp} key={imageIndex} />
            </SS.CtnrImg>
          )}
        </TouchableOpacity>
      );
      break;
    case false:
      return (
        <SS.CtnrLabel animation={"fadeIn"} delay={100 * imageIndex}>
          <SS.Label
            chieuRong={imageWidth}
            adjustsFontSizeToFit
            key={imageIndex}
            // numberOfLines={20}
            // ellipsizeMode={"head"}
          >
            {use18(text)}
          </SS.Label>
        </SS.CtnrLabel>
      );
      break;
  }
};

const SS = {
  Sctnr: sstyled(ScrollView)((p) => ({
    backgroundColor: p.C.background,
    paddingTop: spacing(5),
  })),
  CtnrImg: sstyled(Animatable.View)((p) => ({
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: p.C.surface,
  })),
  CtnrLabel: sstyled(Animatable.View)(() => ({
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  })),
  CtnrLoading: sstyled(View)((p) => ({
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: p.C.background,
  })),
  //*----Txt-SECTION ----------
  Headline: sstyled(Txt.H4)((p) => ({
    // fontSize: 26,
    color: p.C.text,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: spacing(2),
    paddingHorizontal: spacing(6),
  })),
  Label: sstyled(Txt.H6)((p) => ({ width: p.chieuRong, textAlign: "left" })),
  S: {
    IMG_CTNR: {
      margin: 10,
      borderRadius: 10,
      overflow: "hidden",
    } as ImageStyle,
  },
};
