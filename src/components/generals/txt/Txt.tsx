import { Text, TextProps } from "@ui-kitten/components";
import { Platform } from "react-native";
import Markdown, { MarkdownProps } from "react-native-markdown-display";
import { IS_ANDROID } from "utils";
// import { scale } from "utils";
import { sstyled } from "../sstyled/sstyled";

//! Temporary set scale == no scale for proper Web appearance
let scale = (size: number) => size;

const H1 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 9,
  // fontFamily: "Montserrat_800ExtraBold",
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H2 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 8,

  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H3 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 7,
  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H4 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 6,
  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H5 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 5,
  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const H6 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 4,
  // fontFamily: "Inter_800ExtraBold"
  fontWeight: Platform.select({ web: "800", ios: "800", android: "bold" }),
}));
const S1 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 4,
  // fontFamily: "Inter_600SemiBold",
  fontWeight: Platform.select({ web: "600", ios: "600", android: "bold" }),
}));
const S2 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 3,
  // fontFamily: "Inter_600SemiBold",
  fontWeight: Platform.select({ web: "600", ios: "600", android: "bold" }),
}));
const P1 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 2,
  // fontFamily: "Inter_400Regular",
  fontWeight: Platform.select({ web: "400", ios: "400", android: "normal" }),
  // letterSpacing: 0.5,
}));
const P2 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 2,
  // fontFamily: "Inter_400Regular",
  fontWeight: Platform.select({ web: "400", ios: "400", android: "normal" }),
  // letterSpacing: 0.5,
}));
const C1 = sstyled(Text)((p) => ({
  color: "text",
  borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
  fontSize: 1,
  // fontFamily: "Inter_500Medium",
  fontWeight: Platform.select({ web: "500", ios: "500", android: "normal" }),
}));
const C2 = sstyled(Text)((p) => ({
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
const Md = sstyled(Markdown)((p) => ({
  heading1: {
    color: "text",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 36,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading2: {
    color: "text",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 32,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading3: {
    color: "text",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 30,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading4: {
    color: "text",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 26,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading5: {
    color: "text",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 22,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  heading6: {
    color: "text",
    borderRadius: 73,
    marginTop: 4,
    marginBottom: 6,
    fontSize: 18,
    fontWeight: IS_ANDROID ? "bold" : "800",
  },
  body: {
    color: "text",
    borderRadius: 73, //* To create a "bordered" placeholder when text is being loaded
    fontSize: 20,
    fontWeight: "400",
  },
  hr: { color: "text" },
  strong: {
    color: "text",
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
  text: { color: "text" },
  textgroup: { color: "text" },
  paragraph: { color: "text" },
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
  /** Heading 1 */
  H1?: React.FC<TextProps>;
  H2?: React.FC<TextProps>;
  H3?: React.FC<TextProps>;
  H4?: React.FC<TextProps>;
  H5?: React.FC<TextProps>;
  H6?: React.FC<TextProps>;
  /** Subheading 1 */
  S1?: React.FC<TextProps>;
  S2?: React.FC<TextProps>;
  P1?: React.FC<TextProps>;
  P2?: React.FC<TextProps>;
  C1?: React.FC<TextProps>;
  C2?: React.FC<TextProps>;
  /** Section Title */
  $Title?: React.FC<TextProps>;
  Indicator?: React.FC<TextProps>;
  Md?: React.FC<MarkdownProps>;
}
// export const Txt = Text;
