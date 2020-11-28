import { Spinner, Text } from "@ui-kitten/components";
import { sstyled, SwipeDeck, Txt } from "components";
import { useSheets, withTheme } from "engines";
import * as R from "ramda";
import React, { useState } from "react";
import {
  FlatList,
  ImageStyle,
  Linking,
  ScrollView,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import * as Animatable from "react-native-animatable";
// import { ScrollView } from "react-native-gesture-handler";
import RNMasonryScroll from "react-native-masonry-scrollview";
import Image from "react-native-scalable-image";
import { dColors, scale, spacing, useDimension } from "utils";

const { createAnimatableComponent } = Animatable;

const AnimatableView = createAnimatableComponent(View);

function ProjectScreen(props) {
  const {
    navigation,
    theme: { C },
    route,
  } = props;
  const { WIDTH } = useDimension();

  // const imageWidth: number = height * 0.4 - 20;
  const imageWidth: number = WIDTH < 1000 ? WIDTH * 0.8 : WIDTH * 0.3;
  const [screenShown, showScreen] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(false);

  const toggleHorizontal = () => setIsHorizontal(!isHorizontal);

  const imageProp = isHorizontal
    ? { height: imageWidth }
    : { width: imageWidth };
  const {
    project: { color: projectColor, headline },
  } = route.params;
  const [_contents, setContents] = React.useState([""]);
  const [_index, setIndex] = React.useState(0);

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

  const refBody = React.useRef<FlatList>(null);

  const RenderContent = (props: { text: string; imageIndex: number }) => {
    const { text, imageIndex } = props;
    const startsWith = R.invoker(1, "startsWith");
    // const isContentImg = startsWith("https://", text);
    const isContentImg = text.includes("https");
    switch (isContentImg) {
      case true:
        return imageIndex == 0 ? (
          <Image
            source={{ uri: text }}
            {...imageProp}
            key={imageIndex}
            style={SS(C).IMG_CTNR}
          />
        ) : (
          <AnimatableView
            animation={isHorizontal ? "fadeInRight" : "fadeInUp"}
            delay={100 * imageIndex}
            style={SS(C).IMG_CTNR}
          >
            <Image source={{ uri: text }} {...imageProp} key={imageIndex} />
          </AnimatableView>
        );
        break;
      case false:
        return (
          <AnimatableView
            animation={isHorizontal ? "fadeInRight" : "fadeInUp"}
            delay={100 * imageIndex}
            style={[
              SS(C).IMG_CTNR,
              {
                backgroundColor: "transparent",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text
              category={"s1"}
              style={{
                fontSize: 25,
                color: "white",
                width: imageWidth,
                textAlign: "center",
              }}
              adjustsFontSizeToFit
              key={imageIndex}
              // numberOfLines={20}
              // ellipsizeMode={"head"}
            >
              {text}
            </Text>
          </AnimatableView>
        );
        break;
    }
  };

  return screenShown ? (
    <ScrollView
      style={{
        backgroundColor: C.background01,
        paddingTop: spacing(5),
      }}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <HeadlineTxt {...props} category={"h1"} adjustFontSizeToFit>
        {headline}
      </HeadlineTxt>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <RNMasonryScroll
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          columns={WIDTH < 1000 ? 1 : 2}
          evenColumnStyle={SS(C).evenColumnStyle}
          oddColumnStyle={
            isHorizontal
              ? SS(C).oddColumnStyleHorizontal
              : SS(C).oddColumnStyleVertical
          }
          horizontal={isHorizontal}
        >
          {_contents.map((image, imageIndex) => {
            return <RenderContent text={image} imageIndex={imageIndex} />;
          })}
        </RNMasonryScroll>
      </View>
      <$_RingadingDeck
        {...props}
        visible={route.params["project"]["title"] == "Ringading"}
      />
    </ScrollView>
  ) : (
    <View style={{ ...SS(C).LOADING_CTNR, backgroundColor: projectColor }}>
      <Spinner size="giant" />
    </View>
  );
}

export default withTheme(ProjectScreen);

const $_RingadingDeck = (props) => {
  const { visible } = props;
  const { data } = useSheets(0, "Ringading_Exp");
  const { WIDTH: width } = useDimension();
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
          flexDirection: width < 1000 ? "column" : "row",
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
            width: width < 1000 ? width * 0.8 : width * 0.4,
            height: width < 1000 ? width * 0.8 : width * 0.4,
          }}
          cardStyle={{
            width: width < 1000 ? width * 0.6 : width * 0.2,
            height: width < 1000 ? width * 0.8 : width * 0.4,
          }}
          data={deckData}
        />
      </Animatable.View>
    )
  );
};

const HeadlineTxt = sstyled(Txt.H6)(({ theme: { C } }) => ({
  // fontSize: 26,
  color: C.text01,
  textAlign: "center",
  justifyContent: "center",
  marginBottom: spacing(2),
  paddingHorizontal: spacing(6),
}));

const SS = (C?: dColors) => {
  return {
    LOADING_CTNR: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    } as ViewStyle,
    IMG_CTNR: {
      margin: 10,
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: C?.surface01,
    } as ImageStyle,
    evenColumnStyle: {} as ViewStyle,
    oddColumnStyleVertical: { marginTop: 60 } as ViewStyle,
    oddColumnStyleHorizontal: { marginLeft: 60 } as ViewStyle,

    BODY_CTNR: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing(2),
      borderWidth: 1,
      borderColor: "white",
    } as ViewStyle,
    GRID_CTNR: {
      marginTop: 10,
      marginHorizontal: spacing(5),
      //   justifyContent: "center",
      //   alignItems: "center",
      // flex: 1,
    } as ViewStyle,
    ITEM_CTNR: {
      justifyContent: "flex-end",
      borderRadius: 5,
      padding: 10,
      overflow: "hidden",
    } as ImageStyle,
    itemName: {
      fontSize: scale(18),
      color: "#fff",
      fontWeight: "600",
    } as TextStyle,
    itemCode: {
      // fontWeight: "600",
      fontSize: scale(12),
      color: "#fff",
    } as TextStyle,
  };
};
