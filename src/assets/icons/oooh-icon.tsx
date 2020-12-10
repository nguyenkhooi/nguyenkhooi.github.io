// import Octicons from "react-native-vector-icons/Octicons"
import * as R from "ramda";
import React from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//* rn-vector-icons imports
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { scale } from "utils";
import { dIconOptions, dIconOooh, ICON_PKG } from "./oooh-icon.props";

// const OoohMoon = createIconSetFromIcoMoon(
//   icoMoonConfig,
//   "IconOooh",
//   "iconcarp.ttf"
// );

/**
 * Icon Options to use with IconOooh<>
 */
export const iconOptions = {
  admin: { type: "fa5", icon: "user-tie" } as dIconOptions,
  arrow_left: {
    type: "fa5",
    icon: Platform.OS == "android" ? "arrow-left" : "chevron-left",
  } as dIconOptions,
  arrow_right: {
    type: "fa5",
    icon: Platform.OS == "android" ? "arrow-right" : "chevron-right",
  } as dIconOptions,
  arrow_down: {
    type: "fa5",
    icon: Platform.OS == "android" ? "arrow-down" : "chevron-down",
  } as dIconOptions,
  award: { type: "fa5", icon: "award" } as dIconOptions,
  bars: { type: "fa5", icon: "bars" } as dIconOptions,
  ban: { type: "fa5", icon: "ban" } as dIconOptions,
  bell: { type: "fa5", icon: "bell" } as dIconOptions,
  flag: { type: "fa5", icon: "flag" } as dIconOptions,
  calendar: { type: "fa5", icon: "calendar" } as dIconOptions,
  "calendar-alt": { type: "fa5", icon: "calendar-alt" } as dIconOptions,
  chat_bubble: {
    type: "ion",
    icon: "chatbubble",
  } as dIconOptions,
  chevron_right: {
    type: "fa5",
    icon: "chevron-right",
  } as dIconOptions,
  check: {
    type: "fa5",
    icon: "check",
  } as dIconOptions,
  compass: { type: "fa5", icon: "compass" } as dIconOptions,
  content_share: { type: "ion", icon: "share-social-sharp" } as dIconOptions,
  cog: { type: "fa5", icon: "cog" } as dIconOptions,
  contacts: { type: "fa5", icon: "address-book" } as dIconOptions,
  dot: { type: "fa5", icon: "circle" } as dIconOptions,
  dots_horizontal: { type: "fa5", icon: "ellipsis-h" } as dIconOptions,
  dots_vertical: { type: "fa5", icon: "ellipsis-v" } as dIconOptions,
  email: { type: "fa5", icon: "envelope-open-text" } as dIconOptions,
  eye: { type: "fa5", icon: "eye" } as dIconOptions,
  eye_slash: { type: "fa5", icon: "eye-slash" } as dIconOptions,
  exclamation_circle: {
    type: "fa5",
    icon: "exclamation-circle",
  } as dIconOptions,
  folder: { type: "fa5", icon: "folder" } as dIconOptions,
  hand_peace: { type: "fa5", icon: "hand-peace" } as dIconOptions,
  heart: { type: "fa5", icon: "heart" } as dIconOptions,
  home: { type: "fa5", icon: "home" } as dIconOptions,
  image: { type: "fa5", icon: "image" } as dIconOptions,
  install: { type: "entypo", icon: "install" } as dIconOptions,
  list: { type: "fa5", icon: "th-list" } as dIconOptions,
  lock: { type: "fa5", icon: "lock" } as dIconOptions,
  medal: { type: "fa5", icon: "medal" } as dIconOptions,
  minus: { type: "fa5", icon: "minus" } as dIconOptions,
  notification: { type: "entypo", icon: "notification" } as dIconOptions,
  pen: { type: "fa5", icon: "pen" } as dIconOptions,
  plus: { type: "fa5", icon: "plus" } as dIconOptions,
  placeholder: { type: "fa5", icon: "kickstarter-k" } as dIconOptions,
  profile: { type: "ion", icon: "ios-person-circle-sharp" } as dIconOptions,
  rocket: { type: "fa5", icon: "rocket" } as dIconOptions,
  refresh: { type: "ion", icon: "refresh" } as dIconOptions,
  share: { type: "fa5", icon: "share-alt" } as dIconOptions,
  sms: { type: "fa5", icon: "sms" } as dIconOptions,
  tools: { type: "fa5", icon: "tools" } as dIconOptions,
  send: { type: "fa", icon: "send" } as dIconOptions,
  trash: { type: "fa5", icon: "trash" } as dIconOptions,
  tv: { type: "fa5", icon: "tv" } as dIconOptions,
  videocam: { type: "ion", icon: "videocam" } as dIconOptions,
  people: { type: "ion", icon: "people" } as dIconOptions,
  unlock: { type: "fa5", icon: "unlock" } as dIconOptions,
  x: { type: "fa5", icon: "times" } as dIconOptions,
  /**
   * Card Brand Icon. Have to fit Stripe's brand name
   * @see https://stripe.com/docs/api/cards/object#card_object-brand
   */
  "american express": {
    type: "fontisto",
    icon: "american-express",
    scale: 0.8,
  } as dIconOptions,
  "diners club": { type: "fa5", icon: "cc-diners-club" } as dIconOptions,
  discover: { type: "fa5", icon: "cc-discover" } as dIconOptions,
  jcb: { type: "fa5", icon: "cc-jcb" } as dIconOptions,
  mastercard: { type: "fa5", icon: "cc-mastercard" } as dIconOptions,
  visa: { type: "fa5", icon: "cc-visa" } as dIconOptions,
};

