import { sstyled, TouchableWeb, Txt } from "components";

import { useAppContext } from "engines";
import * as React from "react";
import { SectionList, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Navigation } from "screens";
import { IPSCR, spacing, THEME, useDimension } from "utils";
import { S_ExperimentalGrid } from "./S_ExperimentalGrid";
import { S_PortfolioGrid } from "./S_PortfolioGrid";

export default (props: IPSCR) => {
  const { C } = useAppContext();

  const refList = React.useRef<SectionList>(null);
  // const [C, dark] = useTheme();

  const scrollToSection = (sectionIndex, itemIndex = 1) => {
    refList.current.scrollToLocation({
      sectionIndex: sectionIndex,
      itemIndex: itemIndex,
    });
  };
  const S_Home = [
    {
      title: "",
      data: [
        <$_Intro
          {...props}
          scrollToWork={() => {
            scrollToSection(1);
          }}
          scrollToExp={() => {
            scrollToSection(2);
          }}
        />,
      ],
    },
    {
      title: "Work",
      data: [
        <View>
          <$_PortfolioGrid {...props} />
        </View>,
      ],
    },
    {
      title: "Experimental",
      data: [
        <View>
          <$_ExperimentalGrid {...props} />
        </View>,
      ],
    },
  ];

  // const [arr, setArr] = React.useState([]);

  return (
    <SectionList
      style={{ backgroundColor: C.background, flex: 1 }}
      ref={refList}
      sections={S_Home}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => item}
      renderSectionHeader={({ section: { title } }) => (
        <Txt.$Title>{title}</Txt.$Title>
      )}
      ListFooterComponent={
        <Txt.C1 style={{ color: C.dim, textAlign: "center", width: "100%" }}>
          © 2020 Khoi Tran.
        </Txt.C1>
      }
    />
  );
};

interface d$_Intro extends IPSCR {
  scrollToWork(): void;
  scrollToExp(): void;
}
const $_Intro = (props: d$_Intro) => {
  const { scrollToWork, scrollToExp } = props;
  const { C, dark, setTheme } = useAppContext();
  const { HEIGHT } = useDimension("window");
  const [_color, setColor] = React.useState(C.text);
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
          // paddingTop: spacing(7, "v"),
        }}
      >
        <TouchableWeb
          onMouseEnter={() => {
            setColor(C.dim);
          }}
          onMouseLeave={() => {
            setColor(C.text);
          }}
        >
          <Txt.H6 onPress={() => setTheme(dark ? THEME.LIGHT : THEME.DARK)}>
            Hi, I'm Khoi 👋
          </Txt.H6>
          <Txt.S1 style={{ color: _color }} adjustsFontSizeToFit={true}>
            A young mobile developer and UX manager who creating both
            <TxtLink {...props} onPress={scrollToWork}>
              {" "}
              real products{" "}
            </TxtLink>
            and
            <TxtLink {...props} onPress={scrollToExp}>
              {" "}
              experimental work.{" "}
            </TxtLink>
            {"\n"}See things I follow on my blog or read
            <TxtLink {...props} onPress={() => Navigation.navigate("About")}>
              {" "}
              a bit{" "}
            </TxtLink>
            about me.
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
