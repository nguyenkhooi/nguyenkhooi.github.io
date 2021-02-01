import { Text, TextProps } from "@ui-kitten/components";
import Markdown, { MarkdownProps } from "react-native-markdown-display";
import { spacing } from "utils";
import { sstyled } from "../sstyled/sstyled";

const H1 = sstyled(Text)((p) => ({
  fontSize: p.ms(36),
  fontWeight: "800",
}));
const H2 = sstyled(Text)((p) => ({
  fontSize: p.ms(32),
  fontWeight: "800",
}));
const H3 = sstyled(Text)((p) => ({
  fontSize: p.ms(30),
  fontWeight: "800",
}));
const H4 = sstyled(Text)((p) => ({
  fontSize: p.ms(26),
  fontWeight: "800",
}));
const H5 = sstyled(Text)((p) => ({
  fontSize: p.ms(22),
  fontWeight: "800",
}));
const H6 = sstyled(Text)((p) => ({
  fontSize: p.ms(18),
  fontWeight: "800",
}));
const S1 = sstyled(Text)((p) => ({
  fontSize: p.ms(15),
  fontWeight: "600",
}));
const S2 = sstyled(Text)((p) => ({
  fontSize: p.ms(13),
  fontWeight: "600",
}));
const P1 = sstyled(Text)((p) => ({
  fontSize: p.ms(14),
  fontWeight: "400",
  letterSpacing: 0.5,
}));
const P2 = sstyled(Text)((p) => ({
  fontSize: p.ms(12),
  fontWeight: "400",
  letterSpacing: 0.5,
}));
const C1 = sstyled(Text)((p) => ({
  fontSize: p.ms(12),
  fontWeight: "400",
}));
const C2 = sstyled(Text)((p) => ({
  fontSize: p.ms(12),
  fontWeight: "400",
}));
const $Title = sstyled(H6)((p) => ({
  paddingLeft: spacing(5),
  color: p.C.grey600,
}));

const Md = sstyled(Markdown)((p) => ({
  body: {
    color: p.C.text,
    fontSize: p.ms(14),
    fontWeight: "400",
    letterSpacing: 0.5,
  },
  // body: (node, children, parent, styles) => <P1 key={node.key}>{children}</P1>,

  heading1: { color: p.C.text, fontSize: p.ms(36) * 0.6, fontWeight: "800" },
  heading2: { color: p.C.text, fontSize: p.ms(32) * 0.6, fontWeight: "800" },
  heading3: { color: p.C.text, fontSize: p.ms(30) * 0.6, fontWeight: "800" },
  heading4: { color: p.C.text, fontSize: p.ms(26) * 0.6, fontWeight: "800" },
  heading5: { color: p.C.text, fontSize: p.ms(22) * 0.6, fontWeight: "800" },
  heading6: { color: p.C.text, fontSize: p.ms(18) * 0.6, fontWeight: "800" },
  hr: { color: p.C.text },
  strong: { color: p.C.text, fontWeight: "700" },
  em: { color: p.C.errorRed },
  s: { color: p.C.text },
  blockquote: { color: p.C.text, fontWeight: "600" },
  bullet_list: { color: p.C.text },
  ordered_list: { color: p.C.text },
  list_item: { color: p.C.text },
  code_inline: { color: p.C.text },
  code_block: { color: p.C.text, fontSize: 14 },
  fence: { color: p.C.text },
  table: { color: p.C.text },
  thead: { color: p.C.text },
  tbody: { color: p.C.text },
  th: { color: p.C.text },
  tr: { color: p.C.text },
  td: { color: p.C.text },
  link: { color: p.C.text },
  blocklink: { color: p.C.text },
  image: { color: p.C.text },
  text: { color: p.C.text },
  textgroup: { color: p.C.text },
  paragraph: { color: p.C.text },
  hardbreak: { color: p.C.text },
  softbreak: { color: p.C.text },
  pre: { color: p.C.text },
  inline: { color: p.C.text },
  span: { color: p.C.text },
}));

/**
 * A text component of the project,
 * depending on ui-kitten's Text
 * ---
 * @example
 * ```
 * <Txt>👋</Txt>
 * ```
 * ---
 * @version 0.11.25
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
  Md?: React.FC<MarkdownProps>;
}
// export const Txt = Text;
