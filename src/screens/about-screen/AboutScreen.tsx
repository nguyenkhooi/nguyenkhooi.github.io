import { ActivityIndicator } from "dripsy";
import { useAppContext, useSheets } from "engines";
import * as R from "ramda";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Page } from "./page";

const WORDS = ["What's", "up", "mobile", "devs?"];

export default function AboutScreen() {
  const { C } = useAppContext();
  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const { data } = useSheets(0, "About");
  const headline = data[0]?.headline;
  const [_contents, setContents] = React.useState([""]);
  const [_imgContents, setImgContents] = React.useState([""]);
  const [screenShown, showScreen] = React.useState(false);

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
        (content) => !content || content == "" || content.includes("http"),
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
  if (!screenShown)
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: `rgba(0,0,256, 0.2)`,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={"rgba(0, 0, 256, 0.4)"} />
      </View>
    );
  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      // pagingEnabled
      scrollEventThrottle={16}
      decelerationRate={0}
      
      // horizontal
      style={styles.container}
    >
      {_contents.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            translateY={translateY}
            index={index}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
