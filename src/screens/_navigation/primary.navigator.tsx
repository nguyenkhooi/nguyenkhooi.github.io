import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { IconOooh, img } from "assets";
import Color from "color";
import { useAppContext } from "engines/providers/app-provider";
import * as R from "ramda";
import React from "react";
import { Image, TextStyle, View } from "react-native";
import { GalleryScreen } from "screens/gallery-screen/GalleryScreen";
import ProjectScreen from "screens/project-screen/ProjectScreen";
import { IPSCR, KeyOf, spacing } from "utils";
import AboutScreen from "../about-screen/AboutScreen";
import HomeScreen from "../home-screen/HomeScreen";
import { Navigation, presetNavConfig } from "./navigation-utils";
const screenProps: {
  [name: string]: { component: any; options: StackNavigationOptions };
} = {
  // const screenProps = {
  Home: {
    component: HomeScreen,
    options: { ...presetNavConfig.noHeader, title: "Khoi Tran" },
  },
  About: {
    component: AboutScreen,
    options: {
      title: "About",
      headerTransparent: true,
    },
  },
  Project: {
    component: ProjectScreen,
    options: ({ route }) =>
      presetNavConfig.headerTitle({ route, param: "project", key: "title" }),
  },
  Gallery: {
    component: GalleryScreen,
    options: { headerTitle: "", headerTransparent: true },
  },
};

const __PRIMARY = R.keys(screenProps);
export type enum_PrimaryStack = KeyOf<typeof screenProps>;

export const PrimaryStack = (props: IPSCR) => {
  const { C } = useAppContext();
  const Stack = createStackNavigator<typeof screenProps>();

  const config: StackNavigationOptions = {
    ...TransitionPresets.ModalPresentationIOS,
    gestureEnabled: true,
    cardOverlayEnabled: true,
    animationEnabled: true,
    headerStyle: {
      elevation: 0,
      backgroundColor: C.background,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: C.text,
    } as TextStyle,
    headerBackImage: (props) => (
      <IconOooh
        name="x"
        color={C.hazardYellow}
        containerStyle={{ marginLeft: spacing(4) }}
      />
    ),
  };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="float"
      mode="modal"
      screenOptions={config}
    >
      {__PRIMARY.map((screen) => (
        <Stack.Screen
          name={screen}
          {...screenProps[screen]}
          key={screen}
          // options={screen == "Home" ? screenOptions : screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};
