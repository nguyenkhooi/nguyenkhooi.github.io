// import { IPcolors, IPpalette } from "./utils-typings";
import { ViewStyle } from "react-native";
import { KeyOf } from "utilities/";
import { iconOptions } from "./oooh-icon";

/**
 * A list of icon names used in IconOooh for type-check
 */
export type enum_IconName = KeyOf<typeof iconOptions>;

/**
 * Props of Icon<>
 */
export interface dIconOooh {
  name: enum_IconName;
  size: number;
  color: string;
  containerStyle?: ViewStyle;
  preset?: "default" | "safe" | "circular" | "header";
}
export type enum_IconPkg =
  | "ion"
  | "fa5"
  | "feather"
  | "material"
  | "material-community"
  | "fontisto"
  | "entypo"
  | "simple-line-icon"
  | "antdesign";

export type dIconOptions = { type: enum_IconPkg; icon: string; scale?: number };
