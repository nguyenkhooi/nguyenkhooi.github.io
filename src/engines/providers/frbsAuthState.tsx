//* SAUCE imp
import { PROPSCOMP } from "utils"
import * as React from "react"
import { FirebaseAuthTypes } from "@react-native-firebase/auth"

/** REVIEW frbsAutheProviders
 * 
 * @module
 *  |_ FRBSAuthContext - `createContext` for global frbsAuthe
 *  |_ FRBSAuthProvider - Main provider of the frbsAuthe
 *  |_ withAuthe() - Wrapper function
 *
 * @example
 *  In `app.tsx`
 *    import {FRBSAuthProvider} from `engines`
 *    ...
 *    const [_frbsAuthe, setFRBSAuthe] = React.useState<FirebaseAuthTypes.User>(null)
 *    ...
 *    React.useEffect(() => {
        function handleStatusChange(user: FirebaseAuthTypes.User) {
            setFRBSAuthe(user)
            }
            const subscriber = firebase.auth().onAuthStateChanged(handleStatusChange)
            console.log("userInfo existed: ", _frbsAuthe != null)
            return subscriber //* Unscubscribe on unmount
        }, [_frbsAuthe])
      ...
 *    return (
        <RootStoreProvider value={rootStore}>
          <FRBSAuthProvider frbsAuthe={_frbsAuthe}> <--- here
            <...>
          </FRBSAuthProvider> <--- and here
        </RootStoreProvider>
      )
    To receive "authe" data
      import {withAuthe} from `engines/providers` //* can't use `engines` as `withAuthe` must be imported directly
      ...
      e.g.: export default withTheme(withAuthe(observer(WelcomeScreen)))
      
 */

export const FRBSAuthContext = React.createContext(null)

export function FRBSAuthProvider(props: IPfrbsAuthState) {
  const { frbsAuthe } = props

  return <FRBSAuthContext.Provider value={{ frbsAuthe }}>{props.children}</FRBSAuthContext.Provider>
}

interface IPfrbsAuthState {
  frbsAuthe: FirebaseAuthTypes.User
  children: React.ReactChild
}
interface IPwithAuthState extends PROPSCOMP {}

/**
 * @description Theme wrapper around React component to pass `theme` props and `setTheme` f(x)
 *
 * @param OGComponent: React component
 */
export function withAuthe<P extends IPwithAuthState = IPwithAuthState>(
  OGComponent: React.ComponentType<P>,
) {
  return class AuthedComponent extends React.Component<P & IPwithAuthState> {
    render() {
      return (
        <FRBSAuthContext.Consumer>
          {contexts => <OGComponent {...(this.props as P)} {...contexts} />}
        </FRBSAuthContext.Consumer>
      )
    }
  }
}
