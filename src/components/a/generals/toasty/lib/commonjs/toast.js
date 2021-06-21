"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toast = Toast;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Toast(props) {
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
    loadingIcon = /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "small",
      color: "white"
    }),
    successColor,
    dangerColor,
    warningColor,
    placement,
    onPress
  } = props;
  const refCtnr = (0, _react.useRef)(null);
  const [animation] = (0, _react.useState)(new _reactNative.Animated.Value(0));

  let _icon;

  (0, _react.useEffect)(() => {
    _reactNative.Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250
    }).start();

    let closeTimeout = null;

    if (duration !== 0 && typeof duration === "number") {
      closeTimeout = global.setTimeout(() => {
        _reactNative.Animated.timing(animation, {
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

  const renderToast = () => /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    ref: refCtnr,
    style: [styles.container, animationStyle, {
      backgroundColor
    }, style]
  }, _icon ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.iconContainer
  }, _icon) : null, /*#__PURE__*/_react.default.isValidElement(message) ? message : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.message, textStyle]
  }, message));

  return onPress ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    onPress: () => onPress(id)
  }, renderToast()) : renderToast();
}

const styles = _reactNative.StyleSheet.create({
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