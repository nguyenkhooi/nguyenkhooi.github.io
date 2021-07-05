import {
  ImageBackground,
  TextStyle,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import * as React from "react";
import { useLinkTo } from "@react-navigation/native";
import { Menu } from "@ui-kitten/components";
import { TouchableWebProps, TouchableWeb, Txt, sstyled } from "components";
import { useAppContext } from "engines";
import { FlatGrid } from "react-native-super-grid";
import { Placeholder, ShineOverlay, PlaceholderMedia } from "rn-placeholder";
import { spacing, dColors } from "utils";

import { useAnimationState, View as MotiView } from "moti";

interface dGridCtnr extends TouchableWebProps {
  index: number;
  item?: {
    static_thumbnail: string;
    thumbnail: string;
    title: string;
    color: string;
    label: string;
  };
  type?: "placeholder";
  dataName: "Exp" | "Work";
}

export function ExhibitionCard(props: dGridCtnr) {
  const { type, onPress, item, index, dataName } = props;
  const { C } = useAppContext();
  const [isHovered, setHovered] = React.useState<boolean>(false);
  const [_borderWidth, setBorderWidth] = React.useState(2);

  const [thumbnail, setThumbnail] = React.useState<string>(
    item?.static_thumbnail
  );
  const { width } = useWindowDimensions();
  const linkTo = useLinkTo();

  React.useEffect(
    function onHover() {
      if (isHovered) {
        setBorderWidth(6);
        setThumbnail(item?.thumbnail);
        scaleUp.transitionTo("scaled");
      } else {
        setBorderWidth(0);
        setThumbnail(item?.static_thumbnail);
        scaleUp.transitionTo("normal");
      }
    },
    [isHovered]
  );

  //#region [reani]

  const scaleUp = useAnimationState({
    normal: { scale: 0.9 },
    scaled: { scale: 1 },
  });
  //#endregion

  return type != "placeholder" ? (
    <TouchableWeb
      onMouseEnter={(e) => {
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        setHovered(false);
      }}
      onPress={onPress}
    >
      <MotiView state={scaleUp} transition={{ type: "timing" }}>
        <A.Ctnr
          source={{ uri: thumbnail }}
          style={[
            {
              backgroundColor: index % 2 ? "black" : "white",
              borderWidth: _borderWidth,
              borderColor: item?.color,
            },
          ]}
        >
          <Txt.S1
            style={{
              color:
                dataName == "Work" ? "white" : index % 2 ? "white" : "black",
            }}
          >
            {item?.title}
          </Txt.S1>
          <Txt.P2
            style={{
              color:
                dataName == "Work" ? "white" : index % 2 ? "white" : "black",
            }}
          >
            {item?.label}
          </Txt.P2>
        </A.Ctnr>
      </MotiView>
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
}

const A = {
  Ctnr: sstyled(ImageBackground)({
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 300,
    overflow: "hidden",
  }),
  Grid: sstyled(FlatGrid)({ marginTop: 10, marginHorizontal: spacing(5) }),
};

const SSS = (C?: dColors) => {
  return {
    ITEM_CTNR: {
      justifyContent: "flex-end",
      borderRadius: 5,
      padding: 10,
      height: 300,
    } as ViewStyle,
  };
};
