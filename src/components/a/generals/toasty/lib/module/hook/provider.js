function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useRef, useState } from "react";
import Toasty from "../Toasty";
import { ToastyContext } from "./context";
export const ToastyProvider = ({
  children,
  ...props
}) => {
  const toastRef = useRef(null);
  const [refState, setRefState] = useState(null);
  useEffect(() => {
    setRefState(toastRef.current);
  }, []);
  return /*#__PURE__*/React.createElement(ToastyContext.Provider, {
    value: refState
  }, children, /*#__PURE__*/React.createElement(Toasty, _extends({
    ref: toastRef
  }, props)));
}; // export default ToastyProvider;
//# sourceMappingURL=provider.js.map