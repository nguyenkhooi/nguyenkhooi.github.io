import React from "react";
import Toasty from "../Toasty";

type Toast = React.RefObject<Toasty>["current"];

export const ToastyContext = React.createContext(null as Toast);

// export default ToastyContext;
