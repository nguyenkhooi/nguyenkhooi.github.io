// import { useAppContext } from "engines";
import { styled } from "dripsy";
import { useAppContext } from "engines";
import { isFunction } from "lodash";
import React from "react";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { dColors, dDime, useDimension } from "utils";
/**
 * ### "Super" styled component.
 * -  Mimicking `styled-components`,
 * with RN props (and Typescript),
 * now including dynamic dimension for rn-web
 * ---
 *
 * @example
 *
 * import { Text } from 'react-native'
 *
 * const MyText = styled(Text)({
 *   borderBottomStyle: 'solid',
 *   color: ['primary', 'secondary']
 * })
 * ---
 * @version 21.3.16
 * - *Use dripsy/styled for responsive*
 * @author nguyenkhooi, nandorojo
 */
export const sstyled = styled;

/**
 * ### "Super" styled component. 
 * -  Mimicking `styled-components`, 
 * with RN props (and Typescript),
 * now including dynamic dimension for rn-web
 * ---
 * @deprecated Use the current sstyled() instead, which is dripsy/styled() under the hood
 * @example
 * ```
 * const RoundedButton = sstyled(Button)((p)=> {
    borderRadius: 10,
    backgroundColor: "primary",
    });
  ```
 * ---
 * @description Under the hood is the scoped functions,
 * -  Get externalProps, pass it to customStyle to use if needed
 * -  Pass theme's colors and dim to make customStyle dynamic af
 * ```
 * <Comp1 {"external_props"} /> = sstyled(Comp0)(({"external_props_is_here_too", ...dim, C})=> ({"custom_style"}))
 * ```
 * @version 1.12.8
 * - *Fix typed error*
 * - *Clean up*
 * @author nguyenkhooi
 */
function sstyledDeprecated<C extends React.ElementType>(GivenComp: C) {
  /**
   * Props of GivenComp (externalProps) are combined with customStyle
   * to create finalStyle
   */
  return (
    customStyle: dCustomStyle<C, dDime & { C: dColors } & { safe: EdgeInsets }>
  ): React.FC<React.ComponentProps<C>> => {
    return (externalProps) => {
      //*----Dimension & Colors-------
      const dim = useDimension();
      const { C } = useAppContext();
      const safe = useSafeAreaInsets();
      let finalStyle = {
        ...(isFunction(customStyle)
          ? /**
             * If customStyle is function:
             * customStyle(_) will TAKE external props, dim, and C;
             * return a dynamic `finalStyle`
             * ...
             */
            customStyle({
              ...externalProps,
              ...dim,
              C,
              safe,
            })
          : /**
             * ...else, just return customStyle {}
             */
            customStyle),

        ...externalProps.style, //* In case u defines style in externalProps
      };
      return React.createElement(GivenComp, {
        ...externalProps,
        style: finalStyle,
      });
    };
  };
}

type dCustomStyle<C extends React.ElementType, ExtraProps> =
  | (React.ComponentProps<C> & ExtraProps)
  | ((
      props: React.ComponentProps<C> & ExtraProps
    ) => React.ComponentProps<C>["style"]);
