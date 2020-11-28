import { Button, ButtonProps } from "@ui-kitten/components";
import * as R from "ramda";
import * as React from "react";
import { ActivityIndicator, Keyboard } from "react-native";
import { scale } from "utils";
// import { dIconOooh, IconOooh } from "../icons";

/**
 * This is button component
 * @example
 *  <Buttoon
      onPress={() => {}}
      appearance="ghost"
      icon={{ name: "chevron_right"}}
      status="basic"
      size="medium"
    >
      Nine-nine!
    </Buttoon>
 * @param props
 * @version 0.10.4
 */
export function Buttoon(props: P) {
  const {
    icon,
    compact = false,
    appearance,
    disabled,
    onPress,
    progress,
    textStyle,
  } = props;
  const [_loading, setLoading] = React.useState(false);
  function _onPress() {
    !!progress && setLoading(progress);
    Keyboard.dismiss();
    //@ts-ignore
    onPress && onPress(() => setLoading(false));
  }

  return (
    <Button
      {...props}
      onPress={_onPress}
      style={[
        props.style,
        compact && { alignSelf: "center" },
        disabled && appearance == "ghost" && { backgroundColor: "transparent" },
        appearance == "icon" && {
          borderRadius: scale(100),
          borderWidth: 0,
          width: scale(20),
          height: scale(20),
          margin: scale(3),
        },
      ]}
      accessoryLeft={(props: dAccessory) => {
        return _loading ? (
          <ActivityIndicator color={props.style.tintColor} />
        ) : (
          !R.isNil(icon) && R.isNil(icon.right) && (
            <></>
            // <IconOooh
            //   preset={`safe`}
            //   name={`arrow_left`}
            //   size={props.style.width * 0.8}
            //   color={props.style.tintColor}
            //   {...icon}
            // />
          )
        );
      }}
      //   accessoryRight={(props: dAccessory) => {
      //     return (
      //       !R.isNil(icon) &&
      //       !R.isNil(icon.right) && (
      //         <IconOooh
      //           preset={`safe`}
      //           name={`arrow_left`}
      //           size={props.style.width * 0.8}
      //           color={props.style.tintColor}
      //           {...icon}
      //         />
      //       )
      //     );
      //   }}
    />
  );
}

export type dAccessory = {
  style: {
    height: number;
    marginHorizontal: number;
    tintColor: string;
    width: number;
  };
};

interface P extends ButtonProps {
  /**
   * @deprecated
   */
  icon?: dIconOooh & {
    /** Is icon on the right? */
    right?: boolean;
  };

  /**
   * Should button be wrapped around its children ("compact")?
   */
  compact?: boolean;

  progress?: boolean;
}
