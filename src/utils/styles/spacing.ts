import { Dimensions } from "react-native";

/**
 * NOTE TO DEVS:
 *
 * Spacing should consistent and whitespace thought of as a first class technique up
 * there with color and typefaces.
 *
 * Which type of scale you use is based on the design.
 *
 * If you've got simpler app, you may only need 6 items.  Or maybe you want a spacing scale
 * to be named:
 *
 * export const spacing = {
 *   tiny: 4,
 *   small: 8,
 *   medium: 12,
 *   large: 24,
 *   huge: 64
 * }
 *
 * Whatever you choose, try to stick with these, and not freestyle it everywhere.
 *
 * Feel free to delete this block.
 */

/**
 * The available spacing.
 *
 * Here's the rough guideline.  Customize this for you usage.  It's ok to put exceptions
 * within the components themselves if they are truly exceptions.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 *
 * 1 = tiny    - elements contextually close to each other
 *
 * 2 = smaller - for groups of closely related items or perhaps borders
 *
 * 3 = small   - ?
 *
 * 4 = medium  - ?
 *
 * 5 = medium+ - ?
 *
 * 6 = large   - between groups of content that aren't related?
 *
 * 7 = huge    - ?
 *
 * 8 = massive - an uncomfortable amount of whitespace
 */

export const spacing = (
  rate: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
  direction: "h" | "v" = "h",
  width?: number,
  height?: number
) => {
  const _height = height || Dimensions.get("screen").height;
  const _width = width || Dimensions.get("screen").width;
  return Math.pow(direction == "h" ? _height : _width, rate / 10);
};
// export const spacing = [
//   IS_WEB ? scale(0) : scale(0),
//   IS_WEB ? scale(104) : scale(4),
//   IS_WEB ? scale(108) : scale(8),
//   IS_WEB ? scale(112) : scale(12),
//   IS_WEB ? scale(116) : scale(16),
//   IS_WEB ? scale(124) : scale(24),
//   IS_WEB ? scale(132) : scale(32),
//   IS_WEB ? scale(148) : scale(48),
//   IS_WEB ? scale(164) : scale(64),
// ];
