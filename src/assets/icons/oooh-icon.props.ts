// import { IPcolors, IPpalette } from "./utils-typings";
import { ViewStyle } from "react-native";
import { KeyOf } from "utils";
import { iconOptions } from "./oooh-icon";

/**
 * A list of icon names used in IconOooh for type-check
 */
export type ICON_NAME = KeyOf<typeof iconOptions>;

/**
 * Props of Icon<>
 */
export interface dIconOooh {
  name: ICON_NAME;
  size?: number;
  color?: string;
  solid?: boolean;
  containerStyle?: ViewStyle;
  preset?: "default" | "safe" | "circular" | "header";
  disabled?: boolean;
  onPress?(): void;
}
export type ICON_PKG =
  | "ion"
  | "fa"
  | "fa5"
  | "feather"
  | "material"
  | "material-community"
  | "fontisto"
  | "entypo"
  | "simple-line-icon"
  | "antdesign";

export type dIconOptions = {
  type: ICON_PKG;
  icon: string;
  scale?: number;
  solid?: boolean;
};
