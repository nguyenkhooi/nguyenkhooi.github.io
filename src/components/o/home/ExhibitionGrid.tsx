import { useLinkTo } from "@react-navigation/native";
import { IndexPath, Menu } from "@ui-kitten/components";
import { M, sstyled, Kitten, Txt } from "components";

import { useSheets } from "engines/hooks";
import { useAppContext } from "engines/providers/app-provider";
import * as R from "ramda";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { FlatGrid } from "react-native-super-grid";
import { Navigation } from "screens/_navigation";
import { spacing, use18 } from "utils";

export function ExhibitionGrid(props: {
  scrollY: Animated.SharedValue<number>;
  index: number;
  distanceScrolled: number;
  dataName: "Exp" | "Work";
}) {
  const { scrollY, index, dataName = "Work", distanceScrolled } = props;
  const { C } = useAppContext();
  const { data } = useSheets(0, dataName);
  // console.log("data: ", data);
  const { width, height } = useWindowDimensions();
  const ogData = React.useMemo(() => data, [data]);
  const [_data, setData] = React.useState([]);

  const refGrid = React.useRef<Animatable.View>();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const linkTo = useLinkTo();

  //#region [reani]

  const rTitleStyle = useAnimatedStyle(() => {
    const _inputRange = [
      (-index - 3) * height,
      distanceScrolled,
      (index + 3) * height,
    ];
    return {
      transform: [
        {
          translateX: interpolate(
            scrollY.value,
            _inputRange,
            [width * 0.1, 0, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  const rCtnrGridStyle = useAnimatedStyle(() => {
    const _inputRange = [
      -index * height,
      distanceScrolled,
      (index + 3) * height,
    ];
    return {
      opacity: interpolate(
        scrollY.value,
        _inputRange,
        [0, 1, 1],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            _inputRange,
            [height * 0.5, 0, -height * 0.1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  //#endregion
  return (
    <View style={{ marginVertical: spacing(4) }}>
      <Animated.View style={rTitleStyle}>
        <Txt.$Title>
          {dataName == "Exp" ? use18("Experiments") : use18("Work")}
        </Txt.$Title>
      </Animated.View>
      <Animated.View style={rCtnrGridStyle}>
        <A.CtnrFilter
          horizontal={true}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Kitten.MenuItem
            onPress={() => {
              setData(ogData);
              setSelectedIndex(new IndexPath(0));
            }}
            title={use18("All")}
          />
          {[...new Set(R.pluck("cat", ogData))].map((cat, index) => (
            <Kitten.MenuItem
              key={cat + index}
              onPress={() => {
                setData([...ogData.filter((item) => item.cat === cat)]);
                setSelectedIndex(new IndexPath(index + 1));
                refGrid.current?.fadeInUp(800);
              }}
              title={cat}
            />
          ))}
        </A.CtnrFilter>

        {!!_data ? (
          <Animatable.View ref={refGrid} animation="fadeInUp">
            <A.Grid
              itemDimension={width <= 1000 ? width * 0.9 : width * 0.3}
              data={R.isEmpty(_data) ? data : _data}
              // staticDimension={300}
              // fixed
              spacing={10}
              renderItem={({ item, index }) => (
                <Animatable.View animation="fadeIn" delay={100 * index}>
                  <M.ExhibitionCard
                    key={index}
                    dataName={dataName}
                    {...props}
                    index={index}
                    onPress={() => {
                      linkTo("/project/" + item.title);
                      Navigation.navigate("Project", {
                        project: item,
                      });
                    }}
                    item={item}
                  />
                </Animatable.View>
              )}
            />
          </Animatable.View>
        ) : (
          <View>
            <M.ExhibitionCard {...props} type="placeholder" />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const A = {
  CtnrFilter: sstyled(Menu)((p) => ({
    flexDirection: "row",
    marginVertical: spacing(5),
    borderRadius: 5,
    borderWidth: 0,
    borderBottomWidth: 1,
    alignSelf: "flex-start",
    overflow: "hidden",
    borderColor: "dim",
    marginLeft: spacing(5),
  })),
  Grid: sstyled(FlatGrid)({ marginTop: 10, marginHorizontal: spacing(5) }),
};
