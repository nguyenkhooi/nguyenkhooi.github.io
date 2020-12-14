import { sstyled, SwipeDeck, Txt } from "components";
import { useAppContext, useSheets } from "engines";
import * as R from "ramda";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageStyle,
  Linking,
  ScrollView,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import { ScrollView } from "react-native-gesture-handler";
import RNMasonryScroll from "react-native-masonry-scrollview";
import Image from "react-native-scalable-image";
import { spacing, useDimension } from "utils";

function ProjectScreen(props) {
  const { route } = props;
  const { WIDTH } = useDimension();
  const [screenShown, showScreen] = useState(false);

  const {
    project: { color: projectColor, headline },
  } = route.params;
  const [_contents, setContents] = React.useState([""]);

  React.useEffect(function sortContents() {
    const dbContents = [
      route.params.project.body00,
      route.params.project.image00,
      route.params.project.body01,
      route.params.project.image01,
      route.params.project.body02,
      route.params.project.image02,
      route.params.project.body03,
      route.params.project.image03,
      route.params.project.body04,
      route.params.project.image04,
      route.params.project.body05,
      route.params.project.image05,
      route.params.project.body06,
      route.params.project.image06,
      route.params.project.body07,
      route.params.project.image07,
      route.params.project.body08,
      route.params.project.image08,
      route.params.project.body09,
      route.params.project.image09,
    ];
    const newContents = R.reject(
      (content) => !content || content == "",
      dbContents
    );
    setContents(newContents);
    global.setTimeout(() => {
      showScreen(true);
    }, 1000);
  }, []);

  return screenShown ? (
    <SS.Sctnr
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <SS.Headline {...props}>{headline}</SS.Headline>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <RNMasonryScroll
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          columns={WIDTH < 1000 ? 1 : 3}
          evenColumnStyle={{}}
          oddColumnStyle={{ marginTop: 60 }}
          horizontal={false}
        >
          {_contents.map((image, imageIndex) => {
            return (
              <C_ContentCard
                key={imageIndex}
                text={image}
                imageIndex={imageIndex}
              />
            );
          })}
        </RNMasonryScroll>
      </View>
      <$_RingadingDeck
        {...props}
        visible={route.params["project"]["title"] == "Ringading"}
      />
      <$_Koiwave
        {...props}
        visible={route.params["project"]["title"] == "Koiwave"}
      />
      <$_Sockdart
        {...props}
        visible={
          route.params["project"]["title"] ==
          "Natasha with Hot Pink Nike Sock Dart High"
        }
      />
    </SS.Sctnr>
  ) : (
    <SS.CtnrLoading>
      <ActivityIndicator size="large" color={projectColor} />
    </SS.CtnrLoading>
  );
}

export default ProjectScreen;

const C_ContentCard = (props: { text: string; imageIndex: number }) => {
  const { text, imageIndex } = props;
  const { WIDTH } = useDimension();

  // const imageWidth: number = height * 0.4 - 20;
  const imageWidth: number = WIDTH < 1000 ? WIDTH * 0.8 : WIDTH * 0.3;

  const imageProp = { width: imageWidth };
  // const isContentImg = startsWith("https://", text);
  const isContentImg = text.includes("https");
  switch (isContentImg) {
    case true:
      return imageIndex == 0 ? (
        <Image
          source={{ uri: text }}
          {...imageProp}
          key={imageIndex}
          style={SS.S.IMG_CTNR}
        />
      ) : (
        <SS.CtnrImg animation={"fadeInUp"} delay={100 * imageIndex}>
          <Image source={{ uri: text }} {...imageProp} key={imageIndex} />
        </SS.CtnrImg>
      );
      break;
    case false:
      return (
        <SS.CtnrLabel animation={"fadeInUp"} delay={100 * imageIndex}>
          <SS.Label
            chieuRong={imageWidth}
            adjustsFontSizeToFit
            key={imageIndex}
            // numberOfLines={20}
            // ellipsizeMode={"head"}
          >
            {text}
          </SS.Label>
        </SS.CtnrLabel>
      );
      break;
  }
};

