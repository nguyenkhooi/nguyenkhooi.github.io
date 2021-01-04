import React from "react";
import { StyleSheet, View } from "react-native";
import Carousel, { CarouselProps } from "react-native-snap-carousel"; // Version can be specified in package.json
import { IS_WEB, useDimension } from "utils";

const DATA: readonly string[] = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

export default function S_Carou(props: CarouselProps<{}>) {
  const { data, itemRender, onSnapToItem } = props;
  const [index, setIndex] = React.useState(0);

  const { WIDTH, HEIGHT } = useDimension("window");

  const [_dim, setDim] = React.useState({
    sliderWidth: WIDTH,
    width: Math.round(WIDTH * 0.9),
    height: Math.round(Math.round(WIDTH * 0.9) * 0.4),
    translateValue: Math.round((WIDTH * 0.3) / 4),
  });

  React.useEffect(
    function dynamicSize() {
      const SLIDER_WIDTH = WIDTH;
      const ITEM_WIDTH =
        WIDTH <= 1000
          ? Math.round(SLIDER_WIDTH * 0.5)
          : Math.round(SLIDER_WIDTH * 0.3);
      const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 2);
      const TRANSLATE_VALUE = Math.round((SLIDER_WIDTH * 0.3) / 4);
      setDim({
        sliderWidth: SLIDER_WIDTH,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        translateValue: TRANSLATE_VALUE,
      });
    },
    [WIDTH, HEIGHT]
  );
  function _renderItem({ item }) {
    return (
      <View
        style={[
          styles.itemContainer,
          {
            width: _dim.width,
            height: _dim.height,
          },
        ]}
      >
        {itemRender(item)}
      </View>
    );
  }

  return (
    <View>
      <Carousel
        // ref={(c) => (this.carousel = c)}
        {...props}
        // layout={"default"}
        data={data}
        renderItem={_renderItem}
        sliderWidth={_dim.sliderWidth}
        itemWidth={_dim.width}
        // inactiveSlideShift={0}
        onSnapToItem={(index) => {
          setIndex(index);
          !!onSnapToItem && onSnapToItem(index);
        }}
        useScrollView={true}
        // enableMomentum={true}
        enableSnap={true}
        pagingEnabled={IS_WEB ? true : false}
        // autoplay={true}
        // loop={true}
      />
      {/* <Text style={styles.counter}>{_dim.width + "  " + _dim.height}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50,
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "dodgerblue",
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
