import { Avatar } from "@ui-kitten/components";
import { img } from "assets";
import { sstyled, TouchableWeb, Txt } from "components";

import { useAppContext } from "engines";
import * as React from "react";
import { LayoutChangeEvent, ScrollView, SectionList, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Navigation } from "screens";
import { IPSCR, spacing, THEME, tr, useDimension } from "utils";
import { S_ExperimentalGrid } from "./S_ExperimentalGrid";
import { S_PortfolioGrid } from "./S_PortfolioGrid";

export default (props: IPSCR) => {
  const { C } = useAppContext();
  const { HEIGHT } = useDimension();

  const refList = React.useRef<ScrollView>(null);

  const [_workLayout, setWorkLayout] = React.useState<LayoutChangeEvent>();
  // console.log("🖐️ work layout: ", _workLayout?.nativeEvent?.layout?.height);
  const [_ExpLayout, setExpLayout] = React.useState<LayoutChangeEvent>();
  // console.log("🖐️ Exp layout: ", _ExpLayout?.nativeEvent?.layout?.height);

  const scrollToSection = (section: "work" | "exp") => {
    section == "exp"
      ? refList.current.scrollTo(HEIGHT + _workLayout.nativeEvent.layout.height)
      : refList.current.scrollTo(HEIGHT);
  };

  return (
    <ScrollView ref={refList} style={{ backgroundColor: C.background }}>
      <$_Intro
        {...props}
        scrollToWork={() => {
          scrollToSection("work");
        }}
        scrollToExp={() => {
          scrollToSection("exp");
        }}
      />
      <View onLayout={setWorkLayout}>
        <$_PortfolioGrid {...props} />
      </View>
      <View onLayout={setExpLayout}>
        <$_ExperimentalGrid {...props} />
      </View>
    </ScrollView>
  );
  // return (
  //   <SectionList
  //     style={{ backgroundColor: C.background, flex: 1 }}
  //     ref={refList}
  //     sections={S_Home}
  //     keyExtractor={(item, index) => item.title + index}
  //     renderItem={({ item }) => item}
  //     extraData={WIDTH < 1000}
  //     // renderSectionHeader={({ section: { title } }) => (
  //     //   <Txt.$Title>{title}</Txt.$Title>
  //     // )}
  //     ListFooterComponent={
  //       <Txt.C1 style={{ color: C.dim, textAlign: "center", width: "100%" }}>
  //         © 2020 Khoi Tran.
  //       </Txt.C1>
  //     }
  //   />
  // );
};

interface d$_Intro extends IPSCR {
  scrollToWork(): void;
  scrollToExp(): void;
}
const $_Intro = (props: d$_Intro) => {
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
      <Animatable.View
        animation="fadeIn"
        delay={1000}
        style={{
          paddingHorizontal: spacing(6),
          paddingRight: WIDTH < 1000 ? spacing(6) : spacing(9),
          // paddingTop: spacing(7, "v"),
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
          <Avatar
            style={{
              width: 200,
              height: 200,
              transform: [{ rotate: "-10deg" }],
            }}
            source={dark ? img.khoiShades : img.khoi}
          />

          <Txt.H6 onPress={() => setTheme(dark ? THEME.LIGHT : THEME.DARK)}>
            {tr("intro-1")}
          </Txt.H6>
          <Txt.S1 style={{ color: _color }} adjustsFontSizeToFit={true}>
            {tr("intro-2")}
            <TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={scrollToWork}
            >
              {" "}
              {tr("intro-3")}{" "}
            </TxtLink>
            {tr("intro-4")}
            <TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={scrollToExp}
            >
              {" "}
              {tr("intro-5")}{" "}
            </TxtLink>
            {"\n"}
            {tr("intro-6")}
            <TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={() => Navigation.navigate("About")}
            >
              {" "}
              {tr("intro-7")}
            </TxtLink>{" "}
            {tr("intro-8")}
            <TxtLink
              style={{ textDecorationLine: _underline }}
              onPress={() => Navigation.navigate("About")}
            >
              {" "}
              {tr("intro-9")}
            </TxtLink>
          </Txt.S1>
        </TouchableWeb>
      </Animatable.View>
    </View>
  );
};

const $_PortfolioGrid = S_PortfolioGrid;
const $_ExperimentalGrid = S_ExperimentalGrid;

const TxtLink = sstyled(Txt.S1)({
  // fontSize: 29,
  fontWeight: "500",
  fontStyle: "italic",
});