/**
 * Main and the only Icon component of the whole codebase
 *
 * @version 1.12.3
 * -  *Add disabled icon's color*
 * @example
 *  <IconOooh preset={"safe"} name={"arrow_left"} size={30} color={"dodgerblue"} />
 */
export default function IconOooh(props: dIconOooh) {
  const {
    preset = "default",
    name = "placeholder",
    size = 20,
    color = "dodgerblue",
    solid = true,
    disabled,
    containerStyle = {},
    onPress,
  } = props;
  const _containerStyle: ViewStyle = R.mergeAll(
    R.flatten([presets(size)[preset].containerStyle, containerStyle])
  );
  const _iconStyle = R.mergeAll(
    R.flatten([
      presets(size)[preset].icon || presets(size).default.icon,
      {
        size,
        color: disabled ? "#69696940" : color,
        name,
      },
    ])
  );
  if (iconOptions[name] == undefined) {
    console.log("Icon err: icon " + name + " not existed in iconOptions!");
    return (
      <View
        style={{ ..._containerStyle, borderWidth: 1, borderColor: "tomato" }}
      />
    );
  } else {
    const { type, scale = 1, icon } = iconOptions[name];
    const { size, color } = _iconStyle;
    const BrandedIcon = getType(type);
    return (
      <TouchableOpacity
        activeOpacity={!!onPress ? 0.87 : 1}
        disabled={true}
        style={_containerStyle}
        onPress={onPress}
      >
        <BrandedIcon
          name={icon}
          solid={solid}
          size={size * scale}
          color={color}
        />
      </TouchableOpacity>
    );
  }
}

/** Get Icon type from `react-native-vector-icons */
const getType = (type: ICON_PKG) => {
  switch (type) {
    case "fa":
      return FontAwesome;
    case "fa5":
      return FontAwesome5;
    case "feather":
      return FeatherIcon;
    case "material":
      return MaterialIcon;
    case "material-community":
      return MaterialCommunityIcon;
    case "fontisto":
      return Fontisto;
    case "entypo":
      return EntypoIcon;
    case "simple-line-icon":
      return SimpleLineIcon;
    case "antdesign":
      return AntDesign;
    case "ion":
      return Ionicons;
    default:
      return MaterialIcon;
  }
};

export const presets = (size: number) => ({
  default: {
    containerStyle: null,
    icon: { name: null, size: scale(11), color: "black" },
  },
  safe: {
    containerStyle: { margin: scale(5) },
    icon: { name: null, size: scale(11), color: "black" },
  },
  header: {
    containerStyle: null,
    icon: { name: null, size: scale(24), color: "black" },
  },
  circular: {
    containerStyle: {
      borderRadius: size * 2,
      width: size * 1.8,
      height: size * 1.8,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: null,
  },
});
