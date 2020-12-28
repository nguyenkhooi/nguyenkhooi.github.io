import { Button, ButtonProps } from "@ui-kitten/components";
import { dIconOooh, IconOooh } from "assets";
import { dAccessory } from "components";
import * as React from "react";
import { ActivityIndicator, Keyboard } from "react-native";
import { scale } from "utils";

/**
 * ### This is button component
 * ---
 * @example
 *  <Buttoon
      onPress={() => {}}
      appearance="ghost"
      icon={{ name: "chevron_right"}}
      status="basic"
      
    >
      Nine-nine!
    </Buttoon>
 *
 * @version 0.11.25
 * -  *fix _accessory to return null if !accessoryLeft/Right*
 */
export function Buttoon(props: P) {
  const {
    icon,
    compact = false,
    appearance,
    disabled,
    onPress,
    progress,
  } = props;
  const [_loading, setLoading] = React.useState(false);

  /**
   * Internal onPress(),
   * handling progress loading state
   */
  function _onPress() {
    !!progress && setLoading(progress);
    Keyboard.dismiss();
    //@ts-ignore
    onPress && onPress(() => setLoading(false));
  }
  /**
   * Setup Button's accessory prop to be
   * either `accessoryLeft` or `accessoryRight`,
   * depending on `!!icon.right`
   */
  const _accessory = !!!icon
    ? null
    : !!icon?.right
    ? {
        accessoryRight: (p: dAccessory) => {
          return _loading ? (
            <ActivityIndicator color={p.style.tintColor} />
          ) : (
            // <></>
            <IconOooh
              preset={"default"}
              name={`arrow_left`}
              size={p.style.width * 0.8}
              color={p.style.tintColor}
              {...icon}
            />
          );
        },
      }
    : {
        accessoryLeft: (p: dAccessory) => {
          return _loading ? (
            <ActivityIndicator color={p.style.tintColor} />
          ) : (
            // <></>
            <IconOooh
              preset={"default"}
              name={`arrow_left`}
              size={p.style.width * 0.8}
              color={p.style.tintColor}
              {...icon}
            />
          );
        },
      };
  return (
    //@ts-ignore as _accessory's expected Image, but i can use any <_>
    <Button
      {...props}
      onPress={_onPress}
      style={[
        props.style,
        // { margin: spacing(1) },
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
      {..._accessory}
    />
  );
}

// const Confirmation = (props: P) => {
//   const [_label, setLabel] = React.useState(props.children);
//   return <Buttoon {...props} />;
// };

interface P extends ButtonProps {
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
