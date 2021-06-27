import { sstyled, Txt } from "components";
import { useAppContext } from "engines";
import { LinkURL } from "engines/functions/web-functions";
import * as R from "ramda";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageStyle,
  Platform,
  ScrollView,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import { ScrollView } from "react-native-gesture-handler";
import RNMasonryScroll from "react-native-masonry-scrollview";
import { Navigation } from "screens";
import { IS_ANDROID, spacing, useDimension } from "utils";
import { C_ContentCard } from "./c-content-card";
import { S_Koiwave } from "./s-koiwave-3d";
import { S_LuccMain } from "./s-lucc-concept-3d";
import { S_LuccJacket } from "./s-lucc-jacket-3d";
import { S_RingadingDeck } from "./s-ringading-deck";
import { S_SockdartHi } from "./s-sockdart-hi-3d";
import Markdown, { MarkdownProps } from "react-native-markdown-display";

function ProjectScreen(props) {
  const { C } = useAppContext();
  const { route } = props;
  const { WIDTH } = useDimension();
  const [screenShown, showScreen] = useState(false);

  const {
    project: { color: projectColor, headline },
  } = route.params;
  const [_contents, setContents] = React.useState([""]);
  const [_bodyContents, setBodyContents] = React.useState([""]);
  const [_imgContents, setImgContents] = React.useState([""]);

  React.useEffect(function sortContents() {
    const dbContents = [
      route.params.project.image00,

      route.params.project.image01,

      route.params.project.image02,

      route.params.project.image03,

      route.params.project.image04,

      route.params.project.image05,

      route.params.project.image06,

      route.params.project.image07,

      route.params.project.image08,

      route.params.project.image09,
    ];
    const dbBodyContents = [
      route.params.project.body00,
      route.params.project.body01,
      route.params.project.body02,
      route.params.project.body03,
      route.params.project.body04,
      route.params.project.body05,
      route.params.project.body06,
      route.params.project.body07,
      route.params.project.body08,
      route.params.project.body09,
    ];

    const newContents = R.reject(
      (content) => !content || content == "",
      dbContents
    );
    const newBodyContents = R.reject(
      (content) => !content || content == "",
      dbBodyContents
    );
    const imgContents = R.filter(
      (content: string) => content.includes("http"),
      newContents
    ).reduce((a, c) => [...a, { url: c }], []);
    setContents(newContents);
    setBodyContents(newBodyContents);
    setImgContents(imgContents);
    global.setTimeout(() => {
      showScreen(true);
    }, 1000);
  }, []);

  return screenShown ? (
    <SS.Sctnr
    // contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <SS.Headline {...props}>{headline}</SS.Headline>
      <SS.CtnrBody>
        {_bodyContents.map((body) => (
          // <Txt style={{ marginVertical: spacing(3), textAlign: "justify" }}>
          //   {body}
          // </Txt>
          <Markdown
            style={{
              heading1: {
                color: C.text,
                borderRadius: 73,
                marginTop: 4,
                marginBottom: 6,
                fontSize: 36,
                fontWeight: IS_ANDROID ? "bold" : "800",
              },
              heading2: {
                color: C.text,
                borderRadius: 73,
                marginTop: 4,
                marginBottom: 6,
                fontSize: 32,
                fontWeight: IS_ANDROID ? "bold" : "800",
              },
              heading3: {
                color: C.text,
                borderRadius: 73,
                marginTop: 4,
                marginBottom: 6,
                fontSize: 30,
                fontWeight: IS_ANDROID ? "bold" : "800",
              },
              heading4: {
                color: C.text,
                borderRadius: 73,
                marginTop: 4,
                marginBottom: 6,
                fontSize: 26,
                fontWeight: IS_ANDROID ? "bold" : "800",
              },
              heading5: {
                color: C.text,
                borderRadius: 73,
                marginTop: 4,
                marginBottom: 6,
                fontSize: 22,
                fontWeight: IS_ANDROID ? "bold" : "800",
              },
              heading6: {
                color: C.text,
                borderRadius: 73,
                marginTop: 4,
                marginBottom: 6,
                fontSize: 18,
                fontWeight: IS_ANDROID ? "bold" : "800",
              },
              body: {
                color: C.text,
                borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
                fontSize: 20,
                fontWeight: "400",
              },
              hr: { color: C.text },
              strong: {
                color: C.text,
                borderRadius: 73,

                fontWeight: "700",
              },
              em: { color: "errorRed" },
              s: { color: C.text },
              blockquote: {
                backgroundColor: "surface",
                fontWeight: "600",
                margin: 4,
              },
              bullet_list: { color: C.text },
              ordered_list: { color: C.text },
              list_item: { color: C.text },
              code_inline: {
                backgroundColor: "surface01",
                borderWidth: 0,
                padding: 1,
                zIndex: -99,
                color: "awakenVolt",
                ...Platform.select({
                  ["ios"]: {
                    fontFamily: "Courier",
                  },
                  ["android"]: {
                    fontFamily: "monospace",
                  },
                  ["web"]: {
                    fontFamily: "monospace",
                  },
                }),
              },
              code_block: {
                color: "awakenVolt",
                backgroundColor: "surface01",
                borderColor: "dim",
                fontSize: 14,
              },
              fence: {
                color: "awakenVolt",
                backgroundColor: "surface01",
                borderColor: "dim",
                ...Platform.select({
                  ["ios"]: {
                    fontFamily: "Courier",
                  },
                  ["android"]: {
                    fontFamily: "monospace",
                  },
                  ["web"]: {
                    fontFamily: "monospace",
                  },
                }),
              },
              table: { color: C.text },
              thead: { color: C.text },
              tbody: { color: C.text },
              th: { color: C.text },
              tr: { color: C.text },
              td: { color: C.text },
              link: { color: C.text },
              blocklink: { color: C.text },
              image: { color: C.text },
              text: { color: C.text },
              textgroup: { color: C.text },
              paragraph: { color: C.text },
              hardbreak: { color: C.text },
              softbreak: { color: C.text },
              pre: { color: C.text },
              inline: { color: C.text },
              span: { color: C.text },
            }}
            onLinkPress={(url) => {
              if (url) {
                LinkURL(url, true);
                return false;
              }
              return true;
            }}
          >
            {body}
          </Markdown>
        ))}
      </SS.CtnrBody>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {WIDTH > 996 ? (
          <RNMasonryScroll
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            columns={4}
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
        ) : (
          <FlatList
            data={_contents}
            renderItem={({ item: image, index: imageIndex }) => {
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
            }}
          />
        )}
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
        visible={route.params["project"]["title"].includes(
          "LUCC Winter Jacket"
        )}
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
    backgroundColor: "background",
    paddingTop: spacing(5),
  })),
  CtnrImg: sstyled(Animatable.View)((p) => ({
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "surface",
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
    backgroundColor: "background",
  })),
  //*----Txt-SECTION ----------
  Headline: sstyled(Txt.H4)((p) => ({
    // fontSize: 26,
    color: "text",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: spacing(2),
    paddingHorizontal: spacing(6),
  })),
  Label: sstyled(Txt.P2)((p) => ({ width: p.chieuRong, textAlign: "center" })),
  CtnrBody: sstyled(View)({
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: ["5%", "10%", "20%"],
    marginRight: ["5%", "10%", "20%"],
  }),
  S: {
    IMG_CTNR: {
      margin: 10,
      borderRadius: 10,
      overflow: "hidden",
    } as ImageStyle,
  },
};
