import { sstyled, Txt } from "components";
import { useAppContext } from "engines";
import * as R from "ramda";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageStyle,
  ScrollView,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import { ScrollView } from "react-native-gesture-handler";
import RNMasonryScroll from "react-native-masonry-scrollview";
import { Navigation } from "screens";
import { spacing, useDimension } from "utils";
import { S_SockdartHi } from "./s-sockdart-hi-3d";
import { C_ContentCard } from "./c-content-card";
import { S_Koiwave } from "./s-koiwave-3d";
import { S_RingadingDeck } from "./s-ringading-deck";
import { S_LuccMain } from "./s-lucc-concept-3d";
import { S_LuccJacket } from "./s-lucc-jacket-3d";

function ProjectScreen(props) {
  const { route } = props;
  const { WIDTH } = useDimension();
  const [screenShown, showScreen] = useState(false);

  const {
    project: { color: projectColor, headline },
  } = route.params;
  const [_contents, setContents] = React.useState([""]);
  const [_imgContents, setImgContents] = React.useState([""]);

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
    const imgContents = R.filter(
      (content: string) => content.includes("http"),
      newContents
    ).reduce((a, c) => [...a, { url: c }], []);
    setContents(newContents);
    setImgContents(imgContents);
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
      <$_RingadingDeck
        {...props}
        visible={route.params["project"]["title"] == "Ringading"}
      />
      <$_LuccMain
        {...props}
        visible={route.params["project"]["title"].includes("LUCC Kit")}
      />
      <$_LuccJacket
        {...props}
        visible={route.params["project"]["title"].includes("LUCC Winter Jacket")}
      />
      <$_Koiwave
        {...props}
        visible={route.params["project"]["title"] == "Koiwave"}
      />
      <$_Sockdart
        {...props}
        visible={
          route.params["project"]["title"] == "Koi x Nike Sock Dart High"
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

const $_LuccMain = S_LuccMain;
const $_LuccJacket = S_LuccJacket;
const $_Koiwave = S_Koiwave;
const $_Sockdart = S_SockdartHi;
const $_RingadingDeck = S_RingadingDeck;

export const SS = {
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
