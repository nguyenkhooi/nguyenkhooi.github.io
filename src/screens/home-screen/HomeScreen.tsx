import { useAppContext } from "engines";
import * as React from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import { IPSCR, useDimension } from "utils";
import { S_Contact } from "./s-contact";
import { S_ExperimentalGrid } from "./s-experimental-grid";
import { S_Intro } from "./s-intro";
import { S_PortfolioGrid } from "./s-portfolio-grid";

export default (props: IPSCR) => {
  const { C } = useAppContext();
  const { HEIGHT } = useDimension();

  const refList = React.useRef<ScrollView>(null);

  const [_workLayout, setWorkLayout] = React.useState<LayoutChangeEvent>();
  // console.log("🖐️ work layout: ", _workLayout?.nativeEvent?.layout?.height);
  const [_ExpLayout, setExpLayout] = React.useState<LayoutChangeEvent>();
  // console.log("🖐️ Exp layout: ", _ExpLayout?.nativeEvent?.layout?.height);

  const scrollToSection = (section: "work" | "exp") => {
    section == "exp"
      ? refList.current.scrollTo(HEIGHT + _workLayout.nativeEvent.layout.height)
      : refList.current.scrollTo(HEIGHT);
  };

  //#region [REANI]
  const opacity = useSharedValue(0);
  const scrollY = useSharedValue(0);

  let animatedScrollViewStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollY.value,
      [HEIGHT * 0.5, HEIGHT, HEIGHT * 2.5, HEIGHT * 3],
      [C.background, C["color-basic-1100"], C["color-basic-1100"], C.primary]
    ),
  }));
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  //#endregion

  return (
    <Animated.ScrollView
      ref={refList}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      style={{ ...animatedScrollViewStyle }}
    >
      <$_Intro
        {...props}
        scrollToWork={() => {
          scrollToSection("work");
        }}
        scrollToExp={() => {
          scrollToSection("exp");
        }}
      />
      <View onLayout={setWorkLayout}>
        <$_PortfolioGrid {...props} />
      </View>
      <View onLayout={setExpLayout}>
        <$_ExperimentalGrid {...props} />
      </View>
      <View>
        <$_Contact {...props} />
      </View>
    </Animated.ScrollView>
  );
};

const $_PortfolioGrid = S_PortfolioGrid;
const $_ExperimentalGrid = S_ExperimentalGrid;
const $_Intro = S_Intro;
const $_Contact = S_Contact;

// import React from "react";
// import {
//   Animated,
//   Dimensions,
//   NativeSyntheticEvent,
//   PanResponder,
//   StyleSheet,
//   View
// } from "react-native";

// export default function Drag() {
//   const dropZoneValues = React.useRef(null);
//   const pan = React.useRef(new Animated.ValueXY());
//   const [bgColor, setBgColor] = React.useState("#2c3e50");

//   const isDropZone = React.useCallback(
//     (evt) => {
//       const dz = dropZoneValues.current;
//       return evt.pageY > dz.y && evt.pageY < dz.y + dz.height;
//     },
//     []
//   );

//   const onMove = React.useCallback(
//     (event: NativeSyntheticEvent<unknown>) => {
//       // console.log(
//       //   "locXY: ",
//       //   event.nativeEvent.locationX + " - " + event.nativeEvent.locationY
//       // );
//       // console.log(
//       //   "pageXY: ",
//       //   event.nativeEvent.pageX + " - " + event.nativeEvent.pageY
//       // );
//       if (isDropZone(event.nativeEvent)) setBgColor("red");
//       else setBgColor("#2c3e50");
//     },
//     [isDropZone]
//   );

//   const setDropZoneValues = React.useCallback((event) => {
//     dropZoneValues.current = event.nativeEvent.layout;
//   }, []);

//   const panResponder = React.useMemo(
//     () =>
//       PanResponder.create({
//         onStartShouldSetPanResponder: () => true,
//         onMoveShouldSetPanResponderCapture: () => true,

//         onPanResponderGrant: (evt, gestureState) => {
//           pan.current.setOffset({
//             x: pan.current.x._value,
//             y: pan.current.y._value,
//           });
//           pan.current.setValue({ x: 0, y: 0 });
//         },

//         onPanResponderMove: Animated.event(
//           [
//             null,
//             {
//               dx: pan.current.x,
//               dy: pan.current.y,
//             },
//           ],
//           {
//             listener: onMove,
//             useNativeDriver: true,
//           }
//         ),
//         onPanResponderRelease: (e, gesture) => {
//           if (!isDropZone(gesture)) {
//             Animated.spring(pan.current, {
//               toValue: {
//                 x: 0 - pan.current.x._offset,
//                 y: 0 - pan.current.y._offset,
//               },
//               useNativeDriver: true,
//             }).start(() => {
//               // pan.current.setValue({ x: 0, y: 0 });
//               pan.current.setOffset({ x: 0, y: 0 });
//             });
//           } else {
//             pan.current.flattenOffset();
//           }
//         },
//       }),
//     []
//   );

//   return (
//     <View style={styles.mainContainer}>
//       <View
//         onLayout={setDropZoneValues}
//         style={[styles.dropZone, { backgroundColor: bgColor }]}
//       ></View>
//       <View style={styles.draggableContainer}>
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={[pan.current.getLayout(), styles.circle]}
//         ></Animated.View>
//       </View>
//     </View>
//   );
// }

// let CIRCLE_RADIUS = 36;
// let Window = Dimensions.get("window");
// let styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   dropZone: {
//     height: 100,
//     backgroundColor: "#2c3e50",
//   },
//   text: {
//     marginTop: 25,
//     marginLeft: 5,
//     marginRight: 5,
//     textAlign: "center",
//     color: "#fff",
//   },
//   draggableContainer: {
//     position: "absolute",
//     top: Window.height / 2 - CIRCLE_RADIUS,
//     left: Window.width / 2 - CIRCLE_RADIUS,
//   },
//   circle: {
//     backgroundColor: "#1abc9c",
//     width: CIRCLE_RADIUS * 2,
//     height: CIRCLE_RADIUS * 2,
//     borderRadius: CIRCLE_RADIUS,
//   },
// });
