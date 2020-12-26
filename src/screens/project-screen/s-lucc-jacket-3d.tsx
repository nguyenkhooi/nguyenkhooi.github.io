import React from "react";
import { View } from "react-native";
import { useDimension } from "utils";

export function S_LuccJacket(props: dLuccJacket) {
  const { visible } = props;
  const { WIDTH } = useDimension();
  return (
    visible && (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <div>
          <iframe
            title="A 3D model"
            width={WIDTH}
            height="640"
            src="https://sketchfab.com/models/1002c84db1ca45dc9d77c9e8e12a6437/embed?autospin=0.2&amp;autostart=0&amp;ui_controls=1&amp;ui_infos=1&amp;ui_inspector=1&amp;ui_stop=1&amp;ui_watermark=1&amp;ui_watermark_link=1"
            //@ts-ignore
            frameborder="0"
            allow="autoplay; fullscreen; vr"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
        </div>
      </View>
    )
  );
}
