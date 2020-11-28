import * as eva from "@eva-design/eva";
import { NavigationContainerRef } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import { Toasty } from "components";
import { ThemeProvider } from "engines";
import * as React from "react";
import {
  AppNavigator,
  canExit,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence
} from "screens";
import { ENUM_Theme, themeDark, themeLight } from "utils";

function App() {
  const [_theme, setTheme] = React.useState<ENUM_Theme>("themeLight");
  const navigationRef = React.useRef<NavigationContainerRef>();

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence();
  return (
    <ThemeProvider theme={_theme} setTheme={setTheme}>
      <ApplicationProvider
        {...eva}
        theme={_theme == "themeLight" ? themeLight : themeDark}
      >
        <AppNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
        <Toasty ref={(ref) => Toasty.setRef(ref)} />
      </ApplicationProvider>
    </ThemeProvider>
  );
}

export default App;
