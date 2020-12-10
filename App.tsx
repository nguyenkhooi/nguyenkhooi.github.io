import * as eva from "@eva-design/eva";
import { NavigationContainerRef } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import { Toasty } from "components";
import { ThemeProvider } from "engines";
import { AppProvider } from "engines/providers/app-provider";
import * as React from "react";
import {
  AppNavigator,
  canExit,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from "screens";
import { fetchi18n } from "utils";

function App() {
  const [_isReady, shouldReady] = React.useState(true);
  //* ----RNAV-SECTION -------------------------------
  const navigationRef = React.useRef<NavigationContainerRef>(null);
  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence();

  //* ----I18N-SECTION -------------------------------
  React.useEffect(function getI18n() {
    fetchi18n().then(
      (r) =>
        r.code == "I18N_DONE" &&
        setTimeout(() => {
          shouldReady(true);
        }, 1000)
    );
  }, []);
  return (
    !!_isReady && (
      <AppProvider>
        <AppNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
        <Toasty ref={(ref) => Toasty.setRef(ref)} />
      </AppProvider>
    )
  );
}

export default App;
