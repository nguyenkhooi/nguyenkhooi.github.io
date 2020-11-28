import { Text } from "@ui-kitten/components";
import { sstyled } from "components/generals";
import React from "react";
import {
  Animated,
  Image,
  PanResponder,
  PanResponderInstance,
  View,
  ViewStyle,
} from "react-native";
import { useDimension } from "utils";

export const useComponentWillMount = (func, condition: any[]) => {
  React.useMemo(func, []);
};

interface dCOMPSwipeDeck {
  data: any[];
  containerStyle?: ViewStyle;
  cardStyle?: ViewStyle;
}

/**
 * A SwipeDeck to yay or nay sth
 * 
 * @example
 * <SwipeDeck
      {...props}
      data={[
        {
          id: '1',
          uri:
            'https://s.aolcdn.com/hss/storage/midas/e7998a2022772944bf34580700e3586e/203932724/leaguewallpaper.jpg',
        },
        {
          id: '2',
          uri: 'https://images4.alphacoders.com/600/thumb-1920-600528.png',
        },
        {
          id: '3',
          uri:
            'https://image.winudf.com/v2/image/Y29tLnRkZy5sb2x3YWxscGFwZXJzX3NjcmVlbl85XzE1MzA3MTgwNThfMDY2/screen-9.jpg?fakeurl=1&type=.jpg',
        },
      ]}
    />
 */
export function SwipeDeck(props: dCOMPSwipeDeck) {
  const {
    data,
    containerStyle = { width: 1200, height: 1800 },
    cardStyle = { width: 600, height: 900 },
  } = props;
  const [_currentIndex, setCurrentIndex] = React.useState(0);
  const [_data, setData] = React.useState(data);
  const { WIDTH, HEIGHT } = useDimension();

  const _containerStyle: ViewStyle = {
    ...containerStyle,
    width: Number(containerStyle.width),
    height: Number(containerStyle.height),
  };

  const _cardStyle: ViewStyle = {
    ...cardStyle,
    left: !!containerStyle?.width
      ? Number(containerStyle.width) / 2 - Number(cardStyle?.width) / 2
      : WIDTH / 2 - Number(cardStyle?.width) / 2,
    top: !!containerStyle?.height
      ? Number(containerStyle.height) / 2 - Number(cardStyle?.height) / 2
      : HEIGHT / 2 - Number(cardStyle.height) / 2,
  };

  const _swipeDistance = Number(_containerStyle.width) / 2;

  let _position = new Animated.ValueXY();
  let _rotate = _position.x.interpolate({
    inputRange: [-_swipeDistance, 0, _swipeDistance],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  let _rotateAndTranslate = {
    transform: [
      {
        rotate: _rotate,
      },
      ..._position.getTranslateTransform(),
    ],
  };

  let _likeOpacity = _position.x.interpolate({
    inputRange: [-_swipeDistance, 0, _swipeDistance],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  let _dislikeOpacity = _position.x.interpolate({
    inputRange: [-_swipeDistance, 0, _swipeDistance],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  let _nextCardOpacity = _position.x.interpolate({
    inputRange: [-_swipeDistance, 0, _swipeDistance],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });
  let _currentCardOpacity = _position.x.interpolate({
    inputRange: [-_swipeDistance, 0, _swipeDistance],
    outputRange: [0.1, 1, 0.1],
    extrapolate: "clamp",
  });
  let _nextCardScale = _position.x.interpolate({
    inputRange: [-_swipeDistance, 0, _swipeDistance],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });

  function onRestartDeck() {}

  let DeckPanResponder: PanResponderInstance;
  function applyPanResponder() {
    console.log("mounting..");
    DeckPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        _position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        switch (gestureState.dx > 120) {
          /** Swipe Right */
          case true:
            setCurrentIndex(_currentIndex + 1);
            return Animated.spring(_position, {
              toValue: { x: WIDTH + 100, y: gestureState.dy },
              useNativeDriver: true,
            }).start(() => {
              /** Post swipe right */
              _position.setValue({ x: 0, y: 0 });
            });
            break;
          /** Swipe Left */
          case false:
            setCurrentIndex(_currentIndex + 1);
            return Animated.spring(_position, {
              toValue: { x: -WIDTH - 100, y: gestureState.dy },
              useNativeDriver: true,
            }).start(() => {
              /** Post swipe left */
              _position.setValue({ x: 0, y: 0 });
            });
            break;
          /** If user doesn't complete a swipe */
          default:
            return Animated.spring(_position, {
              toValue: { x: 0, y: 0 },
              friction: 4,
              useNativeDriver: true,
            }).start();
            break;
        }

        // if (gestureState.dx > 120) {
        //   setCurrentIndex(_currentIndex + 1);
        //   Animated.spring(_position, {
        //     toValue: { x: width + 100, y: gestureState.dy },
        //     useNativeDriver: true,
        //   }).start(() => {
        //     /** Post swipe right */
        //     _position.setValue({ x: 0, y: 0 });
        //   });
        // } else if (gestureState.dx < -120) {
        //   /** Swipe Left */
        //   setCurrentIndex(_currentIndex + 1);
        //   Animated.spring(_position, {
        //     toValue: { x: -width - 100, y: gestureState.dy },
        //     useNativeDriver: true,
        //   }).start(() => {
        //     /** Post swipe left */
        //     _position.setValue({ x: 0, y: 0 });
        //   });
        // } else {
        //   /** If user doesn't complete a swipe */
        //   Animated.spring(_position, {
        //     toValue: { x: 0, y: 0 },
        //     friction: 4,
        //     useNativeDriver: true,
        //   }).start();
        // }
      },
    });
  }

  /**
   * Apply and re-apply panResponder when either:
   *    currentIndex changes (post swipe), or
   *    dimension changes (making cardStyle changes)
   *
   */
  React.useMemo(applyPanResponder, [_currentIndex, _cardStyle]);

  function renderUsers() {
    return _data
      .map((item, i: number) => {
        if (i < _currentIndex) {
          return null; //* has to be null to have it disappeared
        } else if (i == _currentIndex) {
          return (
            <Animated.View
              {...DeckPanResponder?.panHandlers}
              key={item._id}
              style={[
                _rotateAndTranslate,
                _cardStyle,
                { position: "absolute" },
              ]}
            >
              <Animated.View
                style={{
                  opacity: _likeOpacity,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000,
                }}
              >
                <YupTxt {...props}>Yup</YupTxt>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: _dislikeOpacity,
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000,
                }}
              >
                <NahTxt {...props}>Nah</NahTxt>
              </Animated.View>

              <Animated.Image
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  borderRadius: 20,
                  opacity: _currentCardOpacity,
                }}
                source={{ uri: item.photo00 }}
              />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              key={item.id}
              style={[
                _cardStyle,
                {
                  opacity: _nextCardOpacity,
                  transform: [{ scale: _nextCardScale }],
                  position: "absolute",
                },
              ]}
            >
              <Image
                style={{
                  flex: 1,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={{ uri: item.photo00 }}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  }
  return (
    <View style={[_containerStyle]}>
      {/* <Text
        style={{
          borderWidth: 1,
          borderColor: "green",
          color: "green",
          fontSize: 32,
          fontWeight: "800",
          padding: 10,
        }}
      >
        {JSON.stringify(_currentIndex)}
      </Text> */}
      {renderUsers()}
    </View>
  );
}

const YupTxt = sstyled(Text)({
  color: "#39FF14",
  fontSize: 32,
  fontWeight: "600",
  padding: 10,
});

const NahTxt = sstyled(Text)({
  color: "tomato",
  fontSize: 32,
  fontWeight: "600",
  padding: 10,
});
