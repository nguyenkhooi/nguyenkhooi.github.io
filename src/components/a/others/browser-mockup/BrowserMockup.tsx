import React from "react";
import { View, Text } from "dripsy";

export function BrowserMockup(props) {
  const { sx = {}, children, url = "twitter.com" } = props;

  const renderHeader = () => {
    const circle = (bg: string) => (
      <View
        key={bg}
        sx={{
          height: 11,
          width: 11,
          bg,
          ml: 2,
          borderRadius: "rounded",
        }}
      />
    );
    return (
      <View sx={{ height: 40, bg: "black", flexDirection: "row" }}>
        <View
          sx={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            flexBasis: "0%",
          }}
        >
          {["errorRed", "hazardYellow", "awakenVolt"].map(circle)}
        </View>
        <View
          sx={{
            alignSelf: "center",
            mx: 4,
            flex: 4,
            flexBasis: "0%",
            alignItems: "center",
            height: "70%",
          }}
        >
          <View
            sx={{
              width: 300,
              maxWidth: "100%",
              bg: "black",
              borderRadius: 3,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text>{url}</Text>
          </View>
        </View>
        <View sx={{ flex: 1, flexBasis: "0%" }} />
      </View>
    );
  };

  return (
    <View sx={{ borderRadius: 3, overflow: "hidden", ...sx }}>
      {renderHeader()}

      <View sx={{ bg: "background" }}>{children}</View>
    </View>
  );
}
