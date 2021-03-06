import { NavigationContainerRef } from "@react-navigation/native";
import { Toasty } from "components";
import { AppProvider } from "engines/providers/app-provider";
import * as React from "react";
import {
  AppNavigator,
  canExit,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from "screens";

function App() {
  //* ----RNAV-SECTION -------------------------------
  const navigationRef = React.useRef<NavigationContainerRef>(null);
  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence();

  return (
    <AppProvider>
      <AppNavigator
        ref={navigationRef}
        initialState={initialNavigationState}
        onStateChange={onNavigationStateChange}
      />
      <Toasty ref={(ref) => Toasty.setRef(ref)} />
    </AppProvider>
  );
}

export default App;
