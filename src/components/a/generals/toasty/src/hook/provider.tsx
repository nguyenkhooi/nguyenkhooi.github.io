import React, { FC, useEffect, useRef, useState } from "react";
import Toasty, { Props } from "../Toasty";
import { ToastyContext } from "./context";

export const ToastyProvider: FC<Props> = ({ children, ...props }) => {
  const toastRef = useRef(null);
  const [refState, setRefState] = useState(null);

  useEffect(() => {
    setRefState(toastRef.current);
  }, []);

  return (
    <ToastyContext.Provider value={refState}>
      {children}
      <Toasty ref={toastRef} {...props} />
    </ToastyContext.Provider>
  );
};

// export default ToastyProvider;
