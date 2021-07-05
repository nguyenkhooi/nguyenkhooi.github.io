import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import { useAppContext } from "engines";
import * as R from "ramda";
import * as React from "react";
import { KeyOf } from "utils";
// import { HomeScreen } from "../home-screen/HomeScreen";
import { linking, presetNavConfig } from "./navigation-utils";
// import { PrimaryStack } from "./primary-navigator";
import { PrimaryStack } from "./primary.navigator";

const screenProps = {
  Primary: { component: PrimaryStack },
};
const __ROOT = R.keys(screenProps);
const Stack = createStackNavigator<typeof screenProps>();
export type enum_RootStack = KeyOf<typeof screenProps>;

export const RootStack = (props) => {
  const { C, dark, setTheme } = useAppContext();
  const screenOptions: StackNavigationOptions = {
    ...TransitionPresets.FadeFromBottomAndroid,
    transitionSpec: {
      open: presetNavConfig.durationSpec,
      close: presetNavConfig.durationSpec,
    },
    headerStyle: {
      elevation: 0,
      backgroundColor: C.background,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      //   fontFamily: CIRCULAR_BOLD,
      fontSize: 0,
    },

    headerTitleAlign: "center",
  };

  return (
    <Stack.Navigator
      initialRouteName="Primary"
      headerMode="none"
      screenOptions={screenOptions}
    >
      {__ROOT.map((screen) => (
        <Stack.Screen name={screen} {...screenProps[screen]} key={screen} />
      ))}
    </Stack.Navigator>
  );
};

/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
export const AppNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const { isReady } = useAppContext();
  return (
    isReady && (
      <NavigationContainer {...props} ref={ref} linking={linking}>
        <RootStack />
      </NavigationContainer>
    )
  );
});

AppNavigator.displayName = "AppNavigator";
