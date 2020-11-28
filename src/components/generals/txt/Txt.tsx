import { Text } from "@ui-kitten/components";
// import { scale } from "utils";
import { sstyled } from "../sstyled/sstyled";

const H1: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(36),
  fontWeight: "800",
}));
const H2: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(32),
  fontWeight: "800",
}));
const H3: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(30),
  fontWeight: "800",
}));
const H4: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(26),
  fontWeight: "800",
}));
const H5: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(22),
  fontWeight: "800",
}));
const H6: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(18),
  fontWeight: "800",
}));
const S1: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(15),
  fontWeight: "600",
}));
const S2: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(13),
  fontWeight: "600",
}));
const P1: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(15),
  fontWeight: "400",
}));
const P2: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(13),
  fontWeight: "400",
}));
const C1: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(12),
  fontWeight: "400",
}));
const C2: typeof Text = sstyled(Text)((p) => ({
  fontSize: p.ms(12),
  fontWeight: "400",
}));

/**
 * A text component of the project,
 * depending on ui-kitten's Text
 * ---
 * @example
 * ```
 * <Txt.P1>👋</Txt.P1>
 * ```
 * ---
 * @version 0.10.20
 * - *Support dynaDime*
 */
export const Txt = {
  /** Heading 1 */
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  /** Subheading 1 */
  S1,
  S2,
  P1,
  P2,
  C1,
  C2,
};
// export const Txt = Text;
