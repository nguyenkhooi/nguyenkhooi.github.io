import { useLinkTo } from "@react-navigation/native";
import {
  IndexPath,
  Menu,
  MenuItem
} from "@ui-kitten/components";
import {
  sstyled, TouchableWeb,
  TouchableWebProps, Txt
} from "components";
import { useSheets } from "engines/hooks";
import { useAppContext } from "engines/providers/app-provider";
import * as R from "ramda";
import React from "react";
import {
  ImageBackground,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FlatGrid } from "react-native-super-grid";
import {
  Placeholder,

  PlaceholderMedia,
  ShineOverlay
} from "rn-placeholder";
import { Navigation } from "screens/_navigation";
import { dColors,  spacing, use18, useDimension } from "utils";

export function S_PortfolioGrid(props) {
  const { C } = useAppContext();
  const { data } = useSheets(0, "Work");
  // console.log("data: ", data);
  const { WIDTH } = useDimension("window");
  const ogData = React.useMemo(() => data, [data]);
  const [_data, setData] = React.useState([]);

  const refGrid = React.useRef<Animatable.View>();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const linkTo = useLinkTo();
  return (
    <View style={{ marginVertical: spacing(4) }}>
      <Txt.$Title>{use18("Work")}</Txt.$Title>
      <SS.CtnrFilter
        horizontal={true}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <MenuItem
          onPress={() => {
            setData(ogData);
            setSelectedIndex(new IndexPath(0));
          }}
          title={use18("All")}
        />
        {[...new Set(R.pluck("cat", ogData))].map((cat, index) => (
          <MenuItem
            key={cat + index}
            onPress={() => {
              setData([...ogData.filter((item) => item.cat === cat)]);
              setSelectedIndex(new IndexPath(index + 1));
              refGrid.current.fadeInUp(800);
            }}
            title={cat}
          />
        ))}
      </SS.CtnrFilter>
      {!!_data ? (
        <Animatable.View ref={refGrid} animation="fadeInUp">
          <FlatGrid
            itemDimension={WIDTH <= 1000 ? WIDTH * 0.9 : WIDTH * 0.3}
            data={R.isEmpty(_data) ? data : _data}
            style={SSS().GRID_CTNR}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item, index }) => (
              <Animatable.View animation="fadeIn" delay={100 * index}>
                <CtnrGrid
                  {...props}
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
        <View style={{ ...SSS().GRID_CTNR }}>
          <CtnrGrid {...props} type="placeholder" />
        </View>
      )}
    </View>
  );
}

interface dGridCtnr extends TouchableWebProps {
  item?: { thumbnail: string; title: string; color: string; label: string };
  type?: "placeholder";
}
const CtnrGrid = (props: dGridCtnr) => {
  const { type, onPress, item } = props;
  const { C } = useAppContext();
  const [_borderWidth, setBorderWidth] = React.useState(0);
  const { WIDTH: width } = useDimension("window");
  const linkTo = useLinkTo();
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
          SSS().ITEM_CTNR,
          {
            backgroundColor: item?.color,
            overflow: "hidden",
            borderWidth: _borderWidth,
            borderColor: item?.color,
          },
        ]}
      >
        <Txt.S1 style={SSS().itemName}>{item?.title}</Txt.S1>
        <Txt.P2 style={SSS().itemCode}>{item?.label}</Txt.P2>
      </ImageBackground>
    </TouchableWeb>
  ) : (
    <Placeholder Animation={ShineOverlay}>
      <PlaceholderMedia
        style={[
          SSS().ITEM_CTNR,
          { width: width <= 1000 ? width * 0.9 : width * 0.3 },
        ]}
      ></PlaceholderMedia>
    </Placeholder>
  );
};

const SS = {
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
};

const SSS = (C?: dColors) => {
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
