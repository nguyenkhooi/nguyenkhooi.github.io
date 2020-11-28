import React from "react";
import { Dimensions } from "react-native";

/**
 * A hook that gets dynamic dimensions,
 * and use such value to extend `react-native-size-matters`
 * ---
 * @example
 * ```
 * const { WIDTH, HEIGHT, s, vs, ms, mvs } = useDimension("window")
 *
 * ```
 * ---
 * @version 0.9.19
 * @author nguyenkhooi
 */
export function useDimension(type: "screen" | "window" = "window"): dDime {
  const [dimensions, setDimensions] = React.useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };
  React.useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const WIDTH = dimensions[type].width || Dimensions.get("window").width;
  const HEIGHT = dimensions[type].height || Dimensions.get("window").height;

  /**
   * Extensions of `react-native-size-matters`,
   * using dynamic WIDTH and HEIGHT
   * ---
   *
   * @see react-native-size-matters
   */
  //Default guideline sizes are based on standard ~5" screen mobile device
  const guidelineBaseWidth = 350;
  const guidelineBaseHeight = 680;
  const [shortDimension, longDimension] =
    WIDTH < HEIGHT ? [WIDTH, HEIGHT] : [HEIGHT, WIDTH];

  let s = (size: number) => (shortDimension / guidelineBaseWidth) * size;
  let vs = (size: number) => (longDimension / guidelineBaseHeight) * size;
  let ms = (size: number, factor = 0.5) => size + (s(size) - size) * factor;
  let mvs = (size: number, factor = 0.5) => size + (vs(size) - size) * factor;
  return { WIDTH, HEIGHT, s, vs, ms, mvs };
}

export interface dDime {
  WIDTH: number;
  HEIGHT: number;
  s(size: number): number;
  vs(size: number): number;
  ms(size: number): number;
  mvs(size: number): number;
}
