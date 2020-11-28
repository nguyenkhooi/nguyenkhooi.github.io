import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
export function Toast(props) {
  const {
    id,
    onClose,
    icon,
    type = "normal",
    message,
    duration = 3000,
    style,
    textStyle,
    successIcon,
    dangerIcon,
    warningIcon,
    loadingIcon = /*#__PURE__*/React.createElement(ActivityIndicator, {
      size: "small",
      color: "white"
    }),
    successColor,
    dangerColor,
    warningColor,
    placement,
    onPress
  } = props;
  const refCtnr = useRef(null);
  const [animation] = useState(new Animated.Value(0));

  let _icon;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250
    }).start();
    let closeTimeout = null;

    if (duration !== 0 && typeof duration === "number") {
      closeTimeout = global.setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          useNativeDriver: true,
          duration: 250
        }).start(() => onClose());
      }, duration);
    }

    return () => {
      closeTimeout && global.clearTimeout(closeTimeout);
    };
  }, []);

  if (icon === undefined) {
    switch (type) {
      case "success":
        {
          !!successIcon && (_icon = successIcon);
          break;
        }

      case "danger":
        {
          !!dangerIcon && (_icon = dangerIcon);
          break;
        }

      case "warning":
        {
          !!warningIcon && (_icon = warningIcon);
          break;
        }

      case "loading":
        {
          !!loadingIcon && (_icon = loadingIcon);
        }
    }
  } else _icon = icon;

  const animationStyle = {
    opacity: animation,
    transform: [{
      translateY: animation.interpolate({
        inputRange: [0, 1],
        outputRange: placement === "bottom" ? [20, 0] : [0, 20] // 0 : 150, 0.5 : 75, 1 : 0

      })
    }]
  };
  let backgroundColor = "#333";

  switch (type) {
    case "success":
      backgroundColor = successColor || "#00C851";
      break;

    case "danger":
      backgroundColor = dangerColor || "#ff4444";
      break;

    case "warning":
      backgroundColor = warningColor || "#ffbb33";

    default:
      backgroundColor = "#333";
  }

  const renderToast = () => /*#__PURE__*/React.createElement(Animated.View, {
    ref: refCtnr,
    style: [styles.container, animationStyle, {
      backgroundColor
    }, style]
  }, _icon ? /*#__PURE__*/React.createElement(View, {
    style: styles.iconContainer
  }, _icon) : null, /*#__PURE__*/React.isValidElement(message) ? message : /*#__PURE__*/React.createElement(Text, {
    style: [styles.message, textStyle]
  }, message));

  return onPress ? /*#__PURE__*/React.createElement(TouchableWithoutFeedback, {
    onPress: () => onPress(id)
  }, renderToast()) : renderToast();
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  message: {
    color: "#fff",
    fontWeight: "500"
  },
  iconContainer: {
    marginRight: 5
  }
}); // export default Toast;
//# sourceMappingURL=toast.js.map