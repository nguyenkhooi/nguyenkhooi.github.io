import React from "react";
import { View } from "react-native";
import { useDimension } from "utils";

export function S_Koiwave(props: dKoiwave) {
  const { visible } = props;
  const { WIDTH } = useDimension();
  return (
    visible && (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <div>
          <iframe
            title="A 3D model"
            width={WIDTH}
            height="480"
            src="https://sketchfab.com/models/f0c987ac5c9b4fb0a40576a6ae46b92e/embed?autospin=0.6&amp;autostart=0&amp;ui_controls=1&amp;ui_infos=1&amp;ui_inspector=1&amp;ui_stop=1&amp;ui_watermark=1&amp;ui_watermark_link=1"
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
