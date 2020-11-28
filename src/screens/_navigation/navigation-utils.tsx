import {
  NavigationContainerRef,
  NavigationState,
  PartialState,
  RouteConfig,
  RouteProp,
} from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
// import { enum_HomeStack } from "./home-navigator";
import { enum_PrimaryStack } from "./primary.navigator";
import { enum_RootStack } from "./root.navigator";

type navigationRoute = enum_PrimaryStack | enum_RootStack;

/**
 * Setup navigation-service
 * 
 * @example
 * import {
    AppNavigator,
    canExit,
    setRootNavigation,
    useBackButtonHandler,
    useNavigationPersistence
  } from "screens";
  
  function App() {
    [...]
    const navigationRef = React.useRef<NavigationContainerRef>();

    setRootNavigation(navigationRef);
    useBackButtonHandler(navigationRef, canExit);
    const {
      initialNavigationState,
      onNavigationStateChange,
    } = useNavigationPersistence();
    [...]
  }
 */
export const Navigation = {
  navigate(name: navigationRoute, param?: any) {
    name; // eslint-disable-line no-unused-expressions
  },
  goBack() {}, // eslint-disable-line @typescript-eslint/no-empty-function
  resetRoot(state?: PartialState<NavigationState> | NavigationState) {}, // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  getRootState(): NavigationState {
    return {} as any;
  },
};

export const setRootNavigation = (
  ref: React.RefObject<NavigationContainerRef>
) => {
  for (const method in Navigation) {
    Navigation[method] = (...args: any) => {
      if (ref.current) {
        return ref.current[method](...args);
      }
    };
  }
};

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>
) {
  const route = state.routes[state.index];

  // Found the active route -- return the name
  if (!route.state) return route.name;

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state);
}

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 */
export function useBackButtonHandler(
  ref: React.RefObject<NavigationContainerRef>,
  canExit: (routeName: string) => boolean
) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    // We'll fire this when the back button is pressed on Android.
    const onBackPress = () => {
      const navigation = ref.current;

      if (navigation == null) {
        return false;
      }

      // grab the current route
      const routeName = getActiveRouteName(navigation.getRootState());

      // are we allowed to exit?
      if (canExitRef.current(routeName)) {
        // let the system know we've not handled this event
        return false;
      }

      // we can't exit, so let's turn this into a back action
      if (navigation.canGoBack()) {
        navigation.goBack();

        return true;
      }

      return false;
    };

    // Subscribe when we come to life
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    // Unsubscribe when we're done
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [ref]);
}

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(
  storage?: any,
  persistenceKey?: string
) {
  const [initialNavigationState, setInitialNavigationState] = useState();
  const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(
    true
  );

  const routeNameRef = useRef();
  const onNavigationStateChange = (state) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
      // track screens.
      __DEV__ && console.info("🗺️ Current route: ", currentRouteName);
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName;

    // Persist state to storage
    // storage.save(persistenceKey, state);
  };

  const restoreState = async () => {
    try {
      // const state = await storage.load(persistenceKey);
      // if (state) setInitialNavigationState(state);
    } finally {
      setIsRestoringNavigationState(false);
    }
  };

  useEffect(() => {
    if (isRestoringNavigationState) restoreState();
  }, [isRestoringNavigationState]);

  return { onNavigationStateChange, restoreState, initialNavigationState };
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes: navigationRoute[] = ["About"];
export const canExit = (routeName: navigationRoute) =>
  exitRoutes.includes(routeName);

/**
 * Preset Navigation Config
 */
export const nConfig = {
  durationSpec: {
    config: { duration: 1000 },
  },
  noHeader: { headerShown: false },
  headerTitle: ({
    route,
    param,
    key,
  }: {
    route: RouteProp<any, any>;
    param: string;
    key: string | number;
  }) => ({ title: route.params[param][key] }),
  // backButtonAsX:
  noTitle: {
    headerTitleStyle: {
      fontSize: 0,
    },
  },
};
