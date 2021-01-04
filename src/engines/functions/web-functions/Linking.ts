import { Linking as RNLinking, Platform } from "react-native";

/**
 * Fn to open url on ios, android and web,
 * with option to `open in new tab` for web
 * ---
 * @version 0.10.30
 * @author nguyenkhooi
 */
export const LinkURL = (url: string, newTab?: boolean) => {
  if (Platform.OS == "web" && !!newTab) {
    window.open(url, "_blank");
  } else {
    RNLinking.openURL(url); // normal Linking react-native
  }
};
