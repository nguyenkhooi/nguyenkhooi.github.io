import React, { Component } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle
} from "react-native";
import { Toast, ToastOptions, ToastProps } from "./toast";

const dims = Dimensions.get("window");

export interface Props extends ToastOptions {
  offset?: number;
  placement: "top" | "bottom";
}

interface State {
  toasts: Array<ToastProps>;
}

/**
 * A Toast component for react-native, supports Android, IOS, Web, Windows
 *
 * ---
 * @example
 *
 * ```
 * <Text onPress={()=> Toasty.show("Hello mf", { type: "success" })}>Toast!</Text>
 * ```
 * - In `App.tsx`, add: `<Toasty ref={(ref) => Toasty.setRef(ref)} />`
 * ---
 * @version 0.10.23
 * - *(Preset icon)*
 * - *(Add `update()`)*
 * - *(Build this up)*
 *
 * @author nguyenkhooi
 * @see https://github.com/arnnis/react-native-fast-toast
 */
export default class Toasty extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      toasts: [],
    };
  }

  static defaultProps = {
    placement: "bottom",
    offset: 60,
  };
  refToast = React.createRef<Toasty>();

  static _ref: null | Toasty = null;

  /**
   * In `App.tsx`, add: `<Toasty ref={(ref) => Toasty.setRef(ref)} />`
   */
  static setRef(ref: null | Toasty = null) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }

  /**
   * Show toasty with message and option
   *
   * ---
   * @example
   * <Text onPress={()=> Toasty.show("Hello mf", { type: "success" })}>Toast!</Text>
   */
  static show(message: string, p_: ToastOptions) {
    let id = this._ref?._show(message, p_);
    return id;
  }

  /**
   * Update current toasty with new message and option
   *
   * ---
   * @example
   * const __toast = Toasty.show("...", { type: "loading" });

    !!__toast &&
      Toasty.update(__toast, "Done!", { type: "success" });
   */
  static update(id: string, message: string, p_: ToastOptions) {
    this._ref?._update(id, message, p_);
  }

  /**
   * Hide the current toasty
   *
   * ---
   *  @example
   * const __toast = Toasty.show("Sup dude", { type: "success" });

    !!__toast && Toasty.hide(__toast);
   */
  static hide(id: string) {
    this._ref?._hide(id);
  }

  private _show = (
    message: string | JSX.Element,
    toastOptions?: ToastOptions
  ) => {
    let id = Math.random().toString();
    const onClose = () => this._hide(id);

    requestAnimationFrame(() => {
      this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
      this.setState({
        toasts: [
          {
            id,
            onClose,
            message,
            ...toastOptions,
          },
          ...this.state.toasts,
        ],
      });
    });

    return id;
  };

  private _update = (
    id: string,
    message: string | JSX.Element,
    toastOptions?: ToastOptions
  ) => {
    this.setState({
      toasts: this.state.toasts.map((toast) =>
        toast.id === id ? { ...toast, message, ...toastOptions } : toast
      ),
    });
  };

  private _hide = (id: string) => {
    this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
  };

  render() {
    const { toasts } = this.state;
    let { placement, offset } = this.props;

    let style: ViewStyle = {
      bottom: placement === "bottom" ? offset : undefined,
      top: placement === "top" ? offset : undefined,
      justifyContent: placement === "bottom" ? "flex-end" : "flex-start",
      flexDirection: placement === "bottom" ? "column" : "column-reverse",
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...this.props} {...toast} />
        ))}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "absolute",
    maxWidth: dims.width * 10 * 9,
    bottom: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    zIndex: 999,
    left: "10%",
    right: "10%",
  },
  message: {
    color: "#333",
  },
});

// export default Toasty;
