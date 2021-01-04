import { SwipeDeck, Txt } from "components";
import { useSheets } from "engines";
import React from "react";
import {
  Linking,

  View
} from "react-native";
import * as Animatable from "react-native-animatable";
import { spacing, useDimension } from "utils";

export function S_RingadingDeck(props) {
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
            onPress={() => Linking.openURL(
              "https://snack.expo.io/@nguyenkhooi/swipedeck-mods"
            )}
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
          data={deckData} />
      </Animatable.View>
    )
  );
}
