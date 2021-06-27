import { TextProps } from "@ui-kitten/components";
import { useAppContext } from "engines";
import { Platform, Text } from "react-native";
import Markdown, { MarkdownProps } from "react-native-markdown-display";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { dColors, IS_ANDROID, themeDark, themeLight } from "utils";
// import { scale } from "utils";
import { sstyled } from "../sstyled/sstyled";
import * as React from "react";
// import { Text, useSx } from "dripsy";

//! Temporary set scale == no scale for proper Web appearance
let scale = (size: number) => size;

/**
 * ### A reanimated Text, with smooth theme colors change
 *  - If apply backgroundColor, put it in the inline style
 *  ----
 *  @version 21.06.21
 *  -  *Build product*
 *  @author  K
 *
 **/
// export function RText(params: TextProps) {
//   const { C, dark } = useAppContext();

//   const progress = useDerivedValue(() => {
//     return dark ? withTiming(1) : withTiming(0);
//   }, [dark]);

//   const rStyle = useAnimatedStyle(() => {
//     let _style = params.style?.reduce((r, c) => Object.assign(r, c), {});
//     return {
//       color: interpolateColor(
//         progress.value,
//         [0, 1],
//         [themeLight.text, themeDark.text]
//       ),
//       ..._style,
//     };
//   });

//   return <Text as={Animated.Text} {...params} style={[rStyle, params.style]} />;
// }

export const RText = Text;

const H1xl = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [52, 54, 56],
  // fontFamily: "Montserrat_800ExtraBold",
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));

const H1 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [7, 8, 9],
  // fontFamily: "Montserrat_800ExtraBold",
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H2 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [6, 7, 8],

  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H3 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [5, 6, 7],
  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H4 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [4, 5, 6],
  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H5 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [3, 4, 5],
  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H6 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [2, 3, 4],
  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const S1 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [3, 4, 5],
  // fontFamily: "Inter_600SemiBold",
  fontWeight: Platform.select({ web: "600", ios: "600", android: "bold" }),
}));
const S2 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [2, 3, 4],
  // fontFamily: "Inter_600SemiBold",
  fontWeight: Platform.select({ web: "600", ios: "600", android: "bold" }),
}));
const P1 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [1, 1, 2],
  // fontFamily: "Inter_400Regular",
  fontWeight: Platform.select({ web: "400", ios: "400", android: "normal" }),
  // letterSpacing: 0.5,
}));
const P2 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: [1, 1, 2],
  // fontFamily: "Inter_400Regular",
  fontWeight: Platform.select({ web: "400", ios: "400", android: "normal" }),
  // letterSpacing: 0.5,
}));
const C1 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 1,
  // fontFamily: "Inter_500Medium",
  fontWeight: Platform.select({ web: "500", ios: "500", android: "normal" }),
}));
const C2 = sstyled(RText)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 1,
  // fontFamily: "Inter_500Medium",
  fontWeight: Platform.select({ web: "500", ios: "500", android: "normal" }),
}));
const $Title = sstyled(S1)((p) => ({
  padding: scale(10),
  color: "grey600",
  // // fontFamily: "Inter_600SemiBold",
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
  // fontFamily: "Montserrat_800ExtraBold",
}));
const Indicator = sstyled(C2)((p) => ({
  textAlign: "center",
  color: "dim",
  fontSize: scale(12),
  fontWeight: Platform.select({ web: "400", ios: "400", android: "normal" }),
}));

// let _markdownRule = {
//   blockquote,
// };

/**
 * Reference: https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/styles.js
 */
//@ts-ignore
const Md = sstyled(Markdown)(({ C }: { C: dColors }) => ({
  heading1: {
    color: "red",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 36,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading2: {
    color: "red",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 32,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading3: {
    color: "red",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 30,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading4: {
    color: "red",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 26,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading5: {
    color: "red",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 22,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading6: {
    color: "red",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 18,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  body: {
    color: "red",
    borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
    fontSize: 30,
    fontWeight: "400",
  },
  hr: { color: "text" },
  strong: {
    color: "red",
    borderRadius: 73,

    fontWeight: "700",
  },
  em: { color: "errorRed" },
  s: { color: "text" },
  blockquote: {
    backgroundColor: "surface",
    fontWeight: "600",
    margin: 4,
  },
  bullet_list: { color: "text" },
  ordered_list: { color: "text" },
  list_item: { color: "text" },
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
  table: { color: "text" },
  thead: { color: "text" },
  tbody: { color: "text" },
  th: { color: "text" },
  tr: { color: "text" },
  td: { color: "text" },
  link: { color: "text" },
  blocklink: { color: "text" },
  image: { color: "text" },
  text: { color: "red" },
  textgroup: { color: "text" },
  paragraph: { color: "red" },
  hardbreak: { color: "text" },
  softbreak: { color: "text" },
  pre: { color: "text" },
  inline: { color: "text" },
  span: { color: "text" },
}));

/**
 * ###  A text component of the project,
 *  - Based on ui-kitten's Text
 * ---
 * @example
 * ```
 * <Txt>👋</Txt>
 * <Txt.H1>Heading 1</Txt.H1>
 * ```
 * ---
 * @version 1.1.29
 * - *No more `ms(size)` to reduce font size*
 */
export const Txt: dTxtC0 = P1;
Txt.H1xl = H1xl;
Txt.H1 = H1;
Txt.H2 = H2;
Txt.H3 = H3;
Txt.H4 = H4;
Txt.H5 = H5;
Txt.H6 = H6;
Txt.S1 = S1;
Txt.S2 = S2;
Txt.P1 = P1;
Txt.P2 = P2;
Txt.C1 = C1;
Txt.C2 = C2;
Txt.$Title = $Title;
Txt.Indicator = Indicator;
Txt.Md = Md;

export interface dTxtC0 extends React.FC<TextProps> {
  H1xl: typeof H1xl;
  /** Heading 1 */
  H1?: typeof H1;
  H2?: typeof H2;
  H3?: typeof H3;
  H4?: typeof H4;
  H5?: typeof H5;
  H6?: typeof H6;
  /** Subheading 1 */
  S1?: typeof S1;
  S2?: typeof S2;
  P1?: typeof P1;
  P2?: typeof P2;
  C1?: typeof C1;
  C2?: typeof C2;
  /** Section Title */
  $Title?: typeof $Title;
  Indicator?: typeof Indicator;
  Md?: React.FC<MarkdownProps>;
}
// export const Txt = Text;
