/* eslint-disable @typescript-eslint/interface-name-prefix */
import { TextStyle } from "react-native";
import { colors } from "utils";

/** TODO 📕 this */
/**
 * @see https://stackoverflow.com/a/49286056
 */
export type ValueOf<T> = T[keyof T];
export type KeyOf<T> = keyof T;
export type dColors = typeof colors;
export type ENUM_Palette = ValueOf<dColors>;

export type dTypo = {
  largeTitle: TextStyle;
  headline: TextStyle;
  title: TextStyle;
  titleEmphasized: TextStyle;
  subtitle: TextStyle;
  subtitleEmphasized: TextStyle;
  body: TextStyle;
  bodyEmphasized: TextStyle;
  caption: TextStyle;
  captionEmphasized: TextStyle;
};

/**
 * fr theme
 */
export interface dTheme {
  C: dColors;
  dark?: boolean;
}

/**
 * List of theme index
 */
export type ENUM_Theme = "themeLight" | "themeDark"; //* Add more theme index here if wanted
export interface PROPS_ThemeProvider {
  theme: ENUM_Theme;
  setTheme?(theme: ENUM_Theme): void;
  children: React.ReactNode;
}

export type ENUM_FontFamily =
  | "Montserrat-Bold"
  | "Roboto_medium"
  | "Roboto"
  | "System";
