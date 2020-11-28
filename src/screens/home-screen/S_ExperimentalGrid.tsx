import { Text } from "@ui-kitten/components";
import { Txt, TouchableWeb, TouchableWebProps } from "components";
import { useSheets } from "engines/hooks";
import { type } from "ramda";
import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Placeholder, ShineOverlay, PlaceholderMedia } from "rn-placeholder";
import { Navigation } from "screens/_navigation";
import { dColors, IPSCR, scale, spacing, useDimension } from "utils";

export function S_ExperimentalGrid(props: IPSCR) {
  const {
    theme: { C },
  } = props;
  const { data } = useSheets(0, "Exp");
  // console.log("data: ", data);

  const { WIDTH: width } = useDimension("window");

  return (
    <View style={{}}>
      {/* <Text>{JSON.stringify(keys)}</Text> */}
      <Text
        category={"h3"}
        style={{ paddingHorizontal: spacing(6), color: C.dim }}
      >
        Experimental
      </Text>
      {!!data ? (
        <FlatGrid
          itemDimension={width <= 1000 ? width * 0.9 : width * 0.3}
          data={data}
          style={SS().GRID_CTNR}
          // staticDimension={300}
          // fixed
          spacing={10}
          renderItem={({ item }) => (
            <GridCtnr
              {...props}
              onPress={() => Navigation.navigate("Project", { project: item })}
              item={item}
            />
          )}
        />
      ) : (
        <View
          style={{ ...SS().GRID_CTNR, alignSelf: "flex-start", width: 500 }}
        >
          <GridCtnr {...props} type="placeholder" />
        </View>
      )}
    </View>
  );
}

interface dGridCtnr extends TouchableWebProps, IPSCR {
  item?: { thumbnail: string; title: string; color: string; label: string };
  type?: "placeholder";
}
const GridCtnr = (props: dGridCtnr) => {
  const {
    theme: { C },
    onPress,
    item,
    type,
  } = props;
  const [_borderWidth, setBorderWidth] = React.useState(0);
  const { WIDTH } = useDimension("window");
  return type != "placeholder" ? (
    <TouchableWeb
      onMouseEnter={(e) => {
        setBorderWidth(6);
      }}
      onMouseLeave={(e) => {
        setBorderWidth(0);
      }}
      onPress={onPress}
    >
      <ImageBackground
        source={{ uri: item?.thumbnail }}
        style={[
          SS().ITEM_CTNR,
          {
            backgroundColor: item?.color,
            overflow: "hidden",
            borderWidth: _borderWidth,
            borderColor: item?.color,
          },
        ]}
      >
        <Txt.S1 style={SS().itemName}>{item?.title}</Txt.S1>
        <Txt.P2 style={SS().itemCode}>{item?.label}</Txt.P2>
      </ImageBackground>
    </TouchableWeb>
  ) : (
    <Placeholder Animation={ShineOverlay}>
      <PlaceholderMedia
        style={[
          SS().ITEM_CTNR,
          { width: WIDTH <= 1000 ? WIDTH * 0.9 : WIDTH * 0.3 },
        ]}
      ></PlaceholderMedia>
    </Placeholder>
  );
};

const SS = (C?: dColors) => {
  return {
    GRID_CTNR: {
      marginTop: 10,
      marginHorizontal: spacing(5),
      // flex: 1,
    } as ViewStyle,
    ITEM_CTNR: {
      justifyContent: "flex-end",
      borderRadius: 5,
      padding: 10,
      height: 300,
    } as ViewStyle,
    itemName: {
      color: "#fff",
      // fontSize: scale(18),
      // fontWeight: "600",
    } as TextStyle,
    itemCode: {
      // fontWeight: "600",
      // fontSize: scale(12),
      color: "#fff",
    } as TextStyle,
  };
};
