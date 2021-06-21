import { Image as RNImage, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

const Layout = Animatable.createAnimatableComponent(View);
const Image = Animatable.createAnimatableComponent(RNImage);
const Touchie = Animatable.createAnimatableComponent(TouchableOpacity);

/**
 * An animatable superset of animatable components
 *
 * ---
 * @example
 * <Ni.Layout animation="fadeInUp" delay={1000}><Text>Ni!</Text></Ni.Layout>
 *
 * @version 0.10.23
 * @author nguyenkhooi
 */
export const Ni = {
  /** A ni TouchableOpacity */
  Touchie,
  /** A ni View */
  Layout,
  /** A ni Image */
  Image,
};
export const Ani = Animatable;

const spring = {
  type: "spring",
  springDamping: 0.65,
};
export const defaultLayoutAnimation = {
  duration: 600,
  create: {
    ...spring,
    property: "scaleXY",
  },
  update: {
    ...spring,
  },
  delete: {
    ...spring,
    property: "scaleXY",
  },
};
