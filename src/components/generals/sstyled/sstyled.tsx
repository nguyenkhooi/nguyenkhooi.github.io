import React from "react";
import { dDime, dSCR, useDimension } from "utils";

/**
 * "Super" styled component. 
 * Mimicking `styled-components`, 
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
 * @version 1.10.20
 * - *Add dynamic dimension support (`useDimension()`)*
 * - *Clean up*
 * @author nguyenkhooi
 */
export function sstyled<Component extends React.ElementType>(
  GivenComp: Component
) {
  /**
   * Props of GivenComp will be combined with CustomProps
   * to create TargetedCompStyle
   */
  return (
    style: dTargetedCompStyle<Component, Props>
  ): React.FC<dTargetedComp<Component, Props>> => {
    /**
     * Return targeted component
     */
    return function TargetedComp(props: dSstyled) {
      const dim = useDimension();
      return React.createElement(GivenComp, {
        ...props,
        style: {
          ...(typeof style === "function"
            ? style({ ...props, ...dim })
            : style),
          ...props.style,
        },
      });
    };
  };
}

interface Props extends dDime {}

type dTargetedComp<C, P> = React.ComponentProps<C> & P;

type dTargetedCompStyle<C, P> =
  | (React.ComponentProps<C> & P)
  | React.ComponentProps<C>["style"]
  | ((props: dTargetedComp<C, P>) => React.ComponentProps<C>["style"]);

/**
 * Ideally, sstyled() component will inherit screen props,
 * so if we have universal screen props, extend dSstyled with it
 */
interface dSstyled extends dSCR {
  style: any;
}
