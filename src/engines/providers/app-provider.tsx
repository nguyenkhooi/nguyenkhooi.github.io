import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import React, { useContext, useState } from "react";
import {
  colors,
  dColors,
  fetchi18n,
  LANG,
  THEME,
  themeDark,
  themeLight,
} from "utils";
import I18n from "i18n-js";

/** 
 * App Provider,
 * providing `theme`, frbs `userDoc(_)`, and `Kitten's provider`
 * @version 0.11.29
 * - *Add roles: string[_]*
 * @author nguyenkhooi
 * ---
 * @example
 *  In `app.tsx`
 *    import {AppProvider} from `engines`
 *    ...
 *    const [_theme,setTheme] = React.useState<eTheme>(`themeLight`)
 *    ...
 *    return (
        <RootStoreProvider value={rootStore}>
          <AppProvider theme={_theme} setTheme={setTheme}> <--- here
            <...>
          </AppProvider> <--- and here
        </RootStoreProvider>
      )
    `To setup theme switcher`
      import {useAppContext} from "engines"
      ...
      const ThemeSwitcherButton = (props) => {
        const {C, dark, setTheme} = useAppContext()
        return (
          <Button onPress={()=> setTheme(dark? `themeLight` : `themeDark`)} >
            {dark? `Switch to Light Theme` : `Switch to Dark Theme`}
          </Button>
        )
      }
 */
export function AppProvider({ children }) {
  const [_isReady, shouldReady] = React.useState(false);

  //*----THEME-SECTION --------------------
  const [_theme, setTheme] = useState<THEME>(THEME.LIGHT);
  const [_colors, setColors] = React.useState(
    _theme == THEME.DARK ? themeDark : themeLight
  );
  const [_dark, setDark] = React.useState(_theme === THEME.DARK ? true : false);

  React.useEffect(
    function setupTheme() {
      switch (_theme) {
        case THEME.LIGHT:
          setColors(themeLight);
          setDark(false);
          // setTheme(THEME.LIGHT);
          // storage.save("@app_preferences", { theme: "themeLight" });
          // AsyncStorage.setItem("@preferences", JSON.stringify({ theme: "themeLight" }))
          break;
        case THEME.DARK:
          setColors(themeDark);
          setDark(true);
          // setTheme(THEME.DARK);
          // AsyncStorage.setItem("@preferences", JSON.stringify({ theme: "themeDark" }))
          break;
        default:
          setColors(themeLight);
          setDark(false);
          // setTheme(THEME.LIGHT);
          // AsyncStorage.setItem("@preferences", JSON.stringify({ theme: "themeLight" }))
          break;
      }
      console.log("💋 Current theme: ", _theme.toString());

      // setTimeout(() => {
      //   //* Base theme value to frbs
      //   userDocState?.path &&
      //     _theme !== userDocState?.doc?.theme &&
      //     db.doc(userDocState.path).update({
      //       theme: _theme,
      //     });
      // }, 1000);
    },
    [_theme]
  );

  //*---- I18N-SECTION ---------------
  const [i18n, setI18N] = React.useState<LANG>(LANG.VI);
  const [lang, setLang] = React.useState({});
  const vi = React.useRef({});
  const en = React.useRef({});
  React.useEffect(function ini18() {
    fetchi18n().then((r) => {
      if (r.code == "I18N_DONE") {
        const _vi = r.lang.vi;
        const _en = r.lang.en;
        vi.current = _vi;
        en.current = _en;
        setLang(_vi);
        shouldReady(true);
      }
    });
  }, []);
  React.useEffect(
    function toggleI18N() {
      I18n.locale = i18n;
      setLang(i18n === LANG.EN ? en.current : vi.current);
    },
    [i18n]
  );

  return (
    <AppContext.Provider
      value={{
        C: _colors,
        dark: _dark,
        setTheme: setTheme,
        i18n,
        setI18N,
        lang,
        setLang,
        isReady: _isReady,
      }}
    >
      <ApplicationProvider
        {...eva}
        theme={_theme == THEME.LIGHT ? themeLight : themeDark}
      >
        {children}
      </ApplicationProvider>
    </AppContext.Provider>
  );
}

export const AppContext = React.createContext<dAppContext>({
  C: colors,
  dark: false,
  setTheme: () => {},
  i18n: LANG.VI,
  lang: {},
  isReady: false,
});

/**
 * App context hook
 *
 * ---
 * @example
 * ```
 * const { C, dark, setTheme } = useAppContext()
 * ```
 *
 * @version 0.11.29
 * - *Add roles: string[_] to userDoc*
 * @author nguyenkhooi
 */
export const useAppContext = () => useContext(AppContext);

interface dAppContext {
  C: dColors;
  dark: boolean;
  setTheme(name: THEME): void;
  i18n: LANG;
  setI18N(locale: LANG): void;
  lang: object;
  setLang(lang: object): void;
  isReady: boolean;
}
