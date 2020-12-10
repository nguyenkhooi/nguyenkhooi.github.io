// import { useAppContext } from "engines";
import { useAppContext } from "engines";
import { isFunction } from "lodash";
import React, { ReactNode } from "react";
import { dColors, dDime, useDimension } from "utils";

/**
 * ### "Super" styled component. 
 * -  Mimicking `styled-components`, 
 * with RN props (and Typescript),
 * now including dynamic dimension for rn-web
 * ---
 * 
 * @example
 * ```
 * const RoundedButton = sstyled(Button)((p)=> {
    borderRadius: p.ms(10),
    backgroundColor: p.C.primary,
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
export function sstyled<C extends React.ElementType>(GivenComp: C) {
  /**
   * Props of GivenComp (externalProps) are combined with customStyle
   * to create finalStyle
   */
  return (
    customStyle: dCustomStyle<C, {}>
  ): React.FC<React.ComponentProps<C>> => {
    return (externalProps) => {
      //*----Dimension & Colors-------
      const dim = useDimension();
      const { C } = useAppContext();

      let finalStyle = {
        ...(isFunction(customStyle)
          ? /**
             * If customeStyle is function:
             * customStyle(_) will TAKE external props, dim, and C;
             * return a dynamic `finalStyle`
             * ...
             */
            customStyle({
              ...externalProps,
              ...dim,
              C,
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
  | React.ComponentProps<C>["style"]
  | ((
      props: React.ComponentProps<C> & ExtraProps
    ) => React.ComponentProps<C>["style"]);
