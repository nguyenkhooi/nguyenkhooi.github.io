import React from "react";
//@ts-check
import { Dimensions, Platform, StatusBar } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

// export * from "react-native-size-matters"

export { moderateScale as scale, moderateScale, verticalScale };
export * from "./device.helpers";
export * from "./scaling.helpers";
