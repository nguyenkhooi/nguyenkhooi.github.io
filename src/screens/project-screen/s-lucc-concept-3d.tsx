import React from "react";
import { View } from "react-native";
import { useDimension } from "utils";

export function S_LuccMain(props: dLuccMain) {
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
            src="https://sketchfab.com/models/9bc977137c0f4ec5af858a0c45eaf4d2/embed?autospin=0.2&amp;autostart=0&amp;ui_controls=1&amp;ui_infos=1&amp;ui_inspector=1&amp;ui_stop=1&amp;ui_theme=dark&amp;ui_watermark=1&amp;ui_watermark_link=1"
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
