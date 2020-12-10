import { Text, TextProps } from "@ui-kitten/components";
import { spacing } from "utils";
// import { scale } from "utils";
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
  fontSize: p.ms(15),
  fontWeight: "400",
}));
const P2 = sstyled(Text)((p) => ({
  fontSize: p.ms(13),
  fontWeight: "400",
}));
const C1 = sstyled(Text)((p) => ({
  fontSize: p.ms(12),
  fontWeight: "400",
}));
const C2 = sstyled(Text)((p) => ({
  fontSize: p.ms(12),
  fontWeight: "400",
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
}
// export const Txt = Text;
