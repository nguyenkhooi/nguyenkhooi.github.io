// import { Avatar } from "@ui-kitten/components";
// import { img } from "assets";
// import { sstyled, TouchableWeb, Txt } from "components";
// import { useAppContext } from "engines";
// import * as React from "react";
// import { Image, View } from "react-native";
// import * as Animatable from "react-native-animatable";
// import { Navigation } from "screens";
// import { IPSCR, spacing, THEME, tr, useDimension } from "utils";

// interface d$_Intro extends IPSCR {
//   scrollToWork(): void;
//   scrollToExp(): void;
// }
// export function S_Intro(props: d$_Intro) {
//   const { scrollToWork, scrollToExp } = props;
//   const { C, dark, setTheme } = useAppContext();
//   const { HEIGHT, WIDTH } = useDimension("window");
//   const [_color, setColor] = React.useState(C.text);
//   const [_underline, setUnderline] = React.useState<"none" | "underline">(
//     "none"
//   );

//   return (
//     <View
//       style={{
//         height: HEIGHT,
//         justifyContent: "center",
//       }}
//     >
//       <NiAvatar />
//       <Animatable.View
//         animation="fadeIn"
//         delay={1000}
//         style={{
//           paddingHorizontal: spacing(6),
//           paddingRight: WIDTH < 1000 ? spacing(6) : spacing(9),
//         }}
//       >
//         <TouchableWeb
//           onMouseEnter={() => {
//             setColor(C.dim);
//             setUnderline("underline");
//           }}
//           onMouseLeave={() => {
//             setColor(C.text);
//             setUnderline("none");
//           }}
//         >
//           <Txt.H6
//             onPress={() => {
//               setTheme(dark ? THEME.LIGHT : THEME.DARK);
//             }}
//           >
//             {tr("intro-1")} {dark ? "🕶️" : "👋"}{" "}
//           </Txt.H6>

//           <Txt.S1 style={{ color: _color }} adjustsFontSizeToFit={true}>
//             {tr("intro-2")}
//             <TxtLink
//               style={{ textDecorationLine: _underline }}
//               onPress={scrollToWork}
//             >
//               {" "}
//               {tr("intro-3")}{" "}
//             </TxtLink>
//             {tr("intro-4")}
//             <TxtLink
//               style={{ textDecorationLine: _underline }}
//               onPress={scrollToExp}
//             >
//               {" "}
//               {tr("intro-5")}{" "}
//             </TxtLink>
//             {"\n"}
//             {tr("intro-6")}
//             <TxtLink
//               style={{ textDecorationLine: _underline }}
//               onPress={() => Navigation.navigate("About")}
//             >
//               {" "}
//               {tr("intro-7")}
//             </TxtLink>{" "}
//             {tr("intro-8")}
//             <TxtLink
//               style={{ textDecorationLine: _underline }}
//               onPress={() => Navigation.navigate("About")}
//             >
//               {" "}
//               {tr("intro-9")}
//             </TxtLink>
//           </Txt.S1>
//         </TouchableWeb>
//       </Animatable.View>
//     </View>
//   );
// }

// const TxtLink = sstyled(Txt.S1)({
//   // fontSize: 29,
//   fontWeight: "500",
//   fontStyle: "italic",
// });

// const NiAvatar = (props) => {
//   const { WIDTH } = useDimension();
//   const { dark, setTheme } = useAppContext();
//   const refShades = React.useRef<Animatable.View>();
//   React.useEffect(
//     function movingShades() {
//       dark ? refShades.current.bounce(500) : refShades.current.bounceOutUp(500);
//     },
//     [dark]
//   );

//   const [tooltip, setTooltip] = React.useState<"Let's hi-five!" | "Noice">(
//     "Let's hi-five!"
//   );
//   const [visible, setVisible] = React.useState(false);
//   return (
//     <View
//       style={{
//         width: 200,
//         height: 200,
//         // borderWidth: 1,
//         paddingHorizontal: spacing(6),
//       }}
//     >
//       {/* <TouchableOpacity
//         onPress={() => {
//           setTheme(dark ? THEME.LIGHT : THEME.DARK);
//         }}
//       > */}
//       <Avatar
//         style={{
//           width: 200,
//           height: 200,
//           // transform: [{ rotate: "-10deg" }],
//         }}
//         source={img.khoi}
//       />
//       {/* </TouchableOpacity> */}
//       <Animatable.Image
//         ref={refShades}
//         useNativeDriver={true}
//         easing={"ease-out-cubic"}
//         style={{
//           position: "absolute",
//           top: 45,
//           left: 118,
//           width: 80,
//           height: 80,
//         }}
//         source={img.shades}
//       />

//       <SS.CtnrHiFive
//         onPress={() => {
//           setTooltip(tooltip == "Noice" ? "Let's hi-five!" : "Noice");
//           setTheme(dark ? THEME.LIGHT : THEME.DARK);
//         }}
//         onMouseEnter={() => {
//           setVisible(true);
//           //   setColor(C.dim);
//           //   setUnderline("underline");
//         }}
//         onMouseLeave={() => {
//           setVisible(false);
//           //   setColor(C.text);
//           //   setUnderline("none");
//         }}
//       >
//         <Image source={img.wavingHand} style={{ width: 40, height: 40 }} />
//         {visible && <Txt.C2>{tr(tooltip)}</Txt.C2>}
//       </SS.CtnrHiFive>
//       {/* <Shades style={{ position: "absolute" }} /> */}
//     </View>
//   );
// };

// const SS = {
//   CtnrHiFive: sstyled(TouchableWeb)((p) => ({
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 50,
//     height: 50,
//     flexDirection: "row",
//   })),
// };

import {
    Button,
    IndexPath,
    Layout,
    Select,
    SelectItem,
    Tooltip
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

const placements = [
  "top",
  "top start",
  "top end",
  "bottom",
  "bottom start",
  "bottom end",
  "left",
  "left start",
  "left end",
  "right",
  "right start",
  "right end",
];

export const S_Intro = () => {
  const [visible, setVisible] = React.useState(false);
  const [placementIndex, setPlacementIndex] = React.useState(
    new IndexPath(1, 0)
  );
  const placement = placements[placementIndex.row];

  const onPlacementSelect = (index) => {
    setPlacementIndex(index);
  };

  const renderToggleButton = () => (
    <Button onPress={() => setVisible(true)}>TOGGLE TOOLTIP</Button>
  );

  const renderPlacementItem = (title) => <SelectItem title={title} />;

  return (
    <React.Fragment>
      <Select
        placeholder="Select Placement"
        value={placement}
        selectedIndex={placementIndex}
        onSelect={onPlacementSelect}
      >
        {placements.map(renderPlacementItem)}
      </Select>

      <Layout style={styles.buttonContainer} level="1">
        <Tooltip
          anchor={renderToggleButton}
          visible={visible}
          placement={placement}
          onBackdropPress={() => setVisible(false)}
        >
          Welcome to UI Kitten 😻
        </Tooltip>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 64,
  },
});
