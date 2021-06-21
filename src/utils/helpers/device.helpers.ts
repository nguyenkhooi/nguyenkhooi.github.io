import React from "react";
//@ts-check
import { Dimensions, Platform, StatusBar } from "react-native";
import {
  moderateScale as mS,
  verticalScale as vS,
} from "react-native-size-matters";

// export * from "react-native-size-matters"

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;

export const IS_ANDROID = Platform.OS === "android";
export const IS_WEB = Platform.OS === "web";

export const LOCAL_STORAGE_KEY = "mid5LocalStorage";

export function scale(number: number) {
  return IS_WEB ? number : mS(number);
}

export function moderateScale(number: number) {
  return IS_WEB ? number : mS(number);
}
export function verticalScale(number: number) {
  return IS_WEB ? number : vS(number);
}

/**
 * Check if device is iphoneX
 */
export function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe?: string) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

/**
 * @description Get bottom space "safe area" of the device. Especially useful for iphone X screen
 * @param safe - Safe padding around bottom space
 */
export function getBottomSpace(safe?: string) {
  if (safe) {
    return isIphoneX() ? 34 + scale(10) : scale(10);
  } else {
    return isIphoneX() ? 34 : 0;
  }
}