const $_RingadingDeck = (props) => {
  const { visible } = props;
  const { data } = useSheets(0, "Ringading_Exp");
  const { WIDTH } = useDimension();
  React.useEffect(
    function fetchData() {
      setDeckData(data);
    },
    [data]
  );
  const [deckData, setDeckData] = React.useState(data);
  return (
    visible &&
    !!deckData[0] && (
      <Animatable.View
        animation="fadeInUp"
        delay={1000}
        style={{
          // padding: spacing(5),
          flexDirection: WIDTH < 1000 ? "column" : "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            // flex: 1,
            justifyContent: "flex-start",
            width: spacing(8),

            alignItems: "center",
          }}
        >
          <Txt.H6
            category="h1"
            style={{ color: "white", textAlign: "center" }}
            onPress={() =>
              Linking.openURL(
                "https://snack.expo.io/@nguyenkhooi/swipedeck-mods"
              )
            }
          >
            Try it!
          </Txt.H6>
          <Txt.P1
            category="p1"
            style={{ color: "white", fontSize: 28, textAlign: "center" }}
          >
            Try to swipe the deck, yup who you like and nah who you don't
          </Txt.P1>
          <Txt.P1
            category="h6"
            appearance="info"
            style={{ textAlign: "center" }}
            onPress={() => setDeckData(data)}
          >
            Reset Deck
          </Txt.P1>
        </View>
        <SwipeDeck
          {...props}
          containerStyle={{
            width: WIDTH < 1000 ? WIDTH * 0.8 : WIDTH * 0.4,
            height: WIDTH < 1000 ? WIDTH * 0.8 : WIDTH * 0.4,
          }}
          cardStyle={{
            width: WIDTH < 1000 ? WIDTH * 0.6 : WIDTH * 0.2,
            height: WIDTH < 1000 ? WIDTH * 0.8 : WIDTH * 0.4,
          }}
          data={deckData}
        />
      </Animatable.View>
    )
  );
};

function $_Koiwave(props: dKoiwave) {
  const { visible } = props;
  const { WIDTH } = useDimension();
  return (
    visible && (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <div>
          <iframe
            title="A 3D model"
            width={WIDTH}
            height="480"
            src="https://sketchfab.com/models/f0c987ac5c9b4fb0a40576a6ae46b92e/embed?autospin=0.6&amp;autostart=0&amp;ui_controls=1&amp;ui_infos=1&amp;ui_inspector=1&amp;ui_stop=1&amp;ui_watermark=1&amp;ui_watermark_link=1"
            //@ts-ignore
            frameborder="0"
            allow="autoplay; fullscreen; vr"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
        </div>
      </View>
    )
  );
}

function $_Sockdart(props: dKoiwave) {
  const { visible } = props;
  const { WIDTH } = useDimension();
  return (
    visible && (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <div>
          <iframe
            title="A 3D model"
            width={WIDTH}
            height="480"
            src="https://sketchfab.com/models/a24b84781d3947798ae14385b34c82ca/embed?autospin=0.6&amp;autostart=0&amp;ui_controls=1&amp;ui_infos=1&amp;ui_inspector=1&amp;ui_stop=1&amp;ui_watermark=1&amp;ui_watermark_link=1"
            //@ts-ignore
            frameborder="0"
            allow="autoplay; fullscreen; vr"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
        </div>
      </View>
    )
  );
}

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
  Headline: sstyled(Txt.H6)((p) => ({
    // fontSize: 26,
    color: p.C.text,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: spacing(2),
    paddingHorizontal: spacing(6),
  })),
  Label: sstyled(Txt.P2)((p) => ({ width: p.chieuRong, textAlign: "center" })),
  S: {
    IMG_CTNR: {
      margin: 10,
      borderRadius: 10,
      overflow: "hidden",
    } as ImageStyle,
  },
};
