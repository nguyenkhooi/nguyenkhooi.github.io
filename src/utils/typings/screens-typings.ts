import { NavigationInjectedProps } from "react-navigation"
import { dTheme } from "."

export interface IPSCR extends NavigationInjectedProps<{}> {
  theme: dTheme
}
