import { sstyled, Toasty, TouchableWeb, Txt } from "components";
import { withTheme } from "engines";
import * as React from "react";
import { ScrollView, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Navigation } from "screens";
import { IPSCR, spacing, useDimension } from "utils";
import { S_ExperimentalGrid } from "./S_ExperimentalGrid";
import { S_PortfolioGrid } from "./S_PortfolioGrid";

export default withTheme((props: IPSCR) => {
  const {
    theme: { C },
  } = props;
  const scrollRef = React.useRef<ScrollView>(null);
  // const [C, dark] = useTheme();
  const { HEIGHT } = useDimension("window");

  let sectionsPos: number[] = [];
  function scrollToIndex(n: number) {
    scrollRef.current?.scrollTo({ x: 0, y: HEIGHT * n, animated: true });
    //* deprecated due to inconsistent sectionsPos[] change due to dimensions' change
    // if (sectionsPos.length > n) {
    //   const targeted_y = sectionsPos
    //     .slice(0, n)
    //     .reduce((total, element) => total + element);

    //   scrollRef.current.scrollTo({
    //     x: 0,
    //     y: targeted_y,
    //     animated: true,
    //   });
    // } else {
    //   alert("Out of Max Index");
    // }
  }
  const S_Home = [
    {
      component: (
        <$_Intro
          {...props}
          scrollToWork={() => {
            scrollToIndex(1);
          }}
          scrollToExp={() => {
            scrollToIndex(2);
          }}
        />
      ),
    },
    {
      component: <$_PortfolioGrid {...props} />,
    },
    {
      component: <$_ExperimentalGrid {...props} />,
    },
  ];

  // const [arr, setArr] = React.useState([]);

  return (
    <ScrollView
      ref={scrollRef}
      style={{ backgroundColor: C.background }}
      // pagingEnabled={IS_WEB ? true : false}
    >
      {S_Home.map((section, key) => (
        <View
          key={key}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            sectionsPos[key] = layout.height;
            // alert(layout.height);
          }}
        >
          {section.component}
        </View>
      ))}
    </ScrollView>
  );
});

interface d$_Intro extends IPSCR {
  scrollToWork(): void;
  scrollToExp(): void;
}
const $_Intro = (props: d$_Intro) => {
  const {
    theme: { C, dark },
    setTheme,
    scrollToWork,
    scrollToExp,
  } = props;
  const { HEIGHT, s } = useDimension("window");
  const [_color, setColor] = React.useState(C.text);
  return (
    <Animatable.View
      animation="fadeInUp"
      delay={1000}
      style={{
        height: HEIGHT,
        justifyContent: "center",
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
        {/* {_color == C.dim && (
          <Image
            source={{ uri: img.khoi_1 }}
            style={{ width: 200, height: 200, borderRadius: 200 }}
          ></Image>
        )} */}
        <Txt.H6
          // onPress={() => setTheme(dark ? "themeLight" : "themeDark")}
          onPress={() => {
            const __toast = Toasty.show("Loading...", {
              type: "loading",
            });
            global.setTimeout(() => {
              !!__toast &&
                Toasty.update(__toast, "Done!", {
                  type: "success",
                  //icon: Toasty.icon().success,
                });
            }, 1000);

            // Toasty.show("Hey", { type: "success" });
          }}
        >
          Hi, I'm Khoi 👋
        </Txt.H6>
        <Txt.P1 style={{ color: _color }} adjustsFontSizeToFit={true}>
          A young mobile developer and UX manager who love doing both
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
        </Txt.P1>
      </TouchableWeb>
    </Animatable.View>
  );
};

const $_PortfolioGrid = S_PortfolioGrid;
const $_ExperimentalGrid = S_ExperimentalGrid;

const TxtLink = sstyled(Txt.P1)({
  // fontSize: 29,
  fontWeight: "500",
  fontStyle: "italic",
});

// export default withTheme(HomeScreen);
